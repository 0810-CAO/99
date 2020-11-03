/*
1.什么是类型别名?
类型别名就是给一个类型起个新名字, 但是它们都代表同一个类型
例如: 你的本名叫张三, 你的外号叫小三, 小三就是张三的别名, 张三和小三都表示同一个人
* */
// 给string类型起了一个别名叫做MyString, 那么将来无论是MyString还是string都表示string
// type MyString = string;
// let value:MyString;
// value = 'abc';
// value = 123;
// value = false;

// 类型别名也可以使用泛型
// type MyType<T> = {x:T, y:T};
// let value:MyType<number>;
// value = {x:123, y:456};
// value = {x:'123', y:456};
// value = {x:false, y:456};

// 可以在类型别名类型的属性中使用自己
/*
type MyType = {
    name:string,
    // 一般用于定义一些树状结构或者嵌套结构
    children?:MyType
}
let value:MyType = {
    name:'one',
    children:{
        name:'one',
        children:{
            name:'one',
        }
    }
}
 */

// 接口和类型别名是相互兼容的
type MyType = {
    name:string
}
interface MyInterface {
    name:string
}
let value1:MyType = {name:'lnj'};
let value2:MyInterface = {name:'zs'};
value1 = value2;
value2 = value1;




