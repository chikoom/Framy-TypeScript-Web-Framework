import { User, UserProps } from './../models/User'
import { View } from './View'

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetAge,
      'click:.set-name': this.onSetName,
      'click:.save-data': this.onSaveData,
    }
  }
  onSaveData = async (): Promise<void> => {
    await this.model.save()
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
        <input class='value-name' type="text" value=${this.model.get('name')} />
        <button class='set-name'>Update Name</button>
        <button class='set-age'>Set Random Age</button>
        <button class='save-data'>Save</button>
      </div>
    `
  }
}
