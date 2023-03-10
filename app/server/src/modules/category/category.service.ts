import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import type { ResponseVo } from 'src/common/vo/res.vo'
import { getPagination } from 'src/utils/pagination'
import type { SearchDTO } from 'src/common/dto/search.dto'
import { CategoryEntity } from './entities/category.entity'
import type { CreateCategoryDto } from './dto/category.dto'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) { }

  async create(name: string) {
    const existCategory = await this.categoryRepository.findOne({
      where: { name },
    })

    if (existCategory)
      throw new HttpException('分类已存在', HttpStatus.BAD_REQUEST)

    const newCategory = await this.categoryRepository.create({ name })
    await this.categoryRepository.save(newCategory)
    return newCategory
  }

  /**
   * 获取指定分类
   * @param id
   * @returns
   */
  async findById(id: number) {
    const query = this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.posts', 'post')
      .where('category.id=:id')
      .setParameter('id', id)
    return await query.getOne()
  }

  /**
   * 获取全部分类
   * @param queryParams
   * @returns
   */
  async findAll(queryParams: SearchDTO): Promise<ResponseVo<CategoryEntity>> {
    const { page = 1, size = 10, postStatus, ...params } = queryParams
    const query = this.categoryRepository
      .createQueryBuilder('category')
      .orderBy('category.createTime', 'ASC')

    if (params) {
      Object.keys(params).forEach((key) => {
        const data = new CategoryEntity()
        if (!(key in data))
          return
        query.andWhere(`category.${key} LIKE :${key}`).setParameter(`${key}`, `%${params[key]}%`)
      })
    }
    if (postStatus) {
      query.leftJoinAndSelect('category.posts', 'post', 'post.status=:status', {
        status: postStatus,
      })
    }
    else {
      query.leftJoinAndSelect('category.posts', 'post')
    }
    query.skip((+page - 1) * +size)
    query.take(+size)
    const [data, total] = await query.getManyAndCount()
    data.forEach((d) => {
      Object.assign(d, { postsCount: d.posts.length })
      delete d.posts
    })
    const pageData = getPagination(total, page, size)
    return {
      list: data,
      ...pageData,
    }
  }

  /**
  * 更新分类
  * @param id
  * @param Category
  */
  async updateById(id: number, category: Partial<CreateCategoryDto>): Promise<CategoryEntity> {
    const oldCategory = await this.categoryRepository.findOneBy({ id })
    const updatedCategory = await this.categoryRepository.merge(oldCategory, category)
    return this.categoryRepository.save(updatedCategory)
  }

  /**
 * 删除分类
 * @param id
 */
  async deleteById(id: number) {
    try {
      const category = await this.categoryRepository.findOneBy({ id })
      await this.categoryRepository.remove(category)
      return true
    }
    catch (e) {
      throw new HttpException('删除失败，可能存在关联文章', HttpStatus.BAD_REQUEST)
    }
  }
}
