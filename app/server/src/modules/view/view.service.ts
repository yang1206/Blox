import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type { Repository } from 'typeorm'
import { parseUserAgent } from 'src/utils/ua'
import { parseIp } from 'src/utils/ip'
import { getPagination } from 'src/utils/pagination'
import type { SearchDTO } from 'src/common/dto/search.dto'
import { ViewEntity } from './entities/view.entity'
import { ViewRo } from './dto/view.dto'

@Injectable()
export class ViewService {
  constructor(
    @InjectRepository(ViewEntity)
    private readonly viewRepository: Repository<ViewEntity>,
  ) { }

  /**
 * 添加访问
 * @param tag
 */
  async create(ip: string, userAgent: string, url: string): Promise<ViewEntity> {
    const exist = await this.viewRepository.findOne({
      where: { ip, userAgent, url },
    })
    if (exist) {
      const count = exist.count
      const newData = await this.viewRepository.merge(exist, {
        count: count + 1,
      })
      await this.viewRepository.save(newData)
      return newData
    }
    const { data: uaInfo } = parseUserAgent(userAgent)
    const address = parseIp(ip)
    const newData = await this.viewRepository.create({ ip, userAgent, url, address, ...uaInfo })
    await this.viewRepository.save(newData)
    return newData
  }

  /**
 * 获取所有访问
 */
  async findAll(queryParams: SearchDTO): Promise<ViewRo> {
    const query = this.viewRepository.createQueryBuilder('view').orderBy('view.createTime', 'DESC')
    const { page = 1, size = 10, ...otherParams } = queryParams
    if (typeof queryParams === 'object') {
      query.skip((+page - 1) * +size)
      query.take(+size)

      if (otherParams) {
        Object.keys(otherParams).forEach((key) => {
          const data = new ViewRo()
          if (!(key in data))
            return
          query.andWhere(`view.${key} LIKE :${key}`).setParameter(`${key}`, `%${otherParams[key]}%`)
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
 * 查找指定路径访问统计
 * @param url
 */
  async findByUrl(url): Promise<ViewEntity[]> {
    return this.viewRepository.find({
      where: { url },
      order: { updateTime: 'ASC' },
    })
  }

  /**
 * 获取指定访问
 * @param id
 */
  async findById(id): Promise<ViewEntity> {
    return this.viewRepository.findOne(id)
  }

  /**
   * 删除访问量
   * @param id
   */
  async deleteById(id) {
    const data = await this.viewRepository.findOne(id)
    return this.viewRepository.remove(data)
  }
}
