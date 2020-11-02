/*
1.在泛型约束中使用类型参数?
一个泛型被另一个泛型约束, 就叫做泛型约束中使用类型参数
* */
// 需求: 定义一个函数用于根据指定的key获取对象的value
// interface KeyInterface{
//     [key:string]:any
// }
let getProps = <T, K extends keyof T>(obj:T, key:K):any=>{
    return obj[key];
}
let obj = {
    a:'a',
    b:'b'
}
// 代码不够健壮, 明明obj中没有c这个key但是却没有报错
// let res = getProps(obj, "c");
let res = getProps(obj, "a");
console.log(res);
