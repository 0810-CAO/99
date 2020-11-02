// 泛型只影响使用的部分, 不会影响声明的部分
interface TestInterface<T> {
    // age:T;
}
let t1: TestInterface<number>; // age:number
let t2: TestInterface<string>; // age:string
t1 = t2;
t2 = t1;