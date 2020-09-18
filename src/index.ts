import { User } from './models/User'

const testUser = new User({ name: 'Idan', age: 37 })

testUser.on('save', () => {
  console.log('User saved')
  console.log(testUser)
})

testUser.on('save', () => {
  console.log('User fetched')
  console.log(testUser)
})

console.log(testUser.get('name'))
testUser.set({ name: 'Kundi' })
testUser.save().then(() => {
  testUser.fetch()
})
