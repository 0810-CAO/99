// 1.什么是索引签名?
// 索引签名用于描述那些“通过索引得到”的类型，比如arr[10]或obj["key"] 数组和对象属性

// interface FullName {
//     [propName:string]:string //key(string) value(string)
// }
// let obj:FullName = {
//     // 注意点: 只要key和value满足索引签名的限定即可, 无论有多少个都无所谓
//     firstName:'Jonathan',
//     lastName:'Lee',
//     // middleName:false // 报错
//     // false: '666' // 无论key是什么类型最终都会自动转换成字符串类型, 所以没有报错
// }

// interface stringArray {
//     [propName:number]:string
// }
// let arr:stringArray = {
//     0:'a',
//     1:'b',
//     2:'c'
// };
// let arr:stringArray = ['a', 'b', 'c'];
// console.log(arr[0]);
// console.log(arr[1]);
// console.log(arr[2]);

// 2.什么是只读属性?
// 让对象属性只能在对象刚刚创建的时候修改其值

// interface FullName {
//     firstName:string
//     readonly lastName:string
// }
// let myName:FullName = {
//     firstName: 'Jonathan',
//     lastName: 'Lee'
// };
// myName.lastName = 'Wang';
// console.log(myName);

// TS内部对只对属性进行了扩展, 扩展出来了一个只读数组
let arr2:Array<string> = ['a', 'b', 'c'];
// let arr2:ReadonlyArray<string> = ['a', 'b', 'c'];
console.log(arr2[0]); // a
arr2[0] = '666';
console.log(arr2[0]); // 666