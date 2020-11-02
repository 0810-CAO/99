// public :
// 如果使用public来修饰方法, 那么表示这个方法是公开的
// 可以在类的内部使用, 也可以在子类中使用, 也可以在外部使用

// protected :
// 如果使用protected来修饰方法, 那么表示这个方法是受保护的
// 可以在类的内部使用, 也可以在子类中使用

// private
// 如果使用private来修饰方法, 那么表示这个方法是私有的
// 可以在类的内部使用

/*
class Person {
    name:string;
    age:number;
    gender:string;
    constructor(name:string, age:number, gender:string){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    public sayName():void{
        console.log(`name=${this.name}`);
    }
    protected sayAge():void{
        console.log(`age=${this.age}`);
    }
    private sayGender():void{
        console.log(`gender=${this.gender}`);
    }
    say():void{
        this.sayName();
        this.sayAge();
        this.sayGender();
    }
}
class Student extends Person {
    constructor(name: string, age: number, gender: string) {
        super(name, age, gender);
    }
    say():void{
        this.sayName();
        this.sayAge();
        this.sayGender();
    }
}
let p = new Person('lnj', 34, 'male');
p.say();
p.sayName();
p.sayAge();
p.sayGender();
let stu = new Student('zs', 18, 'female');
stu.say();
*/

/*
需求: 有一个基类, 所有的子类都需要继承于这个基类, 但是我们不希望别人能够通过基类来创建对象
* */
/*
class Person {
    name:string;
    age:number;
    gender:string;
    protected constructor(name:string, age:number, gender:string){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    say():void{
        console.log(`name=${this.name},age=${this.age},gender=${this.gender}`);
    }
}
class Student extends Person {
    constructor(name: string, age: number, gender: string) {
        super(name, age, gender);
    }
}
let p = new Person('lnj', 34, 'male');
let stu = new Student('zs', 18, 'female');
 */