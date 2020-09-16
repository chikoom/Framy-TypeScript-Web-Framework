import { User } from './models/User'

const testUser = new User({ name: 'Idan', age: 37 })
console.log(testUser.get('name'))
console.log(testUser.get('age'))

testUser.set({ age: 30 })
console.log(testUser.get('name'))
console.log(testUser.get('age'))
