// 风险页面


import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,

} from 'react-native';
import CommonSudoku from '../../../Common/CommonSudoku';

import { RiskSudokuData } from "../../../Res/Data/RiskSudoku";


export default class AllSudokuPage extends Component {
    constructor(props){
        super(props);
        thiz=this;
        this.state = {
            RiskData:[],//存储列表数据
            RiskType:[], //存储九宫格跳转类型
        };
    }
    componentWillMount() {
        //获取data数据
        this.setState({
            RiskData:RiskSudokuData[0],
            RiskType:RiskSudokuData[1],
        })
    }

    render() {
        const { state: {params}} = this.props.navigation
        return (
            <ScrollView style={styles.container}>
                <View style={styles.sudoku}>
                    <CommonSudoku
                        ref={'RiskSudoku'}
                        data={this.state.RiskData}
                        type={this.state.RiskType}
                        onPressFn={this._onPressFn.bind(this)}
                        headerName={'风险信息'}
                    />
                </View>

            </ScrollView>
        )
    }
    //跳转到搜索页
    _onPressFn () {
        this.props.navigation.navigate('Search')
        console.log(this.refs.Sudoku.state.name)
    };

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
    },
    sudoku:{
        marginTop:10,
        marginBottom:1,
        backgroundColor:'white',
    },

});