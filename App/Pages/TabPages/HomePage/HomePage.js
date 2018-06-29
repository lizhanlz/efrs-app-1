// 首页页面


import React, { Component } from 'react';

import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    AsyncStorage,
    TouchableOpacity,
    TouchableHighlight,
    ImageBackground,
    Modal
} from 'react-native';
import { Slider } from 'IFTide';
import CommonSudoku from '../../../Common/CommonSudoku';
import { HomeSudokuData } from "../../../Res/Data/HomeSudoku";
var Dimensions = require('Dimensions');
var {width,height} = Dimensions.get('window');
export default class HomePage extends Component {
    constructor(props){
        super(props);
        thiz=this;
        this.state = {
            data:[],//存储列表数据
            type:[], //存储九宫格跳转类型
            splash:true,
        };
    }
    componentWillMount() {

    }
    componentDidMount () {
        //获取data数据
        this.setState({
            data:HomeSudokuData[0],
            type:HomeSudokuData[1],
        })
        AsyncStorage.setItem('token','');
        this.timer = setTimeout(() => {
            this.setState({
                splash:false,
            })
        },2000)

    }
    componentWillUnmount(){
        this.timer && clearTimeout(this.timer)
    }
    render() {

        let sliderdata = [
            { img: require('../../../Res/Images/轮播图1.png'), id: 1 },
            { img: require('../../../Res/Images/轮播图2.png'), id: 2 },
            { img: require('../../../Res/Images/轮播图3.png'), id: 3 },
            { img: require('../../../Res/Images/轮播图4.png'), id: 4 },
        ];
        return (
                <ScrollView>
                    <Modal visible={this.state.splash}
                                    onRequestClose = {() => {}}
                                    animationType = 'fade'
                                    transparent = {true}>
                    <Image source={require('../../../Res/Images/启动.png')} style={styles.splash}/>
                </Modal>

                    <View style={styles.body}>
                        <ImageBackground source={require('../../../Res/Images/bgpic.png')} style={styles.bgpic} resizeMode="contain">
                            <View style={styles.header}>

                                <Image source={require('../../../Res/Images/logo.png')} style={styles.logo}/>
                                <Image source={require('../../../Res/Images/line.png')} style={styles.line}/>
                                <Image source={require('../../../Res/Images/title.png')} style={styles.title}/>
                            </View>
                            <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('Search',{info:''})}>
                                <View style={styles.searchBox}>
                                    <Image source={require('../../../Res/Images/search.png')} style={styles.searchIcon}/>
                                    <Text style={styles.textInput}>请输入企业名称</Text>

                                    <Image source={require('../../../Res/Images/mic.png')} style={styles.voiceIcon}/>
                                </View>
                            </TouchableOpacity>
                        </ImageBackground>

                        <View style={styles.carousel}>
                            <Slider
                                data={sliderdata}
                                duration={3000}
                                loop={true}
                                autoPlay={true}
                                style={styles.slider}
                                pagination={true}
                                itemHeight={246*width/750}
                                activeOpacity={1}
                            />
                        </View>
                        <View style={styles.sodoku}>
                            <CommonSudoku
                                ref={'Sudoku'}
                                data={this.state.data}
                                type={this.state.type}
                                onPressFn={this._onPressFn.bind(this)}
                                onPressFnMore={this._onPressFnMore.bind(this)}
                                headerName={null}
                                height={(height-110*width/750-399*width/750-21-246*width/750-20)/3}
                            />
                        </View>
                    </View>
                </ScrollView>
        );
    }
    //跳转到搜索页
    _onPressFn () {
        this.props.navigation.navigate('Search',{info:this.refs.Sudoku.state.name})
    };
    itemClick (){

    };
    //跳转到全部九宫格
    _onPressFnMore= ()=>this.props.navigation.navigate('AllSudoku');
}


const styles = StyleSheet.create({
    body:{
        flex:1,
    },
    bgpic:{

        flexDirection:"column",
        justifyContent:'center',
        alignItems:'center',

        width:width,
        height:399*width/750,
    },
    header:{
        flexDirection:"row",
        justifyContent:'center',
        alignItems:'center',

    },
    logo:{
        width:255*width/750,
        height:56*width/750,

    },
    line:{
        width:1,
        height:52*width/750,
        marginLeft:10,
    },
    title:{
        width:262*width/750,
        height:73*width/750,
        marginLeft:10,
    },
    searchBox:{
        width:625*width/750,
        height:85*width/750,
        padding:0,
        marginTop:20,
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        borderRadius:5,
    },
    searchIcon:{
        height:20,
        width:20,
        marginLeft:20,


    },
    textInput:{
        flex:1,
        backgroundColor:'transparent',
        fontSize:13,
        marginLeft:20,
        color:'#333333',
        opacity:0.4,
    },
    voiceIcon:{
        height:20,
        width:20,
        marginLeft:5,
        marginRight:20,

    },
    carousel:{

        marginTop:5,

    },
    sodoku:{
        marginTop:5,
        backgroundColor:'white',
        width:width,
        // height:650*width/750,
        borderBottomWidth:1,
        borderBottomColor:'#dfdfdf',
    },
    slider:{
        backgroundColor:'white',

    },
    splash:{
        height:height,
        width:width,
    }
});