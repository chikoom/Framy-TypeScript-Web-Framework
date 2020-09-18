import { UserProps } from './User'

export class Attributes<T> {
  constructor(private data: T) {}

  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key]
  }
  set = (newValues: T): void => {
    Object.assign(this.data, newValues)
  }
  getAll = (): T => {
    return this.data
  }
}