export type Callback = () => void
interface Listner {
  [eventName: string]: Callback[]
}
export class Eventing {
  events: Listner = {}
  on = (eventName: string, callback: Callback): void => {
    if (!this.events[eventName]) this.events[eventName] = []
    this.events[eventName].push(callback)
  }
  trigger = (eventName: string): void => {
    if (this.events[eventName])
      this.events[eventName].forEach((event: Callback) => event())
  }
}
