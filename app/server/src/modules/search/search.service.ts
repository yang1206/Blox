import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { getPagination } from 'src/utils/pagination'
import type { SearchDTO } from 'src/common/dto/search.dto'
import { PostsService } from '../posts/posts.service'
import { SearchEntity } from './entities/search.entity'
import { SearchRo } from './dto/search.dto'

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(SearchEntity)
    private readonly searchRepository: Repository<SearchEntity>,
    private readonly postsService: PostsService,
  ) { }

  /**
   * 搜素文章
   * @param type
   */
  async searchArticle(type, keyword) {
    const articles = await this.postsService.search(keyword)
    await this.addRecord(type, keyword)
    return articles
  }

  async addRecord(type, keyword) {
    const exist = await this.searchRepository.findOne({
      where: { type, keyword },
    })

    if (exist) {
      const count = exist.count
      const newData = await this.searchRepository.merge(exist, {
        count: count + 1,
      })
      await this.searchRepository.save(newData)
      return newData
    }

    const newData = await this.searchRepository.create({ type, keyword })
    const d = await this.searchRepository.save(newData)
    return d
  }

  /**
   * 获取所有搜索记录
   */
  async findAll(queryParams: SearchDTO): Promise<SearchRo> {
    const query = this.searchRepository.createQueryBuilder('search').orderBy('search.updateTime', 'DESC')
    const { page = 1, size = 10, ...otherParams } = queryParams
    if (typeof queryParams === 'object') {
      query.skip((+page - 1) * +size)
      query.take(+size)

      if (otherParams) {
        Object.keys(otherParams).forEach((key) => {
          const data = new SearchRo()
          if (!(key in data))
            return
          query.andWhere(`search.${key} LIKE :${key}`).setParameter(`${key}`, `%${otherParams[key]}%`)
        })
      }
    }

    const [list, total] = await query.getManyAndCount()
    const pageData = getPagination(total, page, size)
    return {
      list,
      ...pageData,
    }
  }

  /**
   * 删除搜索记录
   * @param id
   */
  async deleteById(id) {
    const data = await this.searchRepository.findOne(id)
    return this.searchRepository.remove(data)
  }
}
