import { Collection } from './models/Collection'
import { UserEdit } from './Views/UserEdit'
import { User } from './models/User'
import { UserList } from './Views/UserList'

const rootElement = document.getElementById('root')
// const user = User.buildUser({ name: 'idan', age: 37 })
// if (rootElement) {
//   const userEdit = new UserEdit(rootElement, user)
//   userEdit.render()
//   console.log(userEdit)
// }

const userCollection = User.buildUserCollection()
userCollection.fetch().then(() => {
  console.log(userCollection)
  if (rootElement) {
    const userColelctionView = new UserList(rootElement, userCollection)
    userColelctionView.render()
  }
})
