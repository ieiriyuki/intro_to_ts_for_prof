type MysteryFunc =
    | ((arg: string) => string)
    | ((arg: string) => number);

function mysteryFunction(func: MysteryFunc) {
    const result = func('42');
    console.log(result);
    console.log(typeof result);
    return func;
}
mysteryFunction((arg: string) => arg);

type Human = {name: string}
type Animal = {species: string}
function getName(human: Human) {
    return human.name;
}
function getSpecies(animal: Animal) {
    return animal.species;
}
const mysteryFunc = Math.random() > 0.5 ? getName : getSpecies;
// console.log(mysteryFunc({name: 'Alice'})); // error
const both: Human & Animal = {name: 'Alice', species: 'human'};
console.log(mysteryFunc(both));

// template literal types
type Greeting = `hello ${number}!`;
const myStr: Greeting = 'hello 88!';
console.log(myStr);
// const myStr2: Greeting = 'hello world!'; // error
// console.log(myStr2);
// as const

// lookup, keyof
type Person = {name: string; age: number};
function setAge(p: Person, age: Person['age']) { // look up type of age
    p.age = age;
}
const p: Person = {name: 'Alice', age: 22};
setAge(p, 23);
console.log(p);
type PKeys = keyof Person;
let key: PKeys = 'name';
console.log(key);
// key = 'foo'; // Type '"foo"' is not assignable to type 'keyof Person'
key = "age" // ok
const mmConversionTable = {
    mm: 1,
    cm: 10,
    m: 1000,
}
function convertUnits(value: number, unit: keyof typeof mmConversionTable) {
    const mmvalue = value * mmConversionTable[unit];
    return {
        mm: mmvalue,
        cm: mmvalue / mmConversionTable.cm,
        m: mmvalue / mmConversionTable.m,
    }
}
console.log(convertUnits(5_600, 'cm'));

// K は T のキーとして使われるため, K は T のキーを継承する必要がある
function get<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}
const b_name = get(both, 'name');
console.log(b_name);
const b_spec = get(both, 'species');
console.log(b_spec);
// number 型は obj のキーになれるものの, ランタイムでは string なのでエラーを起こしうる

// as const
const foo = ["john", "bob", "taro"] as const
type Name = (typeof foo)[number]
{const name: Name = "john"}
