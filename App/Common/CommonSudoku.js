// 九宫格组件

import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Text, Image, TouchableOpacity } from 'react-native';




// 获取屏幕宽度
const Dimensions = require("Dimensions");
const { width } = Dimensions.get('window');

// 常量设置
const cols = 4;  // 列数
const cellWidth = width / 4;  // 元素宽度



export default class CommonSudoku extends Component {

    constructor (props) {
        super(props);
        thiz = this
        this.state = {
            name: '',
        }
    }
    render() {

        const data = this.props.data;
        return (
            <View>
                <View style = {styles.container}>
                </View>
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
    componentDidMount() {


    }


    _renderItem = (Item) => {
        let name = Item.item.name;
        let image = Item.item.image;
        let hasdata = this.props.type[Item.index];
        // 判断是否是更多图标
        if (name === '全部') {
            return (
                <TouchableOpacity onPress={this.props.onPressFnMore}>
                    <View style = { styles.innerViewStyle }>
                        <Image source = {image} style = { styles.image } resizeMode = {'contain'}/>
                        <Text style = { styles.txt }>
                            { name }
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            if (hasdata === 1){
                // 图标点击指向列表页面
                return (
                    <TouchableOpacity onPress={()=> {
                        this.setState({
                            name: name
                        }, function () {
                            this.props.onPressFn()
                        })
                    }}>
                        <View style = { styles.innerViewStyle }>
                            <Image source = { image } style = { styles.image } resizeMode = {'contain'}/>
                            <Text style = { styles.txt }>
                                { name }
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
            } else if (hasdata === 2){
                // 图标点击指向详情页面
                return (
                    <TouchableOpacity onPress={()=> {
                        this.setState({
                            name: name
                        }, function () {
                            this.props.onPressFnDetail()
                        })
                    }}>
                        <View style = { styles.innerViewStyle }>
                            <Image source={image} style = { styles.image } resizeMode = {'contain'}/>
                            <Text style = { styles.txt }>
                                { name }
                            </Text>
                        </View>
                    </TouchableOpacity>

                )
            } else {
                // 图标不可点，没有数据
                return (
                    <View style = { styles.innerViewStyle }>
                        <Image source={image} style = { styles.image1 } resizeMode = {'contain'}/>
                        <Text style = { styles.txt }>
                            { name }
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
            return  <View>
                        <View style = { styles.header }>
                            <Text style = { styles.headerTxt }>{thiz.props.headerName}</Text>
                        </View>
                        <View style = { styles.headerLine }>
                        </View>
                    </View>
        } else {
            return null
        }
    }

}

const styles = StyleSheet.create({
    container: {
        height: 10,
    },
    innerViewStyle: {
        height: 110,
        width: cellWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {

        color: '#333333',
        fontSize: 15,
        backgroundColor: '#ffffff',

    },
    wraaper: {
    },
    image: {
        width: 30,
        height: 30,
        marginBottom:10,
    },
    image1: {
        width: 30,
        height: 30,
        marginBottom:10,

        tintColor: '#778899',
    },
    headerTxt: {
        color: '#333333',
        fontSize: 18,
        backgroundColor: '#ffffff',

    },
    header: {
        height: 50,
        marginLeft: 30,
        justifyContent: 'center',

    },
    headerLine: {
        height: 1,
        backgroundColor: '#cdd3ee',

    },
});




