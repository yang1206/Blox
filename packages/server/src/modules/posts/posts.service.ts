import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategoryService } from 'src/modules/category/category.service'
import { TagsService } from 'src/modules/tags/tags.service'
import { dateFormat } from 'src/utils/format'
import type { SearchQuery } from 'src/common/interface/query.interface'
import type { ResponseVo } from 'src/common/vo/res.vo'
import { getPagination } from 'src/utils/pagination'
import type { CreatePostDto } from './dto/post.dto'
import { extractProtectedArticle } from './posts.utils'
import { PostsEntity } from './entities/posts.entity'
import { PostInfo } from './vo/post.vo'

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
    private readonly categoryService: CategoryService,
    private readonly tagsService: TagsService,
  ) { }

  // 创建文章
  async create(user, post: CreatePostDto): Promise<string> {
    const { title } = post
    const doc = await this.postsRepository.findOne({ where: { title } })
    if (doc)
      throw new HttpException('文章已存在', 401)

    const { tag, category = 0, status } = post
    const categoryDoc = await this.categoryService.findById(category)
    if (status === 'publish') {
      Object.assign(post, {
        publishAt: dateFormat(),
      })
    }
    const tags = await this.tagsService.findByIds((`${tag}`).split(','))
    const postParam: Partial<PostsEntity> = {
      ...post,
      category: categoryDoc,
      tags,
      author: user,
    }

    if (status === 'publish') {
      Object.assign(postParam, {
        publishTime: dateFormat(),
        status: 'draft',
      })
    }
    const newPost: PostsEntity = await this.postsRepository.create({
      ...postParam,
    })
    const created = await this.postsRepository.save(newPost)
    return created.id
  }

  /**
   * 获取文章列表
   */
  async findAll(queryParams: SearchQuery): Promise<ResponseVo<PostInfo>> {
    const query = this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.tags', 'tag')
      .leftJoinAndSelect('post.category', 'category')
      .leftJoinAndSelect('post.author', 'user')
      .orderBy('post.publishTime', 'DESC')
    const { page = 1, size = 10, status, updateTimeStart, updateTimeEnd, createTimeStart, createTimeEnd, publishTimeStart, publishTimeEnd, ...params } = queryParams
    if (page <= 0 || size <= 0)
      throw new HttpException('分页查询出错', HttpStatus.BAD_REQUEST)
    // 分页查询
    query.skip((+page - 1) * +size)
    query.take(+size)

    // 根据标签查询
    if (queryParams.tag)
      query.andWhere('tag.id=:value', { value: queryParams.tag })
    // 根据分类查询
    if (queryParams.category)
      query.andWhere('category.id=:value', { value: queryParams.category })

    // 时间段查询
    if (updateTimeStart && updateTimeEnd) {
      query.andWhere('post.update_time BETWEEN :start AND :end', {
        start: updateTimeStart,
        end: updateTimeEnd,
      })
    }
    if (createTimeStart && createTimeEnd) {
      query.andWhere('post.create_time BETWEEN :start AND :end', {
        start: createTimeStart,
        end: createTimeEnd,
      })
    }
    if (publishTimeStart && publishTimeEnd) {
      query.andWhere('post.publish_time BETWEEN :start AND :end', {
        start: publishTimeStart,
        end: publishTimeEnd,
      })
    }
    if (status)
      query.andWhere('post.status=:status').setParameter('status', status)
    if (params) {
      Object.keys(params).forEach((key) => {
        const posts = new PostInfo()
        if (!(key in posts))
          return
        query.andWhere(`post.${key} LIKE :${key}`).setParameter(`${key}`, `%${params[key]}%`)
      })
    }

    const [data, total] = await query.getManyAndCount()
    data.forEach((d) => {
      if (d.needPassword)
        extractProtectedArticle(d)
    })
    const pageData = getPagination(total, page, size)
    return {
      list: data.map(item => item.toResponseObject()),
      ...pageData,
    }
  }

  /**
     * 根据 category 查找所有文章
     * @param category
     * @param queryParams
     */
  async findArticlesByCategory(category: number, queryParams: SearchQuery): Promise<ResponseVo<PostInfo>> {
    const query = this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'category')
      .leftJoinAndSelect('post.author', 'user')
      .where('category.id=:value', { value: category })
      .orderBy('post.publishTime', 'DESC')

    const { page = 1, size = 10, status } = queryParams
    if (page <= 0 || size <= 0)
      throw new HttpException('分页查询出错', HttpStatus.BAD_REQUEST)
    query.skip((+page - 1) * +size)
    query.take(+size)

    if (status)
      query.andWhere('post.status=:status').setParameter('status', status)

    const [data, total] = await query.getManyAndCount()
    data.forEach((d) => {
      if (d.needPassword)
        extractProtectedArticle(d)
    })
    const pageData = getPagination(total, page, size)
    return { list: data.map(item => item.toResponseObject()), ...pageData }
  }

  /**
   * 根据 tag 查找文章
   * @param tag
   * @param queryParams
   */
  async findArticlesByTag(tag: number, queryParams: SearchQuery): Promise<ResponseVo<PostInfo>> {
    const query = this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'user')
      .innerJoinAndSelect('post.tags', 'tag', 'tag.id=:value', {
        value: tag,
      })
      .orderBy('post.publishTime', 'DESC')

    const { page = 1, size = 10, updateTimeStart, updateTimeEnd, status } = queryParams
    if (page <= 0 || size <= 0)
      throw new HttpException('分页查询出错', HttpStatus.BAD_REQUEST)
    query.skip((+page - 1) * +size)
    query.take(+page)
    // 时间段查询
    if (updateTimeStart && updateTimeEnd) {
      query.andWhere('post.update_time BETWEEN :start AND :end', {
        start: updateTimeStart,
        end: updateTimeEnd,
      })
    }
    if (status)
      query.andWhere('post.status=:status').setParameter('status', status)

    const [data, total] = await query.getManyAndCount()

    data.forEach((d) => {
      if (d.needPassword)
        extractProtectedArticle(d)
    })
    const pageData = getPagination(total, page, size)
    return {
      list: data.map(item => item.toResponseObject()),
      ...pageData,
    }
  }

  /**
   * 获取文章归档
   */
  async getArchives(): Promise<{ [key: string]: PostInfo[] }> {
    const data = await this.postsRepository.find({
      where: { status: 'publish' },
      order: { publishTime: 'DESC' },
    })
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const ret = {}
    data.forEach((d) => {
      const year = new Date(d.publishTime).getFullYear()
      const month = new Date(d.publishTime).getMonth()
      if (!ret[year])
        ret[year] = {}

      if (!ret[year][months[month]])
        ret[year][months[month]] = []

      ret[year][months[month]].push(d)
    })

    return ret
  }

  /**
  * 获取推荐文章
  */
  async getRecommendArticles(queryParams: SearchQuery): Promise<ResponseVo<PostInfo>> {
    const { page = 1, size = 10 } = queryParams
    const query = this.postsRepository
      .createQueryBuilder('post')
      .where('post.isRecommend=:value', { value: 0 })
      .leftJoinAndSelect('post.author', 'user')
      .orderBy('post.publishTime', 'DESC')
    query.skip((+page - 1) * +size)
    query.take(+size)
    const [data, total] = await query.getManyAndCount()
    const pageData = getPagination(total, page, size)
    return {
      list: data.map(item => item.toResponseObject()),
      ...pageData,
    }
  }

  /**
    * 根据id获取指定文章
    */
  async findById(id: string): Promise<PostInfo> {
    const qb = this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'category')
      .leftJoinAndSelect('post.tags', 'tag')
      .leftJoinAndSelect('post.author', 'user')
      .where('post.id=:id')
      .setParameter('id', id)

    const result = await qb.getOne()

    if (!result)
      throw new HttpException(`id为${id}的文章不存在`, HttpStatus.BAD_REQUEST)
    this.updateViewById(id)
    return result.toResponseObject()
  }

  /**
   * 更新喜欢数
   * @param id
   * @returns
   */
  async updateLikesById(id, type): Promise<PostsEntity> {
    const oldArticle = await this.postsRepository.findOneBy({ id })
    const updatedArticle = this.postsRepository.merge(oldArticle, {
      likeCount: type === 0 ? oldArticle.likeCount + 1 : oldArticle.likeCount - 1,
    })
    if (updatedArticle.likeCount < 0)
      updatedArticle.likeCount = 0
    return this.postsRepository.save(updatedArticle)
  }

  // 更新文章
  async updateById(id: string, post: Partial<CreatePostDto>): Promise<string> {
    const existPost = await this.postsRepository.findOneBy({ id })
    if (!existPost)
      throw new HttpException(`id为${id}的文章不存在`, HttpStatus.BAD_REQUEST)

    const { category, tag, status } = post

    const tags = await this.tagsService.findByIds((`${JSON.parse(tag)}`).split(','))
    const categoryDoc = await this.categoryService.findById(category)
    const newPost = {
      ...post,
      views: existPost.views,
      category: categoryDoc,
      tags,
      status: status === '' ? 'draft' : status,
      publishTime: status === 'publish' ? dateFormat() : existPost.publishTime,
    }

    const updatePost = this.postsRepository.merge(existPost, newPost)
    return (await this.postsRepository.save(updatePost)).id
  }

  async updateViewById(id) {
    const post = await this.postsRepository.findOneBy({ id })
    const updatePost = await this.postsRepository.merge(post, {
      views: post.views + 1,
    })
    this.postsRepository.save(updatePost)
  }

  /**
   * 关键词搜索文章
   * @param keyword
   */
  async search(keyword) {
    const res = await this.postsRepository
      .createQueryBuilder('article')
      .where('article.title LIKE :keyword')
      .orWhere('article.summary LIKE :keyword')
      .orWhere('article.content LIKE :keyword')
      .setParameter('keyword', `%${keyword}%`)
      .getMany()

    return res
  }

  // 刪除文章
  async remove(id) {
    const existPost = await this.postsRepository.findOneBy({ id })
    if (!existPost)
      throw new HttpException(`id为${id}的文章不存在`, 401)

    return await this.postsRepository.delete(id)
  }
}
