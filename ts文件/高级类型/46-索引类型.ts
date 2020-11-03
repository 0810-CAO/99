// 通过[]索引类型访问操作符, 我们就能得到某个索引的类型
// class Person {
//     name:string;
//     age:number;
// }
// type MyType = Person['name'];

// 应用场景
// 需求: 获取指定对象, 部分属性的值, 放到数组中返回
/*
let obj = {
    name:'lnj',
    age:18,
    gender:true
}
function getValues<T, K extends keyof T>(obj:T, keys:K[]):T[K][] {
    let arr = [] as T[K][];
    keys.forEach(key=>{
        arr.push(obj[key]);
    })
    return arr;
}
let res = getValues(obj, ['name', 'age']);
console.log(res);
*/

// 索引访问操作符注意点
// 不会返回null/undefined/never类型
interface TestInterface {
    a:string,
    b:number,
    c:boolean,
    d:symbol,
    e:null,
    f:undefined,
    g:never
}
type MyType = TestInterface[keyof TestInterface];

