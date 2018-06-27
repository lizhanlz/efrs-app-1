// 搜索结果排序方法
import React from 'react';

export default class JsonUtils{
    /**
     * 根据指定字段，对json数组进行排序
     * 限制：该json数组对象必须是2维形式，其中第1维是数组，第2维由各字段组成的json
     *
     * @param array json数组对象
     * @param field 需要按此字段进行排序
     * @param reverse 是否逆序(desc)，默认为false
     */
    static sort (array,field,type,reverse){
        //数组长度小于2 或 没有指定排序字段 或 不是json格式数据
        if(array === undefined || array === 'undefined' || array.length < 2 || !field || typeof array[0] !== "object"){
            return array;
        }
        //数字类型排序
        if(type === 2 || type === 3) {
            array.sort(function(x, y) { return x[field] - y[field]});
        }
        //日期字符串类型排序
        if(type === 0 || type === 1) {
           array.sort(function(x, y) { return x[field].localeCompare(y[field])});
       }
        //倒序
        if(reverse) {
            array.reverse();
        }

        return array;
    }

}
