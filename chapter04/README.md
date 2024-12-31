# 関数

`function name(args): returned_type {}`

## function expression

`const f = function(args): type {}`

## arrow function expression

- `const f = (args, ...extra): type => {}`
- `const f = (args): type => return 1`

## method writing
- 関数の部分型関係の法則が当てはまらない場合がある
- 安全性が低くなるため, メソッド記法を避けるべき

```typescript
const obj = {
    double(num: number): number {
        return num * 2
    }
}
```

関数もオブジェクトの一種

## callback
- map, filter, every, some, find

## 関数型

`(args) => type`

## Others

- 通常の型は, readonly 型の部分型
- 基本的には, 引数の型は必要以上に厳しくせず, 必要最低限の型にするべき
