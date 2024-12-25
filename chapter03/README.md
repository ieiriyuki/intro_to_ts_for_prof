# オブジェクトの基本とオブジェクトの型
`{}`: オブジェクトリテラル

```typescript
const baz
const obj = {
    foo: 123,
    bar: "hello world",
    baz, // プロパティ名 = 変数名の時
    "↑↓": "updown",
}

obj.foo // property access
obj["↑↓"]

const propName = "aaa"
const x = {
    [propName]: 1,
}

// expr1[expr2] // expr1: object

// spread syntax
const obj2 = {
    x: 1,
    ...obj
}

// object identity
const foo = { num: 123 }
const bar = foo;
console.log(bar.num) // 123
bar.num = 0
console.log(foo.num) // 0

// obj_1 === obj_2
// if obj are identical, then true
// if just values are same, then false
```
