// type statement
type FooBar = {
    foo: number;
    bar: string;
}

const fooBar: FooBar = {
    foo: 123,
    bar: 'hello'
}

console.log(fooBar.foo);

// 昔は interface しか使えなかった
interface FooBar2 {
    foo: number;
    bar: string;
}
const fooBar2: FooBar2 = {
    foo: 456,
    bar: 'world'
}
console.log(fooBar2.foo);

// index signature
type IndexSignature = {
    [key: string]: number;
}
const data: IndexSignature = {
    key1: 123,
    key2: 456,
}
data.key3 = 789;
console.log(data.key3);
// data.foo = "bar" // compile error
const num: number = data.key4 // may break type safety
console.log(num); // undefined
// どんな名前のプロパティにもアクセスできてしまう
// index signature は使わない方が良い
const propName: string = "foo"
const obj = {
    [propName]: 123
}
console.log(obj.foo) // 123, not correct type inference

// type parameters
type Family<P, C> = {
    parents: P;
    children?: C;
}
const obs: Family<string, number> = {
    parents: "parents",
    children: 3
}
console.log(obs);
type HasName = { name: string }
type FamilyName<P extends HasName, C extends HasName> = {
    parents: P;
    children: C;
}
// optional, define default
type FamilyName2<
    P = { name: string },
    C = { name: string }
> = {
    parents: P;
    children: C;
}

// array
const arr1: number[] = [3, 4]
const arr2: Array<number> = [1, 2, ...arr1]
const arr3: readonly number[] = [1, 2, 3]
console.log(arr2);
for (const num of arr3) {
    console.log(num);
}

// tuple
const tuple1: [string, number, boolean?] = ["yeah", 987]
console.log(tuple1[0])
console.log(tuple1[1])

// destructuring assignment
{
    const [name, age] = tuple1
    console.log(name)
    console.log(age)
}
const {
    parents,
    children: numChildren,
} = obs
console.log(parents)
console.log(numChildren)
// default value
const obs2: Family<string, number> = {
    parents: "parents",
}
const {
    parents: p = "no name",
    children: c = 0,
} = obs2
console.log(p)
console.log(c)
// null is not assigned to default value
// rest pattern
// const { foo, ...rest } = obj
