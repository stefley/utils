/**
 * bind的第一个参数用来改变this指向
 * bind会返回一个新函数
 * bind的传参方式和call相同，但是可以分离参数，可以将原函数的参数部分传入bind，剩下的参数传入返回的新函数
 * 实例化返回的新函数，this指向原函数构造出来的实例
 * 实例应该继承原函数的原型
 */
Function.prototype.myBind = function(ctx) {
  const originFn = this;
  let args = [].slice.call(arguments, 1)
  let tempFn = function() {}
  const newFn = function () {
    let restArgs = [].slice.call(arguments)
    return originFn.apply(this instanceof newFn ? this : ctx, args.concat(restArgs))
  }
  tempFn.prototype = this.prototype
  newFn.prototype = new tempFn()
  return newFn
}
