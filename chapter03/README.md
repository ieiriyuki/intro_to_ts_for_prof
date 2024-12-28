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

- type 文: see index.ts
- interface 宣言: オブジェクト型のみ
    - 昔はこれしか使えなかった
- optional property
    - `baz?: number;`
- readonly property
    - `readonly foo: number;`
- `type T = typeof var`
    - 有用だが使いすぎないように
    - `const command_list = ["a", "b"] as const`
    - `type command = typeof command_list[number]`
- 構造的部分型
    - 型のプロパティを実際に比較して部分型かどうかを決める
    - 名前的部分型: 明示的に宣言された型, 継承などで宣言
- 余剰プロパティに対するコンパイルエラー
    - type annotation とオブジェクトリテラルの代入があるとエラーが起こる
- 型引数: see index.ts
    - 部分型, constraint: `extends`
- array
    - `.push`, `.unshift`, `.includes`, `.length`
    - 存在しないインデックスへアクセスできるため注意
- 分割代入: destructuring assignment
    - see `index.ts`
    - type is infered, not annotated
    - nested object can be assigned
    - array can be assigned
        - can be skipped: `const [, x, , y] = arr`
- `Date`
    - `Temporarl`
- `RegExp`
    - `/ab+c`
    - `string.replace()`
    - `string.match()`
- `Map`
    - `map.set()`, `map.get()`
- `Set<T>`

# Run index.ts
```bash
docker compose up
docker compose exec app bash
npx tsc
node deist/index.js
```
