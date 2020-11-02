/*
1.条件类型(三目运算)
判断前面一个类型是否是后面一个类型或者继承于后面一个类型
如果是就返回第一个结果, 如果不是就返回第二个结果
语法: T extends U ? X : Y;
* */
// type MyType<T> = T extends string ? string : any;
// type res = MyType<boolean>

/*
2.分布式条件类型?
被检测类型是一个联合类型的时候, 该条件类型就被称之为分布式条件类型
* */
// type MyType<T> = T extends any ? T : never;
// type res = MyType<string | number | boolean>;

// 从T中剔除可以赋值给U的类型。 Exclude
// type MyType<T, U> = T extends U ? never : T;
// type res = MyType<string | number | boolean, number>
// type res = Exclude<string | number | boolean, number>

// 提取T中可以赋值给U的类型。 Extract
// type res = Extract<string | number | boolean, number | string>

// 从T中剔除null和undefined。 NonNullable
// type res = NonNullable<string | null | boolean | undefined>

// 获取函数返回值类型。 ReturnType
// type res = ReturnType<(()=>number)>

// 获取一个类的构造函数参数组成的元组类型。 ConstructorParameters
// class Person {
//     constructor(name:string, age:number){}
// }
// type res = ConstructorParameters<typeof Person>;

// 获得函数的参数类型组成的元组类型。 Parameters
function say(name:string, age:number, gender:boolean) {
}
type res = Parameters<typeof say>;



