/*
1.什么是声明?
- 在企业开发中我们不可避免的需要引用第三方的 JS 的库,
  但是默认情况下TS是不认识我们引入的这些JS库的
  所以在使用这些JS库的时候, 我们就要告诉TS它是什么, 它怎么用
- 如何告诉TS呢?
  那就是通过声明来告诉
* */
declare const $:(selector:string)=>{
    width():number;
    height():number;
    ajax(url:string, config:{}):void;
};
console.log($);
console.log($('.main').width());
console.log($('.main').height());

