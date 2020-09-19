import { User, UserProps } from './../models/User'
import { Collection } from './../models/Collection'
import { CollectionView } from './CollectionView'

export class UserList extends CollectionView<
  Collection<User, UserProps>,
  User,
  UserProps
> {
  template(model: User): string {
    return `
      <div>
        <h2>User Name: ${model.get('name')}</h2>
        <h3>User Age: ${model.get('age')}</h3>
      </div>
    `
  }
  renderItem(model: User, itemParent: Element): void {
    const templateElement = document.createElement('template')
    templateElement.innerHTML = this.template(model)
    itemParent.append(templateElement.content)
  }
}
