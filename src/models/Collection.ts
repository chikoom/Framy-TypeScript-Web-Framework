import axios, { AxiosResponse } from 'axios'
import { Eventing } from './Eventing'

export class Collection<T, K> {
  models: T[] = []
  events: Eventing = new Eventing()
  constructor(public rootURL: string, public deserialize: (jsonData: K) => T) {}
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
          this.models = response.data.map((data: K) => this.deserialize(data))
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
