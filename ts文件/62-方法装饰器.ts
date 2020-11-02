/*
1.方法装饰器
- 方法装饰器写在在一个方法的声明之前（紧靠着方法声明）。
- 方法装饰器可以用来监视，修改或者替换方法定义。

- 方法装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
    + 对于静态方法而言就是当前的类, 对于实力方法而言就是当前的实例
    + 被绑定方法的名字。
    + 被绑定方法的属性描述符。
* */
/*
function test(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // console.log(target);
    // console.log(propertyKey);
    // console.log(descriptor);
    descriptor.enumerable = false;
}
class Person {
    // @test
    sayName():void{
        console.log('my name is lnj');
    }
    @test
    sayAge():void{
        console.log('my age is 34');
    }
    // @test
    static say():void{
        console.log('say hello world');
    }
}
let p = new Person();
for(let key in p){
    console.log(key);
}
 */
function test(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value = ():void=>{
        console.log('my name is it666');
    };
}
class Person {
    @test
    sayName():void{
        console.log('my name is lnj');
    }
}
let p = new Person();
p.sayName();

