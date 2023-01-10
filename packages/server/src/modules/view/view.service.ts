import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { parseUserAgent } from 'src/utils/ua'
import { parseIp } from 'src/utils/ip'
import type { SearchQuery } from 'src/types/interface/query.interface'
import { ViewEntity } from './entities/view.entity'
import type { ViewRo } from './dto/view.dto'

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
  async findAll(queryParams: SearchQuery): Promise<ViewRo> {
    const query = this.viewRepository.createQueryBuilder('view').orderBy('view.createTime', 'DESC')
    const { pageNum = 1, pageSize = 10, ...otherParams } = queryParams
    if (typeof queryParams === 'object') {
      query.skip((+pageNum - 1) * +pageSize)
      query.take(+pageSize)

      if (otherParams) {
        Object.keys(otherParams).forEach((key) => {
          query.andWhere(`view.${key} LIKE :${key}`).setParameter(`${key}`, `%${otherParams[key]}%`)
        })
      }
    }
    const [list, total] = await query.getManyAndCount()
    return {
      list,
      total,
      pageNum,
      pageSize,
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