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
