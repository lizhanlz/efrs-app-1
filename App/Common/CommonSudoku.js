// 九宫格组件

import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Text, Image, TouchableOpacity } from 'react-native';

import CornerLabel from './CornerLabel'


// 获取屏幕宽度
const Dimensions = require("Dimensions");
const { width } = Dimensions.get('window');

// 常量设置
const cols = 4;  // 列数
const cellWidth = (width) / 4;  // 元素宽度


export default class CommonSudoku extends Component {
    static defaultProps = {
        height: 90,
    }

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
    componentWillMount() {
    }


    _renderItem = (Item) => {
        let name = Item.item.name;
        let image = Item.item.image;
        let hasdata = this.props.type[Item.index];
        // 判断是否是更多图标
        if (name === '全部') {
            return (
                <TouchableOpacity onPress={this.props.onPressFnMore}>
                    <View style = {{
                        height: this.props.height,
                        width: cellWidth,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
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
                        <View style = {{
                            height: this.props.height,
                            width: cellWidth,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Image source = { image } style = { styles.image } resizeMode = {'contain'}/>
                            <Text style = { styles.txt }>
                                { name }
                            </Text>
                        </View>
                        {/*<CornerLabel*/}
                            {/*cornerRadius={54}*/}
                            {/*alignment={'right'}*/}
                            {/*style={{backgroundColor:'red', height: 24,}}*/}
                            {/*textStyle={{color: '#fff', fontSize: 12,}}*/}
                            {/*>*/}
                            {/*未开放*/}
                        {/*</CornerLabel>*/}
                    </TouchableOpacity>
                )
            }else {
                // 图标不可点，没有数据
                return (
                    <View style = {{
                        height: this.props.height,
                        width: cellWidth,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image source={image} style = { styles.image1 } resizeMode = {'contain'}/>
                        <Text style = { styles.txt1 }>
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

    _header = () => {
        // 判断是否有头部
        if (this.props.headerName === null){
            return  null
        } else {
            return  <View>
                        <View style = { styles.header }>
                            <Text style = { styles.headerTxt }>{this.props.headerName}</Text>
                        </View>
                        <View style = { styles.headerLine }>
                        </View>
                    </View>
        }
    }

}




const styles = StyleSheet.create({
    container: {
        height: 0,
    },
    innerViewStyle: {
    },
    txt: {

        color: '#333333',
        fontSize: 13,
        backgroundColor: '#ffffff',

    },
    txt1: {

        color: '#333333',
        fontSize: 13,
        backgroundColor: '#ffffff',
        opacity:0.4,

    },
    wrapper: {
        // marginLeft:10,
        // marginRight:10,
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

        tintColor: '#333333',
        opacity:0.4,
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




