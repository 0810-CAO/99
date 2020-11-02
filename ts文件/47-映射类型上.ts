/*
1.什么是映射类型?
根据旧的类型创建出新的类型, 我们称之为映射类型
* */
/*
interface TestInterface1{
    name:string,
    age:number
}
interface TestInterface2 {
    readonly name:string,
    readonly age:number
}
*/
interface TestInterface1{
    name:string,
    age:number
}
interface TestInterface2{
    readonly name?:string,
    readonly age?:number
}
type ReadonlyTestInterface<T> = {
    // [P in keyof T]作用: 遍历出指定类型所有的key, 添加到当前对象上
    // readonly [P in keyof T]: T[P]
    // readonly [P in keyof T]?: T[P]
    -readonly [P in keyof T]-?: T[P]
}
type MyType = ReadonlyTestInterface<TestInterface2>


// 我们可以通过+/-来指定添加还是删除 只读和可选修饰符


// 由于生成只读属性和可选属性比较常用, 所以TS内部已经给我们提供了现成的实现
// Readonly / Partial

type MyType2 = Readonly<TestInterface1>
type MyType3 = Partial<TestInterface1>
type MyType4 = Partial<Readonly<TestInterface1>

