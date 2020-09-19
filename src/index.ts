import { UserEdit } from './Views/UserEdit'
import { User } from './models/User'

const rootElement = document.getElementById('root')
const user = User.buildUser({ name: 'idan', age: 37 })
if (rootElement) {
  const userEdit = new UserEdit(rootElement, user)
  userEdit.render()
  console.log(userEdit)
}
