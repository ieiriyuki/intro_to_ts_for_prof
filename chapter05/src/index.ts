class User {
    name: string = '';
    age: number = 0;
    gender?: string;
    readonly birthYear: number = 2000;
    static admin = 'admin';
    // accesisbility modifier
    private privateProp: string = 'private'; // only accessible in the class
    protected protectedProp: string = 'protected'; // accessible in the class and its subclasses
    public publicProp: string = 'public';

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
console.log(uhyo2); // RefactoredUser { name: 'uhyo', age: 1 }
