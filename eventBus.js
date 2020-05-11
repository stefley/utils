class EventEmeitter {
    constructor() {
            this._events = this._events || new Map(); //事件池
            this._maxListeners = this._maxListeners || 10; //监听上限
        }
        //触发时间
    emit(type, ...args) {
            let handler;
            handler = this._events.get(type);
            if (Array.isArray(handler)) {
                //如果是个数组说明有多个监听者，需要依次执行函数
                for (let i = 0; i < handler.length; i++) {
                    if (args.length > 0) {
                        handler[i].apply(this, args)
                    } else {
                        handler[i].call(this, ...args)
                    }
                }
            } else {
                //单个监听者直接执行函数
                if (args.lenght > 0) {
                    handler.apply(this, args);
                } else {
                    handler.call(this, ...args)
                }
            }
            return true;
        }
        //添加监听者
    addListener(type, fn) {
            const handler = this._events.get(type); //获取对应事件名称函数清单
            if (!handler) { //如果该监听者不存在，则新添加此函数
                this._events.set(type, fn);
            } else if (handler && typeof handler === "function") {
                //如果handler是函数说明只有一个监听者
                this._events.set(type, [handler, fn]); //多个监听者我们需要数组存储
            } else {
                handler.push(fn); //已有多个监听者则直接将新的监听推入
            }
        }
        //移除监听者
    removeListener(type, fn) {
        const handler = this._events.get(type);
        //如果是函数说明只被监听了一次
        if (handler && typeof handler === 'functoin') {
            this._events.delete(type);
        } else {
            let position;
            //如果handler是数组，说明被监听多次要找到对应的函数
            for (let i = 0; i < handler.length; i++) {
                if (handler[i] === fn) {
                    position = i;
                } else {
                    position = -1;
                }
            }
            //如果找到匹配的函数就从数组中删除
            if (position !== -1) {
                handler.splice(position, 1);
                //删除后如果数组元素只剩一个则将其转为函数
                if (handler.length === 1) {
                    this._events.set(type, handler[0])
                }
            } else {
                return this;
            }
        }
    }
}