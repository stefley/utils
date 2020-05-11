Function.prototype.myBInd = function(context) {
    //返回一个绑定this的函数
    let _this = this;
    //可以支持柯里化传参，保存参数
    let args = [...arguments].slice(1);
    // 返回函数
    return function() {
        let newArgs = [...arguments];
        //返回函数绑定this，传入两次保存的参数
        //考虑返回函数有返回值，return
        return _this.apply(context, args.concat(newArgs));
    }
}