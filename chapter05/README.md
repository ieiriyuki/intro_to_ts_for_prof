# Class

## inheritance

`class Name extends SubClass {}`

`class Name implements Type {}`: Type の部分型である

## this

オブジェクトをどう呼び出すかで this の実体が変わる

```typescript
class User {
    hello(): string {
        return "hello"
    }
}
const u = User
console.log(u) // this = u

const hello = u.hello;
console.log(hello()) // this = undefined
```

アロー関数は this を外側の関数から受け継ぐ (see index.ts)

`func.apply(obj, args)` の引数は this になる

`func.call(obj, arg, arg, ...)` も同様

`Reflect.apply(func, obj, args)` もある, call はない

`func.bind(obj)` で this を固定できる
