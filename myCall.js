// call做了什么:
// 将函数设为对象的属性
// 执行 & 删除这个函数
// 指定this到函数并传入给定参数执行函数
// 如果不传入参数， 默认指向为 window

Function.prototype.myCall = function(context) {
    console.log(this)
    context = context || window;
    context.say = this;
    let fn = Symbol();
    context[fn] = this;
    // 处理参数 去除第一个参数this 其它传入fn函数
    let args = [...arguments].slice(1)
    context[fn](...args);
    delete context[fn]
}