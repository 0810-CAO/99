/*
1.属性装饰器
- 属性装饰器写在一个属性声明之前（紧靠着属性声明）
- 属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：
    + 对于静态属性来说就是当前的类, 对于实例属性来说就是当前实例
    + 成员的名字。
* */
function test(target:any, proptyName:string) {
    console.log(target);
    console.log(proptyName);
    target[proptyName] = 'lnj';
}
class Person {
    // @test
    static age:number;
    @test
    name?:string;
}
let p = new Person();
console.log(p);