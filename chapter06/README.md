# Type Advanced
## Union
`T | U`

```typescript
type User =
    | T
    | U
```

## Intersection
`T & U`

## Optional Chaining
`obj?.prop`: obj can be undefined

```typescript
type GetTimeFunc = () => Date
function useTime(getTimeFunc: GetTimeFunc | undefined) {
    const timeOrUndefined = getTimeFunc?.()
}
```

## literal type
```typescript
type Foo = "foo"
const foo: "foo" = "foo"
const one: 1 = 1
const t: true = true
const bi: 3n = 3n
```

widening で型を柔軟な方に推論する場合がある
```typescript
const uhyo1 = "uhyo" // widening
const uhyo2: "uhyo" = "uhyo" // not
```

`typeof`

algebraic data types, tagged union

オブジェクトに tag 的なプロパティをつけて, 場合わけする

switch を使えば網羅してない時にエラーが出せる

## type assertion
基本的に避けるべき

`expr as type`

値変換とは別

```typescript
type User = Human | Animal;
function getNAmesIfAllHuman(users: readonly User[]): string[] | undefined {
    if (users.every(user => user.tag === "human")) {
        // return users.map(user => user.name); // compile error
        return (users as Human[]).map(user => user.name);
    }
    return undefined
}
```

`obj!.prop` obj が null | undefined ではないと仮定させる

### as const
- 配列リテラルの型推論結果を配列型ではなくタブル型にする
- オブジェクトリテラルから推論されるオブジェクト型は, 全てのプロパティが readonly になる
- 配列リテラルから推論されるタプル型も readonly タプル型になる
- 文字列, 数値, BigInt, boolean リテラルに対してつけられるリテラル型が, widening しないリテラル型になる
- テンプレート文字列リテラルの型が string ではなくテンプレートリテラル型になる

```typescript
const foo = ["john", "bob", "taro"] as const
type Name = (typeof foo)[number]
```
