declare let myName:string;
declare function say(name:string, age:number):void;
// 注意点: 声明中不能出现实现
declare class Person {
    name:string;
    age:number;
    constructor(name:string, age:number);
    say():void;
}