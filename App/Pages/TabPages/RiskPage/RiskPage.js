// 风险页面


import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';

export default class RiskPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    风险
                </Text>
                <Button title={'Go to Search'} onPress={() => this.props.navigation.navigate('Search')}/>
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