// 公司信息页面


import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Alert

} from 'react-native';
import CommonSudoku from '../../Common/CommonSudoku';
import {MessageBox} from 'IFTide';
import Fetch from "../../Fetch/DataFactories";


import { RiskSudokuData } from "../../Res/Data/RiskSudoku";
import { InformationSudokuData } from "../../Res/Data/InformationSudoku";

let pageNo = "0";


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
    };

    constructor(props){
        super(props);
        this.state = {
            RiskData:[],//存储列表数据
            RiskType:[], //存储九宫格跳转类型
            InformationData:[],//存储列表数据
            InformationType:[], //存储九宫格跳转类型
            ErrorMsg: '',
        };
    }
    componentWillMount() {

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
        let data = this.props.navigation.state.params.company
        console.log(data)
        return (
            <View>
                <MessageBox
                    ref={(obj) =>{this.alertType1 = obj}}
                    alertType = {1}
                    title={'提示'}
                    detailText={this.state.ErrorMsg}
                    onClose={() => {}}
                />
                <ScrollView style={styles.container}>
                    <View style={styles.seachResultList}>
                        <View style={styles.seachResultListTitle}>
                            <Text style={styles.seachResultListTitleText}>
                                {data.ENTNAME}
                            </Text>
                            <View style={styles.seachResultListTitleRight}>
                                <Text style={styles.seachResultListTitleRightText}>
                                    {data.ENTSTATUS}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.seachResultListMessage}>
                            <View style={styles.seachResultListMessageLeftInner}>
                                <Text style={styles.seachResultListCodeText}>
                                    法定代表人
                                </Text>
                                <Text style={styles.seachResultListNameText}>
                                    {data.NAME.length>6?data.NAME.slice(0,6) + '...':data.NAME}
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
                                        {data.REGCAP}
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
                                    {data.ESDATE}
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
            </View>
        )
    }
    //跳转到列表页
    _onPressFn1 () {
        let thiz = this;
        let companyName = this.props.navigation.state.params.company.ENTNAME
        let pressRiskName = this.refs.RiskSudoku.state.name;
        //具体请求的参数在文档里面写出，根据模块不同，配置的参数也不同。
        Fetch.fetchData('jsonpost', {"serviceKey":pressRiskName,
            "bankId":"8B94459B9F1D4ECD",
            "userId":"001100807",
            "key":companyName,
            "page":pageNo,
            "size":"10"}, function(res) {
            let code = res.code;
            let Msg = res.msg;
            let Data = res.data;
            let ListType = res.listtype;
            let totalpage = res.totalpage;
            if(code !== "200" && code !== "0000")
            {
                thiz.handlerError(code,Msg);
                thiz.alertType1._show()
            } else {
                thiz.props.navigation.navigate('List', {info: pressRiskName, data: Data, listtype: ListType, totalpage: totalpage, key:companyName})
            }
            console.log('data', res)

        })

    };
    _onPressFn2 () {
        let thiz = this;
        let companyName = this.props.navigation.state.params.company.ENTNAME;
        let companyID = this.props.navigation.state.params.company.ID;
        let pressInformationName = this.refs.InformationSudoku.state.name;
        //具体请求的参数在文档里面写出，根据模块不同，配置的参数也不同。
        if (pressInformationName === '股东信息' || pressInformationName === '法人对外投资' || pressInformationName === '对外任职') {
            console.log('1')
            Fetch.fetchData('jsonpost', {"serviceKey":pressInformationName,
                "bankId":"8B94459B9F1D4ECD",
                "userId":"001100807",
                "key":companyID,
                "page":pageNo,
                "size":"10"}, function(res) {
                let code = res.code;
                let Msg = res.msg;
                let Data = res.data;
                let ListType = res.listtype;
                let totalpage = res.totalpage;
                if(code !== "200" && code !== "0000")
                {
                    thiz.handlerError(code,Msg);
                    thiz.alertType1._show()
                } else {
                    thiz.props.navigation.navigate('List', {info: pressInformationName, data: Data, listtype: ListType, totalpage: totalpage, key:companyID})
                }
                console.log('data', Data)
            });

        } else {
            console.log('2')
            Fetch.fetchData('jsonpost', {"serviceKey":pressInformationName,
                "bankId":"8B94459B9F1D4ECD",
                "userId":"001100807",
                "key":companyName,
                "page":pageNo,
                "size":"10"}, function(res) {
                let code = res.code;
                let Msg = res.msg;
                let Data = res.data;
                let ListType = res.listtype;
                let totalpage = res.totalpage;
                if(code !== "200" && code !== "0000")
                {
                    thiz.handlerError(code,Msg);
                    thiz.alertType1._show()
                } else {
                    thiz.props.navigation.navigate('List', {info: pressInformationName, data: Data, listtype: ListType, totalpage: totalpage, key:companyName})
                }
                console.log('data', Data)
            });

        }
        console.log('name',this.refs.InformationSudoku.state.name)
    };

    //错误页面显示信息判断
    handlerError=(code,Msg)=>{
        if(code==="400"|| code==="404"||code==="444"||code==="445"|| code==="703")
        {
            msg="没有查到满足条件的信息";
        }else if(code==="1314"|| code==="1315"||code==="1316"||code==="1319"||"0001")
        {
            msg=Msg;
        }else {
            msg="查询过程中出现异常";
        }

        this.setState({
            ErrorMsg:msg,
        });
    }




}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
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
        paddingBottom:20,
        marginBottom:10,
        backgroundColor: 'white',
    },
    seachResultListTitleRight:{
        borderWidth:1,
        borderColor:'#67c94d',
        paddingRight:4,
        paddingLeft:8,
        alignItems: 'center',
        paddingBottom:1,
        paddingTop:1,
        marginRight:10,
        borderRadius:4,
    },
    seachResultListTitleRightText:{
        color:'#67c94d'
    },
    seachResultListTitle:{
        paddingLeft:20,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    seachResultListTitleText:{
        flex:1,
        fontSize: 20,
        color:'#333333',
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
        alignItems: 'center',
    },
    seachResultListMessageLeftInner:{
        flex:1,
        alignItems: 'center',
    },
    seachResultListNameText:{
        fontSize: 16,
        color:'#1abef9',
    },
    seachListRule:{
        fontSize: 14,
    },
    seachResultListMessageInnerBottom:{
        flex:1,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    seachResultListMessageCenterText:{
        paddingLeft:10,
        paddingRight:10,
        alignItems: 'center',
    },
    seachResultListMessageRightInner:{
        flex:1,
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