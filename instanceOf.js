//模拟instanceOf
function instance_of(L, R) {
    //L标示左表达式，R表示右表达式
    var O = R.prototype; // 取R的原型
    L = L.__proto__; //取L的隐式原型
    while (true) {
        if (L === null) return false;
        if (O === L) {
            L = L.__proto;
            return true
        };
    }
}