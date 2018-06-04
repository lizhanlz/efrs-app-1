// 公司信息页面


import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';

export default class CompanyPagePage extends Component {
    static navigationOptions = ({ navigation }) => {
        const { state: {params}} = navigation
        return {
            title: '企业详情'
        }
    }

    render() {
        const { state: {params}} = this.props.navigation
        return (
            <View style={styles.container}>
                <Button title={'Go Back'} onPress={() => this.props.navigation.goBack()}/>
                <Text style={styles.welcome}>
                    企业详情
                </Text>
                <Button title={'Go to List'} onPress={() => this.props.navigation.navigate('List')}/>
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