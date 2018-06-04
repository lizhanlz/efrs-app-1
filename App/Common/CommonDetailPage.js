import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,

} from 'react-native';

export default class CommonDetailPage extends Component {

    constructor(props){
        super(props);

    }

    render(){
        const { state: {params}} = this.props.navigation;
        //json数据循环生成列表
        let FirstData = this.props.navigation.state.params.info;
        const DataArr = [];
        for(let i in FirstData){
            console.log(i);
            console.log(FirstData[i]);
            DataArr.push(
                {
                    name: i,
                    value: FirstData[i],
                }
            );
        }

        return(
            <View>
                <View style = {styles.headdown}/>
                <FlatList
                    ref = {(flatList) => this._flatList = flatList}
                    initialNumToRender={10}
                    renderItem = {this._renderItem}  // 元素组件
                    data = {DataArr} // 需要渲染的数据，只支持数组
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
        return (
                <View style = { styles.innerViewStyle }>
                    <Text  style={styles.key}>{Item.item.name}：
                        <Text style={styles.value}>   {Item.item.value}
                        </Text>
                    </Text>
                </View>
        )

    }


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




    componentDidMount() {
        console.log(this.props.navigation.state.params.info)

    }




}
const styles = StyleSheet.create({
    headdown: {
        height: 10,

    },
    innerViewStyle: {
        backgroundColor: 'white',
        marginTop: 0,

    },
    wraaper: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,

    },
    header: {
        backgroundColor: '#E6E6FA',

    },
    value: {
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
        color:'#9e9e9e',
        marginLeft: 10,
    },
    key: {
        fontSize: 17,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        color: '#333333',
    }
});
