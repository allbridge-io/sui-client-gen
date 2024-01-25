import {
  Reified,
  ToField,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
} from '../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../_framework/util'
import { UID } from '../object/structs'
import { bcs } from '@mysten/bcs'
import { SuiClient, SuiParsedData } from '@mysten/sui.js/client'

/* ============================== Bag =============================== */

export function isBag(type: string): boolean {
  type = compressSuiType(type)
  return type === '0x2::bag::Bag'
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface BagFields {
  id: ToField<UID>
  size: ToField<'u64'>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Bag {
  static readonly $typeName = '0x2::bag::Bag'
  static readonly $numTypeParams = 0

  readonly $typeName = Bag.$typeName

  readonly $fullTypeName: '0x2::bag::Bag'

  readonly id: ToField<UID>
  readonly size: ToField<'u64'>

  private constructor(fields: BagFields) {
    this.$fullTypeName = Bag.$typeName

    this.id = fields.id
    this.size = fields.size
  }

  static reified(): Reified<Bag, BagFields> {
    return {
      typeName: Bag.$typeName,
      fullTypeName: composeSuiType(Bag.$typeName, ...[]) as '0x2::bag::Bag',
      typeArgs: [],
      fromFields: (fields: Record<string, any>) => Bag.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Bag.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Bag.fromBcs(data),
      bcs: Bag.bcs,
      fromJSONField: (field: any) => Bag.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Bag.fromJSON(json),
      fetch: async (client: SuiClient, id: string) => Bag.fetch(client, id),
      new: (fields: BagFields) => {
        return new Bag(fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Bag.reified()
  }

  static get bcs() {
    return bcs.struct('Bag', {
      id: UID.bcs,
      size: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): Bag {
    return Bag.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      size: decodeFromFields('u64', fields.size),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Bag {
    if (!isBag(item.type)) {
      throw new Error('not a Bag type')
    }

    return Bag.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      size: decodeFromFieldsWithTypes('u64', item.fields.size),
    })
  }

  static fromBcs(data: Uint8Array): Bag {
    return Bag.fromFields(Bag.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      size: this.size.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Bag {
    return Bag.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      size: decodeFromJSONField('u64', field.size),
    })
  }

  static fromJSON(json: Record<string, any>): Bag {
    if (json.$typeName !== Bag.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Bag.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Bag {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBag(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Bag object`)
    }
    return Bag.fromFieldsWithTypes(content)
  }

  static async fetch(client: SuiClient, id: string): Promise<Bag> {
    const res = await client.getObject({ id, options: { showContent: true } })
    if (res.error) {
      throw new Error(`error fetching Bag object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.content?.dataType !== 'moveObject' || !isBag(res.data.content.type)) {
      throw new Error(`object at id ${id} is not a Bag object`)
    }
    return Bag.fromFieldsWithTypes(res.data.content)
  }
}
