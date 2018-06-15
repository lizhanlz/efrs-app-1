import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Animated,
    Easing,
} from 'react-native';
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0)
        }
    }
    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue:1,
                duration: 3000,
                easing: Easing.bezier(0.15, 0.73, 0.37, 1.2)
            }
        ).start();
        setTimeout(() => {
            this.props.navigation.navigate('Main')
        }, 100)
    }
    render() {
        return (
            <View style = {styles.container}>
                <Text style = {styles.welcome}>欢迎界面</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
})
