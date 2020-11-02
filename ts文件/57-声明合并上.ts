/*
在ts当中接口和命名空间是可以重名的, ts会将多个同名的合并为一个
* */
// 1.接口
/*
interface TestInterface {
    name:string;
}
interface TestInterface {
    age:number;
}
// interface TestInterface {
//     name:string;
//     age:number;
// }
class Person implements TestInterface{
    name:string;
    age:number;
}
 */

// 1.1同名接口如果属性名相同, 那么属性类型必须一致
/*
interface TestInterface {
    name:string;
}
interface TestInterface {
    name:number;
}
 */
// 1.2同名接口如果出现同名函数, 那么就会成为一个函数的重载
/*
interface TestInterface {
    getValue(value:number):number;
}
interface TestInterface {
    getValue(value:string):number;
}
let obj:TestInterface = {
    getValue(value:any):number{
        if(typeof value === 'string'){
            return value.length;
        }else{
            return value.toFixed();
        }
    }
}
console.log(obj.getValue("abcdef"));
console.log(obj.getValue(3.14));
*/

// 2.命名空间
/*
namespace Validation{
    export let name:string = 'lnj';
}
namespace Validation{
    export let age:number = 18;
}
console.log(Validation.name);
console.log(Validation.age);
*/

// 1.1同名的命名空间中不能出现同名的变量,方法等
/*
namespace Validation{
    export let name:string = 'lnj';
    export let say = ()=> "abc";
}
namespace Validation{
    export let name:string = 'zs';
    export let say = ()=> "abc";
}
 */
// 1.2同名的命名空间中其它命名空间没有通过export导出的内容是获取不到的
namespace Validation{
    let name:string = 'lnj';
}
namespace Validation{
    export let say = ()=> {
        console.log(`name = ${name}`);
    };
}
Validation.say();