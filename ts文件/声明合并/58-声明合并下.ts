// 除了同名的接口和命名空间可以合并以外
// 命名空间还可以和同名的类/函数/枚举合并
// 命名空间和类合并
// 注意点: 类必须定义在命名空间的前面
// 会将命名空间中导出的方法作为一个静态方法合并到类中
/*
class Person {
    say():void{
        console.log('hello world');
    }
}
namespace Person{
    export const hi = ():void=>{
        console.log('hi');
    }
}
console.dir(Person);
 */

// 命名空间和函数合并
// 注意点: 函数必须定义在命名空间的前面
/*
function getCounter() {
    getCounter.count++;
    console.log(getCounter.count);
}
namespace getCounter{
    export let count:number = 0;
}
 */

// 命名空间和枚举合并
// 注意点: 没有先后顺序的要求
/*
enum Gender {
    Male,
    Female
}
namespace Gender{
    export const Yao:number = 666;
}
console.log(Gender);
 */