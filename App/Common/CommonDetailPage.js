import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    SectionList,
} from 'react-native';

import DetailSectionHeader from './DetailSectionHeader'

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
    }


    constructor(props){
        super(props);
        this.state = {
            // sectionList 数据
            cellDataArray: []
        }



    }
    componentWillMount() {
        //json数据循环生成列表
        if (this.props.navigation.state.params.type !== '0') {
            let data = this.props.navigation.state.params.info.value;
            let SectionDataArr = []
            for(let i in data){

                let DataArr = [];
                let EmptyArr = [];
                for(let n in data[i]){

                    DataArr.push(
                        {
                            name: n,
                            value: data[i][n],
                        }
                    );
                };

                SectionDataArr.push(
                    {
                        key: i,
                        data: DataArr,
                        show: true,
                    }
                );
                DataArr = EmptyArr
            }
            this.trueCellDataArray = SectionDataArr;
            let newArray = JSON.parse(JSON.stringify(SectionDataArr))
            console.log(newArray)
            this.setState({
                cellDataArray: newArray,
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
                    />
                </View>

            )
        } else {


            return(
                <View>
                    <View style = {styles.headdown}/>
                    <SectionList
                        sections={this.state.cellDataArray}  //需要渲染的数据
                        renderSectionHeader={this._renderSectionHeader} // section的头部组件
                        renderItem={this._renderSectionItem}  // section的元素组件
                        keyExtractor = {this._extraUniqueKey}  //给每个item生成一个key
                        SectionSeparatorComponent = {this._SectionSeparatorComponent} // section之间的间隔函数
                        ItemSeparatorComponent = {this._ItemSeparatorComponent} // item之间的间隔函数
                    />
                </View>
            )

        }
    };
    componentDidMount() {
        // let newArray = JSON.parse(JSON.stringify(this.trueCellDataArray))
        // this.setState({
        //     cellDataArray: newArray,
        // });

    };
    _renderItem = (Item) => {
        return (
            <View style = { styles.innerViewStyle }>
                <Text  style={styles.key}>{Item.item.name}：
                    <Text style={styles.value}>   {Item.item.value}
                    </Text>
                </Text>
            </View>
        )

    };



    _renderSectionItem = (info) => {
        const Item = info.item;
        // 如果
        if (Item.value === undefined) {
            return(
                <View>
                </View>
            )
        } else {
            return (
                <View style = { styles.sectionInnerViewStyle }>
                    <Text  style={styles.sectionKey}>{Item.name}：
                        <Text style={styles.sectionValue}>   {Item.value}
                        </Text>
                    </Text>
                </View>
            )
        }

    };

    handlerSectionHeader = (info) => {

        if (info.section.show) {
            this.state.cellDataArray.map((item, index) => {
                if (item === info.section) {
                    item.show = !item.show;
                    item.data = [{ key:'close' }];
                }
            });
        } else {
            this.trueCellDataArray.map((item, index) => {
                if (item.key === info.section.key) {
                    let data = item.data;

                    this.state.cellDataArray.map((cellItem, i) => {
                        if (cellItem === info.section) {
                            cellItem.show = !cellItem.show;
                            cellItem.data = data;
                        }
                    })
                }
            })
        }
        let newDatas = JSON.parse(JSON.stringify(this.state.cellDataArray));
        this.setState({
            cellDataArray: newDatas
        })
    };
    _ItemSeparatorComponent = () => {
        return (
            <View style = {styles.itemSeparator}>
            </View>
        )
    };

    _SectionSeparatorComponent = (info) => {
        let time = new Date().getTime()
        console.log(time)
        console.log('separator', info)
        if (info.trailingItem === undefined) {
            return (
                <View style = {styles.sectionSeparator}>
                    {/*<Text style = { styles.txt }>粗{time}</Text>*/}
                </View>
            )

        } else {
            if (info.leadingItem === undefined) {
                return (
                    <View style={styles.sectionItemSeparator}>
                        {/*<Text style={styles.txt}>细{time}</Text>*/}
                    </View>
                )
            } else {
                return (
                    <View style={styles.sectionOtherItemSeparator}>
                        {/*<Text style={styles.txt}>中粗{time}</Text>*/}
                    </View>
                )
            }
        }
    };

    _renderSectionHeader = (info) => {
        //const txt = info.section.key;
        return  <DetailSectionHeader
                    info = { info }
                    handlerSectionHeader = {this.handlerSectionHeader.bind(this)}
                />
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
    headdown: {
        height: 15,

    },
    wraaper: {
        flex: 1,
        flexDirection: 'row',
        // marginTop: 20,

    },
    header: {
        backgroundColor: '#E6E6FA',

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
    sectionInnerViewStyle: {
        backgroundColor: 'white',
        paddingTop:12,
        paddingBottom:12,
        borderLeftWidth: 15,
        borderRightWidth: 15,
        borderColor: '#FFFFFF',
    },
    SectionHeader: {
        height: 50,
        backgroundColor: '#9CEBBC',
        color: 'white',
        fontSize: 18,
    },
    sectionValue: {
        fontSize: 13,
        color:'#9e9e9e',
        marginLeft: 20,
    },
    sectionKey: {
        fontSize: 15,
        marginLeft: 20,
        color: '#333333',
    },
    sectionSeparator: {
        height: 15,
    },
    sectionItemSeparator: {
        height: 2,
    },
    sectionOtherItemSeparator: {
        height: 13,
    },
});
