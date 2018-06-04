// 导航栏路由入口

import React from 'react';
import { TabNavigator } from 'react-navigation';

import {
    StyleSheet,
    Image, AsyncStorage,
} from 'react-native';

import HomePage from '../Pages/TabPages/HomePage/HomePage';
import RiskPage from '../Pages/TabPages/RiskPage/RiskPage';
import InformationPage from '../Pages/TabPages/InformationPage/InformationPage';
import AttentionPage from '../Pages/TabPages/AttentionPage/AttentionPage';
import MinePage from '../Pages/TabPages/MinePage/MinePage';
//获取本地存储中的token
let token;
let getToken = () =>{
    AsyncStorage.getItem('token').then((value)=>{
        token = value;
        console.log(value)
    });
}
const Tab = TabNavigator({
    // 首页
    Home: {
        screen: HomePage,
        navigationOptions: {
            title: '首页',
            tabBarLabel: '首页',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source = {
                        require('../Res/Images/test.png')
                    }
                    style={[ styles.icon, { tintColor: tintColor }]} // { tintColor: tintColor } 选中的图片和文字颜色
                />
            ),
            headerTitleStyle: {
                alignSelf: 'center'
            },
        }
    },
    // 风险页
    Risk: {
        screen: RiskPage,
        navigationOptions: {
            title: '风险',
            tabBarLabel: '风险',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source = {
                        require('../Res/Images/test.png')
                    }
                    style={[ styles.icon, { tintColor: tintColor }]} // { tintColor: tintColor } 选中的图片和文字颜色
                />
            ),
            headerTitleStyle: {
                alignSelf: 'center'
            },
        }
    },
    // 情报页
    Information: {
        screen: InformationPage,
        navigationOptions: {
            title: '情报',
            tabBarLabel: '情报',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source = {
                        require('../Res/Images/test.png')
                    }
                    style={[ styles.icon, { tintColor: tintColor }]} // { tintColor: tintColor } 选中的图片和文字颜色
                />
            ),
            headerTitleStyle: {
                alignSelf: 'center'
            },
        }
    },
    // 关注页
    Attention: {
        screen: AttentionPage,
        navigationOptions: {
            title: '关注',
            tabBarLabel: '关注',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source = {
                        require('../Res/Images/test.png')
                    }
                    style={[ styles.icon, { tintColor: tintColor }]} // { tintColor: tintColor } 选中的图片和文字颜色
                />
            ),
            headerTitleStyle: {
                alignSelf: 'center'
            },
        }
    },
    // 我的页
    Mine: {
        screen: MinePage,
        navigationOptions: {
            title: '我的',
            tabBarLabel: '我的',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source = {
                        require('../Res/Images/test.png')
                    }
                    style={[ styles.icon, { tintColor: tintColor }]} // { tintColor: tintColor } 选中的图片和文字颜色
                />
            ),
            headerTitleStyle: {
                alignSelf: 'center'
            },
            tabBarOnPress:(obj) => {
                AsyncStorage.getItem('token').then((value)=>{

                    if (value){
                        obj.jumpToIndex(obj.scene.index);
                    }else{
                        this.props.navigation.navigate('Login');
                    }
                });
                // console.log(obj.scene.index);
                // console.log(obj.scene.route);
            }
        }
    },

}, {
    animationEnabled: true, // 切换页面时不显示动画
    tabBarPosition: 'bottom', // 导航栏显示在底端，android 默认显示在页面顶端
    swipeEnable: true, // 禁止左右滑动
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab，none 为不跳转
    tabBarOptions: {
        activeTintColor: '#0F9C00', // 文字和图片选中颜色
        inactiveTintColor: '#999', // 文字和图片默认颜色
        showIcon: true, // android 默认不显示 icon，需要设置为 true 才显示
        indicatorStyle: {height: 0}, // android 中 TabBar 下面会显示一条线，高度设为 0 后就不显示线了，不知道还有没有其他隐藏方法
        style: {
            backgroundColor: '#444', // TabBar 背景色
            height: 50,
        },
        labelStyle: {
            fontSize: 12, // 文字大小
            marginTop:0, //
        },
    },
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    icon: {
        width: 20,
        height: 20,
    },

});


export default Tab