// 节流：规定在一个单位时间内只能触发一次函数，如果这个单位时间内多次触发函数，只有一次生效
// 适用场景： 
// 1.拖拽：固定时间内只执行一次，防止超高频次触发位置变动
// 2.缩放：监控浏览器resize
// 3.动画：避免短时间内多次触发动画引起性能问题
// 4.射击游戏
// 5.计算鼠标移动的距离
function throttle(func, wait, options) {
    let context, args, timeout, old = 0;
    if (!options) options = {};
    let later = function() {
        old = new Date().valueOf();
        timeout = null;
        func.apply(context, args)
    }
    return function() {
        context = this;
        args = arguments;
        let now = new Date().valueOf();
        if (options.leading === false && !old) {
            old = now;
        }
        if (now - old > wait) {
            if (timeout) {
                clearTimeout(timeout)
                timeout = null;
            }
            func.apply(context, args)
            old = now;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, wait);
        }
    }
}