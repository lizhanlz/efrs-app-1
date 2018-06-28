import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';

import CommonExpandableList from './CommonExpandableList'

export default class CommonDetailPage extends Component {


    static navigationOptions = ({ navigation }) => {
        return {
            title: '详情',
            headerTitleStyle: {
                textAlign: 'center',
                alignSelf: 'center',
                flex:1,
            },
            headerRight: (<View></View>)
        }
    };


    constructor(props){
        super(props);
        this.state = {
            // sectionList 数据
            cellDataArray: [],
        }



    }
    componentWillMount() {
        //json数据循环生成列表
        if (this.props.navigation.state.params.type !== '0') {
            let data = this.props.navigation.state.params.info.value;
            console.log('data',data)
            let m = 0;
            let SectionDataArr = []
            for(let i in data){
                console.log('1',data[i])
                let DataArr = [];
                let EmptyArr = [];
                for (let j = 0; j < data[i].length; j++) {

                    let DataListArr = [];
                    for(let n in data[i][j]){
                        DataListArr.push(
                            {
                                name: n,
                                value: data[i][j][n],
                            }
                        );
                    };

                    DataArr.push(DataListArr.map((item)=>{
                        let k = Math.random()

                        return (
                            <View  key={k} style = { styles.innerViewStyle }>
                                <Text  style={styles.key}>{item.name}：
                                    <Text style={styles.value}>{item.value}
                                    </Text>
                                </Text>
                            </View>
                    )}))
                }


                SectionDataArr.push(
                    {
                        groupHeaderData: i,
                        groupListData: DataArr,
                    }
                );
                console.log('SectionDataArr',SectionDataArr)
                DataArr = EmptyArr
            }
            this.setState({
                cellDataArray: SectionDataArr,
            });


        }



    };
    render(){
        const { state: {params}} = this.props.navigation;
        const type = this.props.navigation.state.params.type
        const FirstData = this.props.navigation.state.params.info;
        // 判断数据类型
        if(type === '0') {
            //json数据循环生成列表
            let ListDataArr = [];
            for(let i in FirstData){
                ListDataArr.push(
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
                        data = {ListDataArr} // 需要渲染的数据，只支持数组
                        extraData = {null}  // 额外的数据
                        columnWrapperStyle = {styles.wrapper} // 每一行的样式
                        ListHeaderComponent = {this._header} // 组件头部
                        refreshing = {false}  // 在等待加载时是否显示一个正在加载的符号
                        keyExtractor = {this._extraUniqueKey}  //给每个item生成一个key
                        ListFooterComponent={this._footer}//尾部
                    />
                </View>

            )
        } else {
            return(
                <CommonExpandableList
                    data={this.state.cellDataArray}
                    style={{}}
                    groupStyle={{}}
                    groupSpacing={10}
                    implementedBy={'FlatList'}
                    renderGroupHeader={this._renderGroupHeader}
                    renderGroupListItem={this._renderGroupListItem}
                />
            )

        }
    };

    _renderItem = (Item) => {
        console.log('item',Item)
        return (
            <View style = { styles.innerViewStyle }>
                <Text  style={styles.key}>{Item.item.name}：
                    <Text style={styles.value}>   {Item.item.value}
                    </Text>
                </Text>
            </View>
        )

    };


    _renderGroupListItem = ({item, groupId, rowId}) => {

        return (
            <View>
                <View>{item}</View>
                <View style={{height:3}}>
                </View>
            </View>
        )


    };



    _renderGroupHeader = ({item, groupId, status, toggleStatus}) => {
        console.log('title', item)
        return  (
                <View style={styles.GroupHeaderContainer}>
                    <TouchableOpacity
                        onPress={() => toggleStatus(false)}
                        style={styles.GroupHeaderSubView}
                    >
                        <Text style={styles.GroupHeaderTxt}>
                            {item}
                        </Text>
                        <Image
                            style={styles.GroupHeaderImage}
                            source={status ? require('../Res/Images/top_arrow.png') : require('../Res/Images/bottom_arrow.png')}
                        >
                        </Image>
                    </TouchableOpacity>
                </View>
        )
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


    _footer() {
        return  <View style = {styles.footer}>
                </View>
    }







}
const styles = StyleSheet.create({
    headdown: {
        height: 15,

    },
    wraaper: {
        flex: 1,
        flexDirection: 'row',
        // marginTop: 20,

    },
    header: {
        backgroundColor: '#FFFFFF',

    },
    footer: {
        height: 20,
    },
    innerViewStyle: {
        backgroundColor: 'white',
        marginTop: 0,
        borderLeftWidth: 15,
        borderRightWidth: 15,
        borderColor: '#FFFFFF',
    },

    value: {
        fontSize: 13,
        marginTop: 10,
        marginBottom: 10,
        color:'#9e9e9e',
        marginLeft: 10,
    },
    key: {
        fontSize: 15,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        color: '#333333',
    },
    GroupHeaderContainer: {
        height: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
    },
    GroupHeaderSubView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    GroupHeaderImage: {
        width: 16,
        height: 16,
        marginLeft: 25,
    },
    GroupHeaderTxt: {
        fontSize: 18,
        color: '#333333',
    }
});
