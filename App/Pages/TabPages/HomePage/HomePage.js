// 首页页面


import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';


export default class HomePage extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    首页
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
});