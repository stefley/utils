// 防抖：时间响应函数在一定时间后才执行，如果在这段时间内再次掉用函数，则重新计算延迟执行时间
// 应用场景：1.scroll滚动事件触发 2.搜索框输入查询 3.表单验证 4.按钮提交 5.窗口缩放
function debounce(func, wait, immediate) {
    let timeout, result;
    let debounce = function(...args) {
        var context = this;
        if (timeout) clearTimeout(timeout);
        //立即执行
        if (immediate) {
            let callNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            }, wait);
            if (callNow) result = func.apply(context, args)
        } else {
            timeout = setTimeout(() => {
                func.apply(context, args)
            }, wait);
        }
        return result;
    }
    debounce.cancel = function() {
        clearTimeout(timeout)
        timeout = null;
    }
    return debounce;
}