// 情报页面


import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,

} from 'react-native';
import CommonSudoku from '../../../Common/CommonSudoku';

import { InformationSudokuData } from "../../../Res/Data/InformationSudoku";


export default class AllSudokuPage extends Component {
    constructor(props){
        super(props);
        thiz=this;
        this.state = {
            InformationData:[],//存储列表数据
            InformationType:[], //存储九宫格跳转类型
        };
    }
    componentWillMount() {
        //获取data数据
        this.setState({
            InformationData:InformationSudokuData[0],
            InformationType:InformationSudokuData[1],
        })
    }

    render() {
        const { state: {params}} = this.props.navigation
        return (
            <ScrollView style={styles.container}>
                <View style={styles.sudoku}>
                    <CommonSudoku
                        ref={'InformationSudoku'}
                        data={this.state.InformationData}
                        type={this.state.InformationType}
                        onPressFn={this._onPressFn.bind(this)}
                        headerName={'情报信息'}

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