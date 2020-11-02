// 1.对象混入
/*
let obj1 = {name:'lnj'};
let obj2 = {age:34};
Object.assign(obj1, obj2);
console.log(obj1);
console.log(obj2);
 */

// 2.类混入
// 需求: 定义两个类, 将两个类的内容混入到一个新的类中
class Dog {
    name:string = 'wc';
    say():void{
        console.log('wang wang');
    }
}
class Cat {
    age:number = 3;
    run():void{
        console.log('run run');
    }
}
// 注意点: 一次只能继承一个类
// class Animal extends Dog, Cat{
//
// }
class Animal implements Dog, Cat{
    name:string;
    age:number;
    say:()=>void;
    run:()=>void;
}
function myMixin(target:any, from:any[]) {
    from.forEach((fromItem)=>{
        Object.getOwnPropertyNames(fromItem.prototype).forEach((name)=>{
            target.prototype[name] = fromItem.prototype[name];
        })
    })
}
myMixin(Animal, [Dog, Cat]);
let a = new Animal();
console.log(a);
a.say();
a.run();
// console.log(a.name);
// console.log(a.age);



