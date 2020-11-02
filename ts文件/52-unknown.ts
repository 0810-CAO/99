/*
 1.什么是unknown类型?
 unknown类型是TS3.0中新增的一个顶级类型, 被称作安全的any
* */
// 1.任何类型都可以赋值给unknown类型
// let value:unknown;
// value = 123;
// value = "abc";
// value = false;

// 2.如果没有类型断言或基于控制流的类型细化, 那么不能将unknown类型赋值给其它类型
// let value1:unknown = 123;
// let value2:number;
// value2 = value1;
// value2 = value1 as number;
// if(typeof value1 === 'number'){
//     value2 = value1;
// }

// 3.如果没有类型断言或基于控制流的类型细化, 那么不能在unknown类型上进行任何操作
// let value1:unknown = 123;
// value1++;
// (value1 as number)++;
// if(typeof value1 === 'number'){
//      value1++;
// }

// 4.只能对unknown类型进行 相等或不等操作, 不能进行其它操作(因为其他操作没有意义)
// let value1:unknown = 123;
// let value2:unknown = 123;
// console.log(value1 === value2);
// console.log(value1 !== value2);
// console.log(value1 >= value2); // 虽然没有报错, 但是不推荐, 如果想报错提示, 可以打开严格模式

// 5.unknown与其它任何类型组成的交叉类型最后都是其它类型
// type MyType = number & unknown;
// type MyType = unknown & string;

// 6.unknown除了与any以外, 与其它任何类型组成的联合类型最后都是unknown类型
// type MyType = unknown | any;
// type MyType = unknown | number;
// type MyType = unknown | string | boolean;

// 7.never类型是unknown类型的子类型
// type MyType = never extends unknown ? true : false;

// 8.keyof unknown等于never
// type MyType = keyof unknown;

// 9.unknown类型的值不能访问其属性,方法,创建实例
// class Person {
//     name:string = 'lnj';
//     say():void{
//         console.log(`name = ${this.name}`);
//     }
// }
// let p:unknown = new Person();
// p.say();
// console.log(p.name);


// 10.使用映射类型时, 如果遍历的是unknown类型, 那么不会映射任何属性
// type MyType<T> = {
//     [P in keyof T]:any
// }
// type res = MyType<unknown>





