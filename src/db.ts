/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from '@faker-js/faker'

export type TEntity = {
  name: string
  properties: Record<string, string>
  seed: number
}

export class DB {
  private static data: Record<string, Record<string, any>[]> = {}
  private readonly entity: TEntity

  constructor(entity: TEntity) {
    DB.data[entity.name] = []
    this.entity = entity
  }

  public add(data: Record<string, any>) {
    Object.keys(this.entity.properties).map((property: string) => {
      if (data[property] === undefined) {
        data[property] = property.includes('?')
          ? null
          : this.fakeFill(property, this.entity.properties[property])
      }
    })
    DB.data[this.entity.name].push(data)
    return data
  }

  public list() {
    return DB.data[this.entity.name]
  }

  public get(id: string) {
    return DB.data[this.entity.name].find(
      (item: Record<string, any>) => item.id === id
    )
  }

  public update(id: string, data: Record<string, any>) {
    const index = DB.data[this.entity.name].findIndex(
      (item: Record<string, any>) => item.id === id
    )
    Object.keys(this.entity.properties).map((property: string) => {
      if (data[property] === undefined) {
        data[property] = property.includes('?')
          ? null
          : this.fakeFill(property, this.entity.properties[property])
      }
    })
    DB.data[this.entity.name][index] = data
    return this.get(id)
  }

  public patch(id: string, data: Record<string, any>) {
    const index = DB.data[this.entity.name].findIndex(
      (item: Record<string, any>) => item.id === id
    )
    const item = DB.data[this.entity.name][index]
    Object.keys(data).map((property: string) => {
      item[property] = data[property]
    })
    DB.data[this.entity.name][index] = item
    return this.get(id)
  }

  public delete(id: string) {
    DB.data[this.entity.name] = DB.data[this.entity.name].filter(
      (item: Record<string, any>) => item.id !== id
    )
  }

  private fakeFill(name: string, type: string) {
    switch (type) {
      case 'uuid':
        return faker.string.uuid()
      case 'title':
        return faker.lorem.sentence({ min: 2, max: 4 })
      case 'number':
        return faker.number.int({ min: 1, max: 100 })
      case 'boolean':
        return faker.datatype.boolean()
      case 'isoDateString':
        return faker.date.recent().toISOString()
      default:
        return ''
    }
  }

  public async seed() {
    Array.from({ length: this.entity.seed }, () => {
      this.add({})
    })
  }
}
