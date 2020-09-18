import { User } from './models/User'

const collection = User.buildUserCollection()
collection.on('change', () => {
  console.log('users fetch')
  console.log(collection)
})

const init = async () => {
  await collection.fetch()
}
init()
