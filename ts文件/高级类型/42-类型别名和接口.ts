// 接口和类型别名异同
// 1.都可以描述属性或方法
// type MyType = {
//     name:string;
//     say():void;
// }
// interface MyInterface {
//     name:string;
//     say():void;
// }

// 2.都允许拓展
/*
interface MyInterface {
    name:string;
    say():void;
}
interface MyInterface2 extends MyInterface{
    age:number;
}
let value:MyInterface2 = {
    name:'lnj',
    age:18,
    say():void{

    }
}
 */

/*
type MyType = {
    name:string;
    say():void;
}
type MyType2 = MyType & {
    age:number;
}
let value:MyType2 = {
    name:'lnj',
    age: 18,
    say():void{

    }
}
 */


// 3.type 可以声明基本类型别名，联合类型，元组等类型, interface不能
// type MyType1 = boolean;
// type MyType2 = string | number;
// type MyType3 = [string, boolean, number];

// 4.type不会自动合并
// interface MyInterface {
//     name:string
// }
// interface MyInterface {
//     age:number
// }
// let value:MyInterface  ={
//     name:'lnj',
//     age:18
// }

// type MyType = {
//     name:string
// }
// type MyType = {
//     age:number
// }

