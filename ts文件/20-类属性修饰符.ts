// public(公开的)      :
// 如果使用public来修饰属性, 那么表示这个属性是公开的
// 可以在类的内部使用, 也可以在子类中使用, 也可以在外部使用

// protected(受保护的) :
// 如果使用protected来修饰属性, 那么表示这个属性是受保护的
// 可以在类的内部使用, 也可以在子类中使用

// private(私有的)     :
// 如果使用private来修饰属性, 那么表示这个属性是私有的
// 可以在类的内部使用

// readonly(只读的)    :
/*
class Person {
    public name:string; // 默认情况下就是public的
    protected age:number;
    private gender:string;
    constructor(name:string, age:number, gender:string){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    say():void{
        console.log(`name=${this.name},age=${this.age},gender=${this.gender}`);
    }
}
class Student extends Person{
    constructor(name:string, age:number, gender:string){
       super(name,age,gender);
    }
    say():void{
        // console.log(`name=${this.name}`);
        // console.log(`age=${this.age}`);
        // console.log(`gender=${this.gender}`);
    }
}
let p = new Person('lnj',34, 'male');
p.say();
// console.log(p.age);
// console.log(p.gender);

let stu = new Student('zs', 18, 'female');
stu.say();
// console.log(stu.age);
 */

/*
class Demo {
    readonly name:string;
    constructor(name:string){
        this.name = name;
    }
    static food:string;
}
let demo = new Demo('123');
console.log(demo.name);
// demo.name = 'abc';
console.log(demo.name);
*/
