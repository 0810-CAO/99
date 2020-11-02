/*
TS中的类和ES6中的类'几乎'一样
观看本节课程之前建议先观看:
"从零玩转JavaScript核心+新特性③"
126-JavaScript-ES6类和对象(掌握)
127-JavaScript-ES6类和对象注意点上(掌握)
128-JavaScript-ES6类和对象注意点下(掌握)
129-JavaScript-ES6继承(掌握)
... ...
* */
class Person {
    name:string; // 和ES6区别, 需要先定义实例属性, 才能够使用实例属性
    age:number;
    constructor(name:string, age:number){
        this.name = name;
        this.age = age;
    }
    say():void{
        console.log(`我的名称叫${this.name}, 我的年龄是${this.age}`);
    }
    static food:string; // 静态属性
    static eat():void{ // 静态方法
        console.log(`我正在吃${this.food}`);
    }
}
let p = new Person('lnj', 34);
p.say();
Person.food = '蛋挞';
Person.eat();

class Student extends Person{
    book:string;
    constructor(name:string, age:number, book:string){
        super(name, age);
        this.book = book;
    }
    say():void{
        console.log(`我是重写之后的say-${this.name}${this.age}${this.book}`);
    }
    static eat():void{
        console.log(`我是重写之后的eat-${this.food}`);
    }
}
let stu = new Student('zs', 18, '从零玩转');
stu.say();
Student.food = '冰淇淋';
Student.eat();