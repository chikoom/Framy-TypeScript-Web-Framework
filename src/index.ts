import { UserForm } from './Views/UserForm'
import { User } from './models/User'

const rootElement = document.getElementById('root')
const user = User.buildUser({ name: 'idan', age: 37 })
if (rootElement) {
  const userForm = new UserForm(rootElement, user)
  userForm.render()
}
