import { UserShow } from './UserShow'
import { User, UserProps } from './../models/User'
import { CollectionView2 } from './CollectionView2'

export class UserList2 extends CollectionView2<User, UserProps> {
  renderItem(model: User, itemParent: Element) {
    new UserShow(itemParent, model).render()
  }
}
