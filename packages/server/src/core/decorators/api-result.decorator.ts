import type { Type } from '@nestjs/common'
import { applyDecorators } from '@nestjs/common'
import { ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger'

export class ResultData {
  constructor(code = 200, msg?: string, data?: any) {
    this.code = code
    this.msg = msg || 'ok'
    this.data = data || null
  }

  @ApiProperty({ type: 'number', default: 200 })
  code: number

  @ApiProperty({ type: 'string', default: 'ok' })
  msg?: string

  data?: any

  static ok(data?: any, msg?: string): ResultData {
    return new ResultData(200, msg, data)
  }

  static fail(code: number, msg?: string, data?: any): ResultData {
    return new ResultData(code || 500, msg || 'fail', data)
  }
}

const baseTypeNames = ['String', 'Number', 'Boolean']
/**
 * 封装 swagger 返回统一结构
 * 支持复杂类型 {  code, msg, data }
 * @param model 返回的 data 的数据类型
 * @param isArray data 是否是数组
 * @param isPager 设置为 true, 则 data 类型为 { list, total } , false data 类型是纯数组
 */
export const ApiResult = <TModel extends Type<any>>(model?: TModel, isArray?: boolean, isPager?: boolean) => {
  let items = null
  if (model && baseTypeNames.includes(model.name))
    items = { type: model.name.toLocaleLowerCase() }

  else
    items = { $ref: getSchemaPath(model) }

  let prop = null
  if (isArray && isPager) {
    prop = {
      type: 'object',
      properties: {
        list: {
          type: 'array',
          items,
        },
        total: {
          type: 'number',
          default: 0,
        },
      },
    }
  }
  else if (isArray) {
    prop = {
      type: 'array',
      items,
    }
  }
  else if (model) {
    prop = items
  }
  else {
    prop = { type: 'null', default: null }
  }
  return applyDecorators(ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResultData) },
        {
          properties: {
            data: prop,
          },
        },
      ],
    },
  }))
}
