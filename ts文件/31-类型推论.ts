// 1.什么是自动类型推断?
// 不用明确告诉编译器具体是什么类型, 编译器就知道是什么类型

// 1.根据初始化值自动推断
/*
// 如果是先定义在初始化, 那么是无法自动推断的
// let value;
// value = 123;
// value = false;
// value = 'abc';

// 如果是定义的同时初始化, 那么TS就会自动进行类型推荐
// let value = 123; // let value:number = 123;
// value = 456;
// value = false;
// value = 'abc';

let arr = [1, 'a']; // let arr:(number | string) = [1, 'a'];
arr = ['a', 'b', 'c', 1, 3, 5, false]
 */

// 2.根据上下文类型自动推断
window.onmousedown = (event)=>{
    console.log(event.target);
}



