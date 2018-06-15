// 公司信息页面


import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,

} from 'react-native';
import CommonSudoku from '../../Common/CommonSudoku';

import Fetch from "../../Fetch/DataFactories";


import { RiskSudokuData } from "../../Res/Data/RiskSudoku";
import { InformationSudokuData } from "../../Res/Data/InformationSudoku";


export default class CompanyPagePage extends Component {
    static navigationOptions = ({ navigation }) => {
        const { state: {params}} = navigation
        return {
            title: '企业详情',
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
        thiz=this;
        this.state = {
            RiskData:[],//存储列表数据
            RiskType:[], //存储九宫格跳转类型
            InformationData:[],//存储列表数据
            InformationType:[], //存储九宫格跳转类型
            data: [],
        };
    }
    componentWillMount() {
        this.getCompanyListData()

        //获取data数据
        this.setState({
            RiskData:RiskSudokuData[0],
            RiskType:RiskSudokuData[1],
            InformationData:InformationSudokuData[0],
            InformationType:InformationSudokuData[1],
        })
    }

    render() {
        const { state: {params}} = this.props.navigation
        let data = this.state.data
        return (
                <ScrollView style={styles.container}>
                    <View style={styles.seachResultList}>
                        <View style={styles.seachResultListTitle}>
                            <Text style={styles.seachResultListTitleText}>
                                {data.cname}
                            </Text>
                            <View style={styles.seachResultListTitleRight}>
                                <Text style={styles.seachResultListTitleRightText}>
                                    {data.status}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.seachResultListMessage}>
                            <View style={styles.seachResultListMessageLeftInner}>
                                <Text style={styles.seachResultListCodeText}>
                                    法定代表人
                                </Text>
                                <Text style={styles.seachResultListNameText}>
                                    {data.NAME}
                                </Text>
                            </View>
                            <View style={styles.seachResultListMessageInnerBottom}>
                                <View>
                                    <Text style={styles.seachResultListSpaceText}>
                                        |
                                    </Text>
                                </View>
                                <View style={styles.seachResultListMessageCenterText}>
                                    <Text style={styles.seachResultListCodeText}>
                                        注册资本
                                    </Text>
                                    <Text style={styles.seachResultListMoneyText}>
                                        {data.money}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.seachResultListSpaceText}>
                                        |
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.seachResultListMessageRightInner}>
                                <Text style={styles.seachResultListCodeText}>
                                    注册时间
                                </Text>
                                <Text style={styles.seachResultListTimeText}>
                                    {data.time}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.sodoku}>
                        <CommonSudoku
                            ref={'RiskSudoku'}
                            data={this.state.RiskData}
                            type={this.state.RiskType}
                            onPressFn={this._onPressFn1.bind(this)}
                            headerName={'风险信息'}
                        />
                    </View>
                    <View style={styles.sodoku}>
                        <CommonSudoku
                            ref={'InformationSudoku'}
                            data={this.state.InformationData}
                            type={this.state.InformationType}
                            onPressFn={this._onPressFn2.bind(this)}
                            headerName={'情报信息'}

                        />
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.txt}>族谱</Text>
                        <View style={styles.Line}>
                        </View>
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.txt}>报告</Text>
                        <View style={styles.Line}>
                        </View>
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.txt}>国际</Text>
                        <View style={styles.Line}>
                        </View>
                    </View>

                </ScrollView>
        )
    }
    //跳转到搜索页
    _onPressFn1 () {
        this.props.navigation.navigate('List', {info:this.refs.RiskSudoku.state.name})
        console.log(this.refs.RiskSudoku.state.name)
    };
    _onPressFn2 () {
        this.props.navigation.navigate('List', {info:this.refs.InformationSudoku.state.name})
        console.log(this.refs.InformationSudoku.state.name)
    };

    getCompanyListData = () => {
        Fetch.fetchData('searchDataRe',{},(res)=>{
            this.setState({data:res.data.companyMessage[0]});
        });
    }


}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    sodoku:{
        marginTop:10,
        marginBottom:1,
        backgroundColor:'white',
    },
    seachResult:{
        flex: 1,
        width:'100%',
        // backgroundColor: 'yellow',
        borderTopWidth:1,
        borderTopColor:'#F0F0F0',
    },
    seachResultHidden:{
        display:'none'
    },
    seachResultCount:{
        width:'100%',
        height:60,
        backgroundColor: '#f0f0f0',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft:20,
        paddingRight:20,
    },
    seachResultCountText:{
        fontSize: 16,
        color:'#333333',
    },
    seachResultCountTextColor:{
        color:'#E63C27',
    },
    seachResultCountPage:{
        fontSize: 16,
    },
    seachResultListWrapper:{
        width:'100%',
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    seachResultList:{
        paddingTop:20,
        paddingLeft:40,
        paddingRight:40,
        paddingBottom:20,
        marginBottom:10,
        backgroundColor: 'white',
    },
    seachResultListTitleRight:{
        borderWidth:1,
        borderColor:'#67c94d',
        paddingRight:6,
        paddingLeft:10,
        paddingBottom:1,
        paddingTop:1,
        borderRadius:4,
    },
    seachResultListTitleRightText:{
        color:'#67c94d'
    },
    seachResultListTitle:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    seachResultListTitleText:{
        fontSize: 20,
        color:'#333333',
    },
    seachResultListCode:{
        paddingTop:10,
    },
    seachResultListCodeText:{
        fontSize: 16,
        color:'#9e9e9e',
    },
    seachResultListMoneyText:{
        fontSize: 16,
        color:'#333333',
    },
    seachResultListTimeText:{
        fontSize: 16,
        color:'#333333',
    },
    seachResultListMessage:{
        paddingTop:10,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    seachResultListMessageLeftInner:{
        paddingRight:10,
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    seachResultListNameText:{
        fontSize: 16,
        color:'#1abef9',
    },
    seachResultListMessageInnerBottom:{
        flexDirection:'row',
        alignItems: 'center',
        // backgroundColor: 'blue',
    },
    seachResultListMessageCenterText:{
        paddingLeft:10,
        paddingRight:10,
        alignItems: 'center',
    },
    seachResultListMessageRightInner:{
        paddingLeft:10,
        alignItems: 'center',
    },
    seachResultListSpaceText:{
        fontSize: 20,
        color:'#dfdfdf'
    },
    header:{
        marginTop:10,
        marginBottom:10,

    },
    txt:{
        color: '#2F4F4F',
        fontSize: 20,
        backgroundColor: '#ffffff',
        height: 30,
        marginLeft: 10,

    },
    Line: {
        height: 2,
        backgroundColor: '#b2b7ee',
    },


});