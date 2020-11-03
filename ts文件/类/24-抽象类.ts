/*
1.什么是抽象类?
抽象类是专门用于定义哪些不希望被外界直接创建的类的
抽象类一般用于定义基类
抽象类和接口一样用于约束子类

2.抽象类和接口区别?
接口中只能定义约束, 不能定义具体实现
而抽象类中既可以定义约束, 又可以定义具体实现
* */
/*
class Person {
    name:string;
    age: number;
    protected constructor(name:string, age:number){
        this.name = name;
        this.age = age;
    }
}
class Student extends Person{
    constructor(name:string, age:number){
        super(name, age);
    }
}
// let p = new Person('lnj', 34);
let stu = new Student('lnj', 34);
console.log(stu);
 */

abstract class Person04 {
    abstract name:string;
    abstract say():void;
    eat():void{//具体实现
        console.log(`${this.name}正在吃东西`);
    }
}
// let p = new Person();  子类必须存在name say()
class Student01 extends Person04{
    name:string = 'caochengxiang';
    say():void{
        console.log(`我的名字是${this.name}`);
    }
}
let stu = new Student01();
stu.say();
stu.eat();