/*
1.什么是泛型约束?
默认情况下我们可以指定泛型为任意类型
但是有些情况下我们需要指定的类型满足某些条件后才能指定
那么这个时候我们就可以使用泛型约束
* */
// 需求: 要求指定的泛型类型必须有Length属性才可以
interface LengthInterface{
    length:number
}
let getArray = <T extends LengthInterface>(value:T, items:number = 5):T[]=>{
    return new Array(items).fill(value);
};
let arr = getArray<string>('abc');
// let arr = getArray<number>(6);
let res = arr.map(item=>item.length);