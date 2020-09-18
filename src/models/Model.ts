import { AxiosPromise, AxiosResponse } from 'axios'

interface Events {
  on(eventName: string, callback: () => {}): void
  trigger(eventName: string): void
}
interface ModelAttributes<T> {
  set(update: T): void
  get<K extends keyof T>(key: K): T[K]
  getAll(): T
}
interface Sync<T> {
  save(data: T): AxiosPromise
  fetch(id: number): AxiosPromise
}
interface Identified {
  id?: number
}

export class Model<T extends Identified> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}
  get on() {
    return this.events.on
  }
  get trigger() {
    return this.events.trigger
  }
  get get() {
    return this.attributes.get
  }
  set(newValue: T): void {
    this.attributes.set(newValue)
    this.events.trigger('change')
  }
  async fetch(): Promise<void> {
    const id = this.get('id')
    if (typeof id !== 'number') throw new Error('Cannot fetch without id!')
    return new Promise((resolve, reject) => {
      this.sync
        .fetch(id)
        .then((result: AxiosResponse): void => {
          this.set(result.data)
          resolve()
        })
        .catch(err => {
          this.trigger('error')
          console.error(err)
          reject()
        })
    })
  }
  async save(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.sync
        .save(this.attributes.getAll())
        .then((result: AxiosResponse): void => {
          this.set(result.data)
          this.trigger('save')
          resolve()
        })
        .catch((err: Error) => {
          this.trigger('error')
          console.error(err.message)
          reject()
        })
    })
  }
}
