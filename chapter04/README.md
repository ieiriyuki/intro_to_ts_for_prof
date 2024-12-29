# 関数

`function name(args): returned_type {}`

## function expression

`const f = function(args): type {}`

## arrow function expression

- `const f = (args, ...extra): type => {}`
- `const f = (args): type => return 1`

## method writing
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

