// 参数个数
/*
let fn1 = (x:number, y:number)=>{};
let fn2 = (x:number)=>{};
fn1 = fn2;
fn2 = fn1; // 可少不可多
 */

// 参数类型
/*
let fn1 = (x:number)=>{};
let fn2 = (x:number)=>{};
let fn3 = (x:string)=>{};
fn1 = fn2;
fn2 = fn1;
fn1 = fn3; // 必须一模一样
fn3 = fn1;
 */

// 返回值类型
/*
let fn1 = ():number=> 123;
let fn2 = ():number=> 456;
let fn3 = ():string=> 'abc';
fn1 = fn2;
fn2 = fn1;
fn1 = fn3; // 必须一模一样
fn3 = fn1;
 */

// 函数双向协变
/*
// 参数的双向协变
// let fn1 = (x:(number | string)) =>{};
// let fn2 = (x:number) =>{};
// fn1 = fn2;
// fn2 = fn1;

// 返回值双向协变
let fn1 = (x:boolean):(number | string) => x ? 123 : 'abc';
let fn2 = (x:boolean):number => 456;
// fn1 = fn2; // 但是可以将返回值是具体类型的赋值给联合类型的
fn2 = fn1; // 不能将返回值是联合类型的赋值给具体类型的
 */

// 函数重载
function add(x:number, y:number):number;
function add(x:string, y:string):string;
function add(x, y) {
    return x + y;
}

function sub(x:number, y:number):number;
function sub(x, y) {
    return x - y;
}

// let fn = add;
// fn = sub; // 不能将重载少的赋值给重载多的

let fn = sub;
fn = add; // 可以将重载多的赋值给重载少


