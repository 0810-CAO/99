// 只比较实例成员, 不比较类的构造函数和静态成员
/*
class Person {
    public name:string;
    // public age:number;
    public static age:number;
    constructor(name:string, age:number){}
}
class Animal {
    public name:string;
    constructor(name:string){}
}
let p: Person;
let a: Animal;
p = a;
a = p; // 可多不少
 */

// 类的私有属性和受保护属性会响应兼容性
/*
class Person {
    protected name:string;
}
class Animal {
    protected name:string;
}
let p: Person;
let a: Animal;
p = a;
a = p; // 可多不少
 */