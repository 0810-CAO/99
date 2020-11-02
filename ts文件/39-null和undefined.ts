/*
1.null和undefined
TypeScript具有两种特殊的类型， null和 undefined，它们分别具有值null和undefined.
* */
// 默认情况下我们可以将 null和 undefined赋值给任意类型
// 默认情况下null和 undefined也可以相互赋值
// 注意点: 在企业开发中, 如果不想把 null和 undefined赋值给其它的类型
//         或者不想让 null和 undefined相互赋值, 那么我们就可以开启strictNullChecks
/*
let value1:null;
let value2:undefined;
value1 = value2;
value2 = value1;

let value3:number;
value3 = value1;
value3 = value2;
 */

// 如果我们开启了strictNullChecks, 还想把null和 undefined赋值给其它的类型
// 那么我们就必须在声明的时候使用联合类型
/*
let value:(number | null | undefined);
value = null;
value = undefined;
 */

// 对于可选属性和可选参数而言, 如果开启了strictNullChecks, 那么默认情况下数据类型就是联合类型
// 就是当前的类型 + undefined类型
class Person {
    name?:string
}
function say(age?:number) {

}







