import { Collection } from './Collection'
import { Model } from './Model'
import { APISync } from './APISync'
import { Eventing } from './Eventing'
import { Attributes } from './Attributes'

export interface UserProps {
  id?: number
  name?: string
  age?: number
}

const rootURL = 'http://localhost:3000/users'

export class User extends Model<UserProps> {
  static buildUser(attr: UserProps) {
    return new User(
      new Attributes<UserProps>(attr),
      new Eventing(),
      new APISync<UserProps>(rootURL)
    )
  }
  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootURL, this.buildUser)
  }
}
