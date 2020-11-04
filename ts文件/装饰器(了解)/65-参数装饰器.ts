/*
1.参数装饰器
- 参数装饰器写在一个参数声明之前（紧靠着参数声明）。
- 参数装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
    + 对于静态成员来说是当前的类，对于实例成员是当前实例。
    + 参数所在的方法名称。
    + 参数在参数列表中的索引。
* */
/*
其它
属性装饰器,参数装饰器最常见的应用场景就是配合元数据(reflect-metadata),
在不改变原有结构的同时添加一些额外的信息
但是元数据目前也是在提案中, 也还没有纳入正式的标准
所以对于装饰器而言, 我们只需要了解即可,
因为提案中的所有内容将来都是有可能被修改的
因为提案中的所有内容目前都有兼容性问题
* */
function test(target:any, proptyName:string, index:number) {
    console.log(target);
    console.log(proptyName);
    console.log(index);
}
class Person {
    say(age:number,@test name:string):void{

    }
}


