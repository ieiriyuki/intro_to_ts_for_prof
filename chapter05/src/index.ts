class User {
    name: string = '';
    age: number = 0;
    gender?: string;
    readonly birthYear: number = 2000;
    static admin = 'admin';
    // accesisbility modifier
    private privateProp: string = 'private'; // only accessible in the class, typescript only
    protected protectedProp: string = 'protected'; // accessible in the class and its subclasses
    public publicProp: string = 'public';
    #foo: string = 'foo'; // private field, javascript spec, namespace unique

    // constructor
    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
        this.birthYear = 2024 - this.age; // allowed in constructor
    }

    // method
    isAdult(): boolean{
        return this.age >= 20;
    }

    // static method
    static getAdminName(): string{
        return this.admin;
    }

    canAccessPrivateProp(): string{
        return this.privateProp;
    }
}

// new expr(args)
const uhyo = new User("x", 1);
console.log(uhyo); // User { name: '', age: 0 }
uhyo.name = 'uhyo';
console.log(uhyo); // User { name: 'uhyo', age: 0 }
console.log(User.getAdminName());
console.log(uhyo.canAccessPrivateProp());
// console.log(uhyo.#foo); // error

class RefactoredUser {
    // can declare access modifier in constructor
    // typescript only, not in javascript
    constructor(public name: string, public age: number){}

    // method
    isAdult(): boolean{
        return this.age >= 20;
    }
}

const uhyo2 = new RefactoredUser("uhyo", 1);
console.log("uhyo2", uhyo2); // RefactoredUser { name: 'uhyo', age: 1 }
type RefactoredUserConstructor = new (name: string, age: number) => RefactoredUser;
const createUser: RefactoredUserConstructor = RefactoredUser;
const ru = new createUser("uhyo", 1);
console.log("ru", ru);

// class expression
// cannot use private, protected
const UserClass = class {
    name: string = '';
}
// 'UserClass' refers to a value, but is being used as a type here.
// const john: UserClass = new UserClass();

// static block
console.log("start static block");
class StaticBlock {
    static value = 999
    static {
        console.log('static block', this.value);
    }
}
console.log("end static block");

// type arguments
class GenericUser<T>{
    constructor(public name: T){}
}
const genericUser = new GenericUser<number>(1); // can be inferred
console.log(genericUser);

// instanceof
console.log(genericUser instanceof GenericUser); // instance なので true
const notGenericUser: GenericUser<number> = {name: 1};
console.log(notGenericUser instanceof GenericUser); // type is same but not instance, so false

// inherit
class InheritedUser<T> extends GenericUser<T>{
    // "noImplicitOverride": true requires override keyword
    constructor(public override name: T, public age: number){
        super(name); // necessary
    }
}
const iu = new InheritedUser<number>(1, 1);
console.log(iu);

// this
class ThisUser {
    name: string;
    #age: number;

    constructor(name: string, age: number){
        this.name = name;
        this.#age = age;
    }

    public isAdult(): boolean{
        return this.#age >= 20;
    }

    public filterOlder(users: readonly ThisUser[]): ThisUser[] {
        return users.filter(u => u.#age > this.#age)
    }
}
const vhyo = new ThisUser("vhyo", 20);
const jane = new ThisUser("jane", 10);
const bob = new ThisUser("bob", 30);
const older = vhyo.filterOlder([jane, bob]);
console.log(older);

// apply
const x = jane.isAdult.apply(bob, []);
console.log(x)
// bind
const callable = bob.isAdult.bind(jane);
console.log(callable());
console.log(callable.call(bob));

// error
function throwError(): void {
    try {
        throw new Error("intentional error");
    } catch (e) {
        console.log(typeof e); // object
        console.log("caught", e);
    } finally {
        console.log("finally");
    }
}
throwError();

// challenge
// to be refactored
console.log("challenge start");
function createMyUser(name: string, age: number): (message: string) => string {
    return (message: string) => {
        return `${name} (${age}) "${message}"`;
    }
}
const getMessage = createMyUser("vhyo", 2);
console.log(getMessage("hello"));
console.log("challenge end");
