// 类"实现"接口
/*
interface PersonInterface {
    name:string;
    say():void;
}
// 只要实现的某一个接口, 那么就必须实现接口中所有的属性和方法
class Person implements PersonInterface{
    name:string = 'lnj';
    say():void{
        console.log(`我的名字叫:${this.name}`);
    }
}
let p = new Person();
p.say();
*/

// 接口"继承"类
class Person {
    // protected name:string = 'lnj';
    name:string = 'lnj';
    age:number = 34;
    protected say():void{
        console.log(`name = ${this.name}, age = ${this.age}`);
    }
}
// let p = new Person();
// p.say();
// 注意点: 只要一个接口继承了某个类, 那么就会继承这个类中所有的属性和方法
//         但是只会继承属性和方法的声明, 不会继承属性和方法实现
// 注意点: 如果接口继承的类中包含了protected的属性和方法, 那么就只有这个类的子类才能实现这个接口
interface PersonInterface extends Person{
    gender:string;
}

class Student extends Person implements PersonInterface{
    gender:string = 'male';
    name:string = 'zs';
    age:number = 18;
    say():void{
        console.log(`name = ${this.name}, age = ${this.age}, gender = ${this.gender}`);
    }
}
let stu = new Student();
stu.say();
