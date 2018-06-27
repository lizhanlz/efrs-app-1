// 关注页面


import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class AttentionPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    敬请期待
                </Text>
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