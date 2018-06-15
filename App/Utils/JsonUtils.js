
import React from 'react';

// let tempData = [
//     {id: 10, recordNo: "2018-08-03", userId: 1, recordType: 9, recordCode: "", recordInMoney: 1111},
//     {id: 5, recordNo: "2018-07-03", userId: 1, recordType: 9,recordInMoney: 11},
//     {id: 2, recordNo: "2018-08-30", userId: 1, recordType: 9,recordInMoney:500}
// ];

export default class JsonUtils{
    /**
     * 根据指定字段，对json数组进行排序
     * 限制：该json数组对象必须是2维形式，其中第1维是数组，第2维由各字段组成的json
     *
     * @param array json数组对象
     * @param field 需要按此字段进行排序
     * @param reverse 是否逆序(desc)，默认为false
     */
    static sort (array, field, reverse){
        //数组长度小于2 或 没有指定排序字段 或 不是json格式数据
        if(array === undefined || array === 'undefined' || array.length < 2 || !field || typeof array[0] !== "object"){
            return array;
        }
        //数字类型排序
        if(typeof array[0][field] === "number") {
            array.sort(function(x, y) { return x[field] - y[field]});
        }
        //字符串类型排序
        if(typeof array[0][field] === "string") {
            array.sort(function(x, y) { return x[field].localeCompare(y[field])});
        }
        //倒序
        if(reverse) {
            array.reverse();
        }

        return array;
    }

}
