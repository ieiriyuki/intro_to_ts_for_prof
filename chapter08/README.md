# Async

- 非同期処理関数にコールバックを渡す
- Promise を返す非同期処理を使い, Promise にその後の処理をする関数を渡す

## static method
- Promise.all
    - 複数の Promise を合成する
- Promise.race
    - 複数の Promise のうち, 最も早く成功または失敗したものの結果を返す
- Promise.allSettled
    - 複数の Promise の全てが解決したら成功
    - 全ての結果を待つ
    - 成功したら `{status: "fulfilled", value: result}`
    - 失敗したら `{status: "rejected", reason: result}`
- Promise.any
    - 複数の Promise で成功したもののうち, 最も早いものの結果を返す
- Promise.resolve
- Promise.reject

## chain
- then, catch, finally は新しい Promise を作る
- catch で先に発生したエラーを後続に成功として渡せる
- finally の結果は Promise の結果に影響を与えない
- Promise を返すことで連鎖できる
- コールバックで throw すると Promise を失敗させることができる
- 少なくとも最後の Promise のエラーハンドリングをする必要がある
    - しない場合 UnhandledPromiseRejection が起こる

## dynamic import
- `import(module)`
- 非同期的読み込み, 遅延評価

## async, await
```typescript
async function(args: T): Promise<U>{}
result = await Promissible

// top level await
// 関数ではないため async 関数外でも await できる
await Promissible
const foo = await Promissible
export const bar = foo

// error handling
// await 式でエラーが起こったとする
async function(args: T): Promise<U>{
    // foo
    try {
        bar = await Promissible
    } catch (error) {
        console.log(error)
    }
    // baz
}
```
