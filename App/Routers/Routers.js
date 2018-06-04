// 路由入口


import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Tab from './Tab';
import SearchPage from '../Pages/SearchPage/SearchPage';
import CompanyPage from '../Pages/CompanyPage/CompanyPage';
import CommonListPage from '../Common/CommonListPage';
import CommonDetailPage from '../Common/CommonDetailPage';

// 定义一个 StackNavigator
const RootStack = createStackNavigator(
    {
        Main: {
            screen: Tab,    // 默认会进入第一个路由视图中
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
    }, {
        initialRouteName: 'Main',
        mode: 'card',
    }
);

export default class Routers extends React.Component {
    render() {
        return <RootStack />
    }
}
