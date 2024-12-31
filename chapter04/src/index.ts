// callback
type User = { name: string, age: number }
const getName = (user: User): string => user.name
const users: User[] = [{ name: 'a', age: 1 }, { name: 'b', age: 2 }]
const names = users.map(getName)
console.log(names) // ['a', 'b']

// call signature
type GetName = {
    (user: User): string,
    // optional
    dummy?: number
}
const getName2: GetName = (user) => user.name
const names2 = users.map(getName2)
console.log(names2) // ['a', 'b']
// 昔の javascript の使われ方の後方互換的に使われている, 現代的ではない

type User2 = {name: string}
type ReadOnlyUser = { readonly name: string }
const uhyoify = (user: User2) => {
    user.name = 'uhyo'
}
const john: ReadOnlyUser = { name: 'john' }
// john.name = 'uhyo' // error
uhyoify(john) // pass, User2 として扱われている
console.log(john) // changed!?

// challenge
console.log('challenge')
for (const i of sequence(1, 100)) {
    const message: string = getFizzBuzz(i)
    console.log(message)
}

function* sequence(start: number, end: number): Generator<number> {
    for (let i = start; i <= end; i++) {
        yield i
    }
}

function getFizzBuzz(i: number): string {
    if (i % 15 === 0) {
        return 'FizzBuzz'
    } else if (i % 3 === 0) {
        return 'Fizz'
    } else if (i % 5 === 0) {
        return 'Buzz'
    } else {
        return String(i)
    }
}

// challenge 2
function map<T, U>(array: T[], callback: (arg: T) => U): U[] {
    const result: U[] = []
    for (const element of array) {
        result.push(callback(element))
    }
    return result
}

const data = [1, -1, 2, -3, 5, 8, 13]
const result = map(data, (x) => x * 10)
console.log(result)
const data2: string[] = ["a", "b", "c"]
console.log(map(data2, (x) => x.toUpperCase()))
const result2: boolean[] = map(data, (x) => x >= 0)
console.log(result2)
