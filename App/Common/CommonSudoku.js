// 九宫格组件

import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Text, Image, TouchableOpacity } from 'react-native';




// 获取屏幕宽度
const Dimensions = require("Dimensions");
const { width } = Dimensions.get('window');

// 常量设置
const cols = 4;  // 列数
const cellWidth = 100;  // 元素宽度
const vMargin = ( width - cellWidth * cols) / ( cols + 1 );  // 横向间隔宽度
const hMargin = 10;  // 纵向间隔宽度



export default class CommonSudoku extends Component {

    constructor (props) {
        super(props);
        thiz = this
    }
    render() {
        const data = this.props.data;

        return (
            <View style = {styles.container}>
                <FlatList
                    ref = {(flatList) => this._flatList = flatList}
                    renderItem = {this._renderItem}  // 元素组件
                    numColumns = {cols}  // 列数
                    data = {data} // 需要渲染的数据，只支持数组
                    extraData = {null}  // 额外的数据
                    columnWrapperStyle = {styles.wrapper} // 每一行的样式
                    ListHeaderComponent = {this._header} // 组件头部
                    refreshing = {false}  // 在等待加载时是否显示一个正在加载的符号
                    keyExtractor = {this._extraUniqueKey}  //给每个item生成一个key
                />

            </View>
        )
    }


    _renderItem = (Item) => {
        let txt = Item.item.name;
        let hasdata = Item.item.hasData;
        // 判断是否是更多图标
        if (txt === '全部') {
            return (
                <TouchableOpacity onPress={this.props.onPressFnMore}>
                    <View style = { styles.innerViewStyle }>
                        <Image source = { this.props.images[Item.index] } style = { styles.image } resizeMode = {'contain'}/>
                        <Text style = { styles.txt }>
                            更多
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            if (hasdata === "list"){
                // 图标点击指向列表页面
                return (
                    <TouchableOpacity onPress={this.props.onPressFnList}>
                        <View style = { styles.innerViewStyle }>
                            <Image source = { this.props.images[Item.index] } style = { styles.image } resizeMode = {'contain'}/>
                            <Text style = { styles.txt }>
                                { txt }
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
            } else if (hasdata === "detail"){
                // 图标点击指向详情页面
                return (
                    <TouchableOpacity onPress={this.props.onPressFnDetail}>
                        <View style = { styles.innerViewStyle }>
                            <Image source = { this.props.images[Item.index] } style = { styles.image } resizeMode = {'contain'}/>
                            <Text style = { styles.txt }>
                                { txt }
                            </Text>
                        </View>
                    </TouchableOpacity>

                )
            } else {
                // 图标不可点，没有数据
                return (
                    <View style = { styles.innerViewStyle }>
                        <Image source = { this.props.images[Item.index] } style = { styles.image1 } resizeMode = {'contain'}/>
                        <Text style = { styles.txt }>
                            { txt }
                        </Text>
                    </View>

                )
            }

        }

    };

    _extraUniqueKey(item, index) {
        return "index" + index + item
    }

    _header() {
        // 判断是否有头部
        if (thiz.props.headerName){
            return  <View style = { styles.header }>
                        <Text style = { styles.txt }>{thiz.props.headerName}</Text>
                    </View>
        } else {
            return null
        }
    }

}

const styles = StyleSheet.create({
    container: {

    },
    innerViewStyle: {
        width: cellWidth,
        marginLeft: vMargin,
        marginTop: hMargin,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        color: '#2F4F4F',
        fontSize: 20,

    },
    wraaper: {
        marginRight: vMargin,
    },
    image: {
        width: 30,
        height: 50,
    },
    image1: {
        width: 30,
        height: 50,
        tintColor: '#778899',
    },
    header: {
        backgroundColor: '#E6E6FA',
    },
});




