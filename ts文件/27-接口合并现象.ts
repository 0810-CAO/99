// 27-接口合并现象
// 当我们定义了多个同名的接口时, 多个接口的内容会自动合并
interface TestInterface {
    name:string;
}
interface TestInterface {
    age:number;
}
/*
interface TestInterface {
    name:string;
    age:number;
}
* */

class Person implements TestInterface{
    age:number = 19;
    name:string = 'lnj';
}
