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

// user defined type guard
function isString(test: unknown): test is string {
    return typeof test === 'string';
}
console.log(isString('hello'));
console.log(isString(42));
function isPerson(test: unknown): asserts test is Person {
    if (test == null) {
        throw new Error('test is null or undefined');
    }
    if (
        typeof (test as Person).name !== 'string' ||
        typeof (test as Person).age !== 'number'
    ) {
        throw new Error('test is not a Person');
    }
}
isPerson({name: 'Alice', age: 22});
try {
    isPerson(1)
} catch (e) {
    console.log(e);
} finally {
    console.log('finally');
}

// variadic tuple types
type StringNumberBooleans = [string, number, ...boolean[]];
const a: StringNumberBooleans = ['hello', 42, true, false];
// const b: StringNumberBooleans = ['hello', 'world']; // compile error
type NumberStringNumber = [number, ...string[], number];
const c: NumberStringNumber = [42, 'hello', 'world', 42];
// can use once
// optional elements are not after ...array
type NSN = [number, string, number]
type SNSNS = [string, ...NSN, string]
// ...T[] 型変数を与えることはできるが, T extends readonly any[] を満たすことが必要

// mapped types
type Fruit = 'apple' | 'orange' | 'strawberry';
type FruitNumbers = {
    [P in Fruit]: number
}
const numbers1: FruitNumbers = {
    apple: 5,
    orange: 10,
    strawberry: 15,
}
type FruitArrays = {
    [P in Fruit]: P[]
}
const numbers2: FruitArrays = {
    apple: ['apple', 'apple'],
    orange: ['orange', 'orange', 'orange', 'orange', 'orange'],
    strawberry: ['strawberry'],
}

// conditional types
type RestArgs<M> = M extends "string" ? [string, string] : [number, number, number];
function func<M extends "string" | "number">(
    mode: M,
    ...args: RestArgs<M>
) {
    console.log(mode, ...args);
}
func("string", "uhyo", "hyo")
func("number", 1, 2, 3)

// challenge
{
    console.log('challenge starts');
    class Option<T extends unknown> { // Type で作るべき
        type: string;
        constructor(public value: T) {
            this.type = value === null ? "null" : typeof value;
        }
    }
    function mapOption<T, U>(
        value: Option<T>,
        func: (arg: T) => U,
    ): Option<U> {
        if (value.type === 'null' || value.type === 'undefined') {
            return value as unknown as Option<U>;
        }
        return new Option(func(value.value));
    }
    const n: Option<number> = new Option(42);
    const s: Option<string> = new Option('hello');
    const b: Option<boolean> = new Option(true);
    const o: Option<object> = new Option({});
    const d: Option<undefined> = new Option(undefined);
    const l: Option<null> = new Option(null);
    function receiveOption<T>(value: Option<T>) {
        console.log(value.type, value.value);
    }
    receiveOption(n);
    receiveOption(mapOption(n, (v) => v + 1));
    receiveOption(s);
    receiveOption(mapOption(s, (v) => v + v));
    receiveOption(b);
    receiveOption(o);
    receiveOption(d);
    receiveOption(mapOption(d, () => 1));
    receiveOption(l);
    console.log(Option, typeof Option);
    console.log('challenge ends');
}
