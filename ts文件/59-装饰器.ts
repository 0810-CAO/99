/*
1.什么是装饰器?
- Decorator 是 ES7 的一个新语法，目前仍处于提案中，
- 装饰器是一种特殊类型的声明，它能够被附加到类，方法， 访问器，属性或参数上
- 被添加到不同地方的装饰器有不同的名称和特点
    + 附加到类上, 类装饰器
    + 附加到方法上,方法装饰器
    + 附加到访问器上,访问器装饰器
    + 附加到属性上,属性装饰器
    + 附加到参数上,参数装饰器

2. 装饰器基本格式
2.1普通装饰器
2.2装饰器工厂
2.3装饰器组合

3.如何在TS中使用装饰器?
在TS中装饰器也是一项实验性的特性, 所以要使用装饰器需要手动打开相关配置
修改配置文件 experimentalDecorators
* */
function test(target) {
    console.log('test');
}
// 如果一个函数返回一个回调函数, 如果这个函数作为装饰器来使用, 那么这个函数就是装饰器工厂
function demo() {
    console.log('demo out');
    return (target)=>{
        console.log('demo in');
    }
}
function abc(target) {
    console.log('abc');
}
function def() {
    console.log('def out');
    return (target)=>{
        console.log('def in');
    }
}

// 1.给Person这个类绑定了一个普通的装饰器
// 这个装饰器的代码会在定义类之前执行, 并且在执行的时候会把这个类传递给装饰器
// @test
// 2.给Person这个类绑定了一个装饰器工厂
// 在绑定的时候由于在函数后面写上了(), 所以会先执行装饰器工厂拿到真正的装饰器
// 真正的装饰器会在定义类之前执行, 所以紧接着又执行了里面
// @demo()
// 3.普通的装饰器可以和装饰器工厂结合起来一起使用
// 结合起来一起使用的时候, 会先从上至下的执行所有的装饰器工厂, 拿到所有真正的装饰器
// 然后再从下至上的执行所有的装饰器

//  demo out / def out / abc / def in / demo in / test
@test
@demo()
@def()
@abc
class Person {

}