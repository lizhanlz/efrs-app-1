// 搜索页面


import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';

export default class SearchPage extends Component {
    constructor (props, context) {
        super(props, context)
    }

    render() {
        const { state: {params}} = this.props.navigation
        return (
            <View style={styles.container}>
                <Button title={'Go Back'} onPress={() => this.props.navigation.goBack()}/>
                <Text style={styles.welcome}>
                    搜索
                </Text>
                <Button title={'Go to Company'} onPress={() => this.props.navigation.navigate('Company')}/>
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
