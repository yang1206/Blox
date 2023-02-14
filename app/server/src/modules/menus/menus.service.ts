import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TreeRepository } from 'typeorm'
import type { CreateMenuDto } from './dto/create-menu.dto'
import type { UpdateMenuDto } from './dto/update-menu.dto'
import { MenuEntity, Person2Id } from './entities/menu.entity'

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menusRepository: TreeRepository<MenuEntity>,
  ) { }

  /**
  * 创建菜单
  * @param body
  */
  async create(createMenuDto: CreateMenuDto) {
    if (createMenuDto.parent_id) {
      const oldmenu = await this.menusRepository.findOneBy({ id: createMenuDto.parent_id })
      if (!oldmenu)
        throw new HttpException(`id为${createMenuDto.parent_id}的父菜单不存在`, HttpStatus.BAD_REQUEST)
      const subMenu = this.menusRepository.create(createMenuDto)
      return await this.menusRepository.save({ ...subMenu, parent: oldmenu })
    }
    else {
      const newMenu = this.menusRepository.create(createMenuDto)
      return await this.menusRepository.save(newMenu)
    }
  }

  /**
 * 查询全部菜单
 */
  async findAll() {
    const data = await this.menusRepository.manager.getTreeRepository(MenuEntity).findTrees({ relations: ['parent'] })
    return Person2Id(data)
  }

  /**
* 查询指定菜单
* @param id
*/
  async findOne(id: number) {
    const data = await this.menusRepository.findOneOrFail({ where: { id }, relations: ['parent', 'children'] })
    return {
      ...data,
      parent_id: data?.parent?.id,
    }
  }

  /**
* 更新指定菜单
* @param id
* @param body
*/
  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const oldmenu = await this.menusRepository.findOneBy({ id })
    if (!oldmenu)
      throw new HttpException(`id为${id}的菜单不存在`, HttpStatus.BAD_REQUEST)
    if (updateMenuDto.parent_id) {
      const newParent = await this.menusRepository.findOneBy({ id: updateMenuDto.parent_id })
      oldmenu.parent = newParent
    }
    const updateMenu = this.menusRepository.manager.merge(MenuEntity, oldmenu, updateMenuDto)
    return await this.menusRepository.save(updateMenu)
  }

  /**
* 删除指定菜单
* @param id
*/
  async remove(id: number) {
    try {
      const category = await this.menusRepository.findOneBy({ id })
      await this.menusRepository.remove(category)
      return true
    }
    catch (e) {
      throw new HttpException('删除失败', HttpStatus.BAD_REQUEST)
    }
  }
}
