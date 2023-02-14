import { FileDTO } from './file.dto'

export class PictureCreateDto extends FileDTO {
  readonly name?: string
}
