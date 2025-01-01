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
