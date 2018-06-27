// 路由入口


import React from 'react';
import {
    Image
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import NavigationService from '../Utils/NavigationService';
import Tab from './Tab';
import SearchPage from '../Pages/SearchPage/SearchPage';
import SearchResult from '../Pages/SearchPage/SearchResult';
import CompanyPage from '../Pages/CompanyPage/CompanyPage';
import CommonListPage from '../Common/CommonListPage';
import CommonDetailPage from '../Common/CommonDetailPage';
import AllSudokuPage from '../Pages/AllSudokuPage/AllSudokuPage'
import LoginPage from '../Pages/Login/Login';
import SplashPage from '../Pages/SplashPage';

// 定义一个 StackNavigator
const RootStack = createStackNavigator(
    {
        Splash: {
            screen: SplashPage,
            navigationOptions: {
                header: null,
            }

        },
        Main: {
            screen: Tab,    // 默认启动页后会进入第一个路由视图中
            navigationOptions: {
                header: null,
            }
        },
        Search: {
            screen: SearchPage,
            navigationOptions: {
                header: null,
            }
        },
        Company: CompanyPage,
        List: CommonListPage,
        Detail: CommonDetailPage,
        AllSudoku: AllSudokuPage,
        SearchList: {
             screen: SearchResult,
             navigationOptions: {
             header: null,
             }
        },
        Login:{
            screen: LoginPage,
            navigationOptions: {
                headerBackImage:<Image style={{width:20,height:20,marginLeft:20}} source={require('../Res/Images/back.png')} />,
                // headerBackTitleStyle:{color:"red"},
                //headerStyle:{color:"red"}
            }
        }

    }, {
        initialRouteName: 'Splash',
        mode: 'card',
    }
);

export default class Routers extends React.Component {
    render() {
        return <RootStack ref={navigatorRef=>{
            NavigationService.setTopLevelNavigator(navigatorRef);
        }} />
    }
}
