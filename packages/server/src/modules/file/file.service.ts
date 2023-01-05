import { Injectable } from '@nestjs/common'
@Injectable()
export class FileService {
  findAll() {
    return 'This action returns all file'
  }

  findOne(id: number) {
    return `This action returns a #${id} file`
  }

  update(id: number) {
    return `This action updates a #${id} file`
  }

  remove(id: number) {
    return `This action removes a #${id} file`
  }
}
