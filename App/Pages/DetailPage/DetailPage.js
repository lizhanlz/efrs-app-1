// 详情页面


import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Button,
    BackHandler,
} from 'react-native';

export default class DetailPage extends Component {
    static navigationOptions = ({ navigation }) => {
        const { state: {params}} = navigation
        return {
            title: '详情'
        }
        thiz = this
    }

    render() {
        const { state: {params}} = this.props.navigation
        return (
            <View style={styles.container}>
                <Button title={'Go Back'} onPress={() => this.props.navigation.pop(2)}/>

                <Text style={styles.welcome}>
                    登录
                </Text>
                <Button title={'Go to Main'} onPress={() => this.props.navigation.navigate('Main')}/>
            </View>
        )
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
    }
    // todo
    onBackAndroid = () => {
        this.props.navigation.pop(2)
        return true  // 屏蔽物理键默认行为
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
