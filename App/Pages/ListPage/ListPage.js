// 列表页面


import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';

export default class ListPage extends Component {
    constructor (props, context) {
        super(props, context)
        this.state = {
            checking: true
        }
    }
    static navigationOptions = ({ navigation }) => {
        const { state: {params}} = navigation
        return {
            title: '列表'
        }
    }

    render() {
        const { state: {params}} = this.props.navigation
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    列表
                </Text>
                <Button title={'Go to Detail'} onPress={() => this.props.navigation.navigate('Detail')}/>
            </View>
        )
    }
    // componentWillMount() {
    //     this.checkLogin()
    // }
    checkLogin() {
        this.props.navigation.addListener(
            'willFocus',
            () => {
                console.log(this.state.checking)
                if (this.state.checking) {
                    this.setState({
                        checking: false
                     })

                    this.props.navigation.navigate('Detail')
                }
            }

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
