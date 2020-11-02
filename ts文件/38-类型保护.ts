/*
3.类型保护
对于联合类型的变量，在使用时如何确切告诉编译器它是哪一种类型
通过类型断言或者类型保护
* */
let getRandomValue = ():(string | number)=>{
    let num = Math.random();
    return (num >= 0.5) ? 'abc' : 123.123;
}
// let value = getRandomValue();
// console.log(value);
/*
// 虽然通过类型断言可以确切的告诉编译器当前的变量是什么类型,
// 但是每一次使用的时候都需要手动的告诉编译器, 这样比较麻烦, 冗余代码也比较多
if((value as string).length){
    console.log((value as string).length);
}else{
    console.log((value as number).toFixed());
}
 */
/*
// 定义了一个类型保护函数, 这个函数的'返回类型'是一个布尔类型
// 这个函数的返回值类型是, 传入的参数 + is 具体类型
function isString(value:(string | number)): value is string {
    return typeof value === 'string';
}
if(isString(value)){
    console.log(value.length);
}else{
    console.log(value.toFixed());
}
 */
/*
// 除了可以通过定义类型保护函数的方式来告诉编译器使用时联合类型的变量具体是什么类型以外
// 我们还可以使用typeof来实现类型保护
// 注意点:
// 如果使用typeof来实现类型保护, 那么只能使用 === / !==
// 如果使用typeof来实现类型保护, 那么只能保护 number/string/boolean/symbol类型
if(typeof value === 'string'){
    console.log(value.length);
}else{
    console.log(value.toFixed());
}
 */
// 除了可以通过typeof类实现类型保护以外, 我们还可以通过instanceof来实现类型保护
class Person {
    name:string = 'lnj';
}
class Animal {
    age: number = 18;
}
let getRandomObject = ():(Person | Animal)=>{
    let num = Math.random();
    return (num >= 0.5) ? new Person() : new Animal();
};
let obj = getRandomObject();
console.log(obj);
if(obj instanceof Person){
    console.log(obj.name);
}else{
    console.log(obj.age);
}
