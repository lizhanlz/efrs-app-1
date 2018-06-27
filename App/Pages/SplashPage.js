import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Animated,
    Easing,
} from 'react-native';
// 获取屏幕高宽度
const Dimensions = require("Dimensions");
const { height, width } = Dimensions.get('window');

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
            this.props.navigation.navigate('Home')
        }, 2000)
    }
    render() {
        return (
            <View style = {styles.container}>
                <Image source = {require('../Res/Images/启动.png')} style = {styles.image} resizeMode = {'stretch'}/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    image: {
        height:height,
        width:width
    },
})
