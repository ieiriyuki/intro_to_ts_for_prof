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
