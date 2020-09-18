import { AxiosResponse } from 'axios'
import { Sync } from './Sync'
import { Eventing, Callback } from './Eventing'
import { Attributes } from './Attributes'

export interface UserProps {
  id?: number
  name?: string
  age?: number
}

const rootURL = 'http://localhost:3000/users'

export class User {
  public events: Eventing = new Eventing()
  public sync: Sync<UserProps> = new Sync(rootURL)
  public attributes: Attributes<UserProps>

  constructor(attr: UserProps) {
    this.attributes = new Attributes<UserProps>(attr)
  }

  get on() {
    return this.events.on
  }
  get trigger() {
    return this.events.trigger
  }
  get get() {
    return this.attributes.get
  }
  set(newValue: UserProps): void {
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
        .catch(err => {
          this.trigger('error')
          console.error(err)
          reject()
        })
    })
  }
}
