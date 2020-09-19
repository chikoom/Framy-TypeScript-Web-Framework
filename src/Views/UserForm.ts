import { UserProps } from './../models/User'
import { User } from '../models/User'
import { View } from './View'

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetAge,
      'click:.set-name': this.onSetName,
    }
  }
  onSetName = (): void => {
    const input = this.parent.querySelector('input')
    if (input) {
      const name = input.value
      this.model.set({ name })
    }
  }
  onSetAge = (): void => {
    this.model.setRandomAge()
  }
  template(): string {
    return `
      <div>
        <h1> User Form </h1>
        <div>User Name: ${this.model.get('name')}</div>
        <div>User Age: ${this.model.get('age')}</div>
        <input class='value-name' type="text" />
        <button class='set-name'>Update Name</button>
        <button class='set-age'>Set Random Age</button>
        <button>Save</button>
      </div>
    `
  }
}
