/*
1.类装饰器
- 类装饰器在类声明之前绑定（紧靠着类声明）。
- 类装饰器可以用来监视，修改或替换类定义
- 在执行类装饰器函数的时候, 会把绑定的类作为其唯一的参数传递给装饰器
- 如果类装饰器返回一个新的类，它会新的类来替换原有类的定义

2.装饰器和装饰器工厂区别
时候可以传递自定义参数
* */
/*
function test(target:any) {
    // console.log(target);
    target.prototype.personName = 'lnj';
    target.prototype.say = ():void=>{
        console.log(`my name is ${target.prototype.personName}`);
    }
}
*/
function test<T extends {new (...args:any[]):{}}>(target:T) {
    return class extends target {
        name:string = 'lnj';
        age:number = 18;
    }
}
/*
@test
class Person {

}
interface Person{
    say():void;
}
let p = new Person();
p.say();
 */

@test
class Person {

}
let p = new Person();
console.log(p);