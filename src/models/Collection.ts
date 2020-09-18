import axios, { AxiosResponse } from 'axios'
import { Eventing } from './Eventing'
import { User, UserProps } from './User'
export class Collection {
  models: User[] = []
  events: Eventing = new Eventing()
  constructor(public rootURL: string) {}
  get on() {
    return this.events.on
  }
  get trigger() {
    return this.events.trigger
  }
  async fetch(): Promise<void> {
    return new Promise((resolve, reject) => {
      axios
        .get(this.rootURL)
        .then((response: AxiosResponse) => {
          this.models = response.data.map((user: UserProps) =>
            User.buildUser(user)
          )
          this.trigger('change')
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
