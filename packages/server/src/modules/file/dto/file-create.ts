import { PictureDTO } from './file.dto'

export class PictureCreateDto extends PictureDTO {
  readonly name?: string
}
