//实现简单的深度克隆  const  newObj = JSON.stringify(JSON.stringify(oldObj))
// 局限性：
// 1无法实现对函数、正则RegExp等特殊对象的克隆
// 2会抛弃对象的constructor，所有的构造函数都会指向Object
// 3对象有循环引用会报错


/** 
 * deep clone
 * @param {[type]} parent object  需要进行的克隆对象
 * @return {[type]}  深度克隆后的对象
 */



// 入参类型检查
// 当数据量较大并层次很深时，使用递归函数会导致栈溢出,而此处又无法使用尾递归,该怎么处理
// typeof Date,Math,RegExp,Function,Null 都返回Object 该怎么处理
// Date,RegExp,Function 应该如何克隆
// 当对象的两个属性v,s引用同一个对象时，克隆之后也应该引用同一个对象
// 对象的原型prototype 如何克隆
// 属性的getOwnPropertyDescriptor如何克隆
// for-in遍历的是原型链，需要用hasOwnProperty 判断是否是自有属性

function _getDataType(data) {
    return Object.prototype.toString.call(data).slice(8, -1);
}

function copyRegExp(regExp) {
    let attrs = '';
    if (regExp.global) attrs += 'g';
    if (regExp.ignoreCase) attrs += 'i';
    if (regExp.multiline) attrs += 'm';
    let newRegExp = new RegExp(regExp, attrs);
    newRegExp.lastIndex = regExp.lastIndex;
    return newRegExp;
}
const clone = parent => {
    //RegExp Date Function 克隆
    let type = _getDataType(parent);
    let root;
    switch (type) {
        case 'RegExp':
            return copyRegExp(parent);
            break;
        case 'Date':
            return new Date(parent.getTime())
            break;
        case 'Function':
            return parent;
            break;
        case 'Array':
            root = [];
            break;
        default:
            root = Object.create(Object.getPrototypeOf(parent))
    }
    //Array Object 克隆
    // 用来去重 解决原数据中多个属性引用同一对象克隆后不相同问题
    const uniqueList = [];
    //使用栈结构解决递归爆栈问题
    const stack = [{
            parent: root,
            key: undefined,
            data: parent
        }]
        //深度优先遍历
    while (stack.length) {
        const { parent, key, data } = stack.pop();
        //初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent;
        if (typeof key !== 'undefined') {
            let type = _getDataType(parent);
            let root;
            switch (type) {
                case "RegExp":
                    parent[key] = copyRegExp(data);
                    continue;
                case "Date":
                    parent[key] = new Date(data.getTime());
                    continue;
                case "Function":
                    parent[key] = data;
                    continue;
                case "Array":
                    res = parent[key] = [];
                    continue;
                default:
                    let proto = Object.getPrototypeOf(data);
                    res = parent[key] = Objec.create(proto);
            }
        }
        //  数据引用已经存在则赋值并退出本次循环，不存在则缓存
        let uniqueData = uniqueList.find(item => item.source === data);
        if (uniqueData) {
            parent[key] = uniqueData.target;
            continue;
        } else {
            uniqueList.push({
                source: data,
                target: res
            })
        }
        for (let k in data) {
            if (data.hasOwnProperty(k)) {
                if (data[k] === null || typeof data[k] !== 'object') {
                    //基础类型克隆
                    let descriptor = Object.getOwnPropertyDescriptor(data, k);
                    Object.defineProperty(res, k, descriptor);
                } else {
                    //引用类型加入stack循环处理
                    stack.push({
                        parent: res,
                        key: k,
                        data: data[k]
                    })
                }
            }
        }
    }
    return root;
}