// 全部九宫格页面


import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';

export default class AllSudokuPage extends Component {
    static navigationOptions = ({ navigation }) => {
        const { state: {params}} = navigation
        return {
            title: '全部九宫格'
        }
    }

    render() {
        const { state: {params}} = this.props.navigation
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    全部九宫格
                </Text>
                <Button title={'Go to List'} onPress={() => this.props.navigation.navigate('Search')}/>
            </View>
        )
    }
}


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
});