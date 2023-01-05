import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { compareSync } from 'bcryptjs'
import { ConfigService } from '@nestjs/config'
import { UserEntity } from './entities/user.entity'
import type { CreateUserDto, UserRo } from './dto/create-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {
    const username = this.configService.get('ADMIN_USER', 'admin')
    const password = this.configService.get('ADMIN_PASSWD', 'admin')
    this.register({ username, password, role: 'admin' })
      .then(() => {
        /* eslint-disable no-console */
        console.log(`管理员账户创建成功，用户名：${username}，密码：${password}，请及时登录系统修改默认密码`)
      })
      .catch(async () => {
        const existAdminUser = await this.userRepository.findOne({ where: { username } })
        const isDefaultPasswd = UserEntity.comparePassword(password, existAdminUser.password)
        if (isDefaultPasswd)
          console.log(`管理员账户已经存在，用户名：${username}，密码：${password}，请及时登录系统修改默认密码`)
      })
  }

  /**
   * 账号密码注册
   * @param createUser
   */
  async register(createUser: CreateUserDto) {
    const { username, password, confirm_password, role } = createUser
    if (password !== confirm_password && role !== 'admin')
      throw new HttpException('两次密码不一致', HttpStatus.BAD_REQUEST)

    const existUser = await this.userRepository.findOne({
      where: { username },
    })
    if (existUser)
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST)

    const newUser = this.userRepository.create(createUser)
    newUser.nickname = newUser.nickname ? newUser.nickname : newUser.username
    return await this.userRepository.save(newUser)
  }

  async findOne(id: string) {
    return await this.userRepository.findOneBy({ id })
  }

  /**
   * 查找所有用户
   * @param queryParams
   * @returns
   */
  async findAll(queryParams): Promise<UserRo> {
    const query = this.userRepository.createQueryBuilder('user')
    const { pageNum = 1, pageSize = 10, status, ...otherParams } = queryParams
    if (typeof queryParams === 'object') {
      query.skip((+pageNum - 1) * +pageSize)
      query.take(+pageSize)

      if (status)
        query.andWhere('user.status=:status').setParameter('status', status)

      if (otherParams) {
        Object.keys(otherParams).forEach((key) => {
          query.andWhere(`user.${key} LIKE :${key}`).setParameter(`${key}`, `%${otherParams[key]}%`)
        })
      }
    }

    const [data, total] = await query.getManyAndCount()
    return {
      list: data,
      total,
      pageNum,
      pageSize,
    }
  }

  /**
   * 更新指定用户
   * @param id
   */
  async updateById(currentUser, id: string, user): Promise<UserEntity> {
    if (user.role === 'admin') {
      if (!currentUser || currentUser.role !== 'admin') {
        throw new HttpException(
          '您无权操作',
          // tslint:disable-next-line: trailing-comma
          HttpStatus.FORBIDDEN,
        )
      }
    }

    const oldUser = await this.userRepository.findOneBy({ id })
    delete user.password

    if (user.name && user.name !== oldUser.username) {
      const existUser = await this.userRepository.findOne({ where: { username: user.username } })

      if (existUser)
        throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST)
    }

    const newUser = await this.userRepository.merge(oldUser, user)
    return this.userRepository.save(newUser)
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }

  /**
   * 用户登录
   * @param user
   */
  async login(user: Partial<UserEntity>): Promise<UserEntity> {
    const { username, password } = user
    const existUser = await this.userRepository.findOne({ where: { username } })
    if (!existUser || !(await UserEntity.comparePassword(password, existUser.password))) {
      throw new HttpException(
        '用户名或密码错误',
        // tslint:disable-next-line: trailing-comma
        HttpStatus.BAD_REQUEST,
      )
    }

    if (existUser.status === 'locked') {
      throw new HttpException(
        '用户已锁定，无法登录',
        HttpStatus.BAD_REQUEST,
      )
    }

    delete existUser.password

    return existUser
  }

  /**
   * 更新指定用户密码
   * @param id
   */
  async updatePassword(id, user): Promise<UserEntity> {
    const existUser = await this.userRepository.findOneBy({ id })
    const { oldPassword, newPassword } = user
    if (!existUser || !(await UserEntity.comparePassword(oldPassword, existUser.password))) {
      throw new HttpException(
        '用户名或密码错误',
        HttpStatus.BAD_REQUEST,
      )
    }

    const hashNewPassword = UserEntity.encryptPassword(newPassword)
    const newUser = await this.userRepository.merge(existUser, {
      password: hashNewPassword,
    })
    const d = await this.userRepository.save(newUser)
    return d
  }

  comparePassword(password, libPassword) {
    return compareSync(password, libPassword)
  }
}
