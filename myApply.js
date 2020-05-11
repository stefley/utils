Function.prototype.myApply = function(context) {
    context = context || window;
    let fn = Symbol();
    context[fn] = this;
    let args = [...arguments].slice(1);
    context[fn](args)
    delete context[fn];
}