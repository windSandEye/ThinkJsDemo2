let utils = {}

//数组相等比较
utils.arrEqual = function (arr1, arr2) {
    if (!arr2) {//如果arr2不存在
        return false;
    }
    if (arr1.length != arr2.length) {//数组长度比较
        return false;
    }
    //数组对象比较
    for (let i = 0, l = arr1.length; i < l; i++) {
        if (arr1[i] instanceof Array && arr2[i] instanceof Array) {//数组对象为数组
            if (!utils.arrEqual(arr1[i], arr2[i])) {
                return false;
            }
        }
        else if (arr1[i] instanceof Object && arr2[i] instanceof Object) {//数组对象为对象
            if (!utils.objEqual(arr1[i], arr2[i])) {
                return false;
            }
        }
        else if (arr1[i] !== arr2[i]) {//数组对象为基础对象
            return false;
        }
    }
    return true;
}

//对象相等比较
utils.objEqual = function (obj1, obj2) {
    for (let propName in obj1) {//先对obj1的属性进行校验
        if (!obj1.hasOwnProperty(propName)) {//如果该属性是继承父类的属性，直接跳过
            continue;
        }
        if (obj1.hasOwnProperty(propName) != obj2.hasOwnProperty(propName)) {//校验2个对象的属性名是不是相等
            return false;
        }
        if (typeof obj1[propName] != typeof obj2[propName]) {//校验2个对象的属性类型是否相等
            return false;
        }
    }
    for (let propName in obj2) {//在对obj2的属性进行校验，避免有属性只存在于obj2对象。

        if (!obj2.hasOwnProperty(propName)) {
            continue;
        }
        if (obj1.hasOwnProperty(propName) != obj2.hasOwnProperty(propName)) {
            return false;
        }
        if (typeof obj1[propName] != typeof obj2[propName]) {
            return false;
        }


        //属性值校验
        if (obj1[propName] instanceof Array && obj2[propName] instanceof Array) {//属性为数组时
            if (!utils.arrEqual(obj1[propName], obj2[propName])) {
                return false;
            }
        }
        else if (obj1[propName] instanceof Object && obj2[propName] instanceof Object) {//属性为对象时
            if (!utils.objEqual(obj1[propName], obj2[propName])) {
                return false;
            }
        }
        else if (obj1[propName] != obj2[propName]) {//属性为基础类型时
            return false;
        }
    }
    return true;
}

export default utils;