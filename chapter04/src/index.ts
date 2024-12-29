// callback
type User = { name: string, age: number }
const getName = (user: User): string => user.name
const users: User[] = [{ name: 'a', age: 1 }, { name: 'b', age: 2 }]
const names = users.map(getName)
console.log(names) // ['a', 'b']
