// 我的页面

import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    Button,
    TouchableHighlight,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';
import { Cell } from 'IFTide';
import Fetch from '../../Fetch/DataFactories';
export default class MinePage extends Component {
    constructor (props) {
        super(props)
        this.state = {
            userName: '',
            passWord: '',
            backText:"密码错误！"
        }

    }
    componentDidMount () {
             // AsyncStorage.setItem('token','112');
            // console.log(1);
    }
    onPress ()  {
        if (this.state.userName && this.state.passWord){
            //alert(this.state.userName);
            let logJson = {};
            logJson['userName'] = this.state.userName;
            logJson['passWord'] = this.state.passWord;
            //console.log(logJson)
           // this.props.navigation.navigate('Main')
            Fetch.fetchData('Login',logJson,(res)=>{
                if (res.code === '1'){
                    AsyncStorage.setItem('token','112');
                    this.setState({backText:'用户名错误！'})
                   // this.props.navigation.navigate('Login')
                }
            })
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Cell proportion={4} alignment='center' cellStyles={{ backgroundColor: 'white',height:140 }} cellPadding='XL'>
                    <Image style={styles.userImg} source={require('../../Res/Images/mainlogo.png')} />
                </Cell>
                <Cell proportion={10} alignment='center' cellStyles={styles.textInputView} cellPadding='XL'>
                    <TextInput style={styles.textInput}
                               placeholder = "请输入用户名"
                               placeholderTextColor = "#bbbbbb"
                               underlineColorAndroid = 'transparent'
                               onChangeText ={(text) => {this.setState({userName:text})}}
                    />
                </Cell>
                <Cell proportion={10} alignment='center' cellStyles={styles.textInputView} cellPadding='XL'>
                    <TextInput style={styles.textInput}
                               placeholder = "请输入密码"
                               placeholderTextColor = "#bbbbbb"
                               underlineColorAndroid = 'transparent'
                               onChangeText ={(text) => {this.setState({passWord:text})}}
                    />
                </Cell>
                <Cell proportion={10} alignment='center' cellStyles={styles.backTextWrapper}>
                    <Text style={styles.backText}>
                        {this.state.backText}
                    </Text>
                </Cell>
                <Cell proportion={10} alignment='center' cellStyles={styles.textButtonView}>
                    <View style={styles.button}>
                    <Button
                            title={"登录"}
                            onPress={()=>{this.onPress()}}
                            color="#E63C27"
                            fontSize="18"
                    />
                    </View>
                </Cell>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
    },
    textInput: {
        width:'90%',
        backgroundColor: 'white',
    },
    textInputView: {
        borderWidth:1,
        borderRadius:5,
        borderColor: '#dfdfdf',
        backgroundColor: 'white',
        height:56
    },
    textButtonView: {
        borderRadius:5,
        backgroundColor: '#E63C27',
        height:56,
        marginTop:20,
    },
    backTextWrapper: {
        backgroundColor: 'white',
        alignItems: 'flex-start',
        height:14,
        paddingLeft:12,
    },
    backText: {
        fontSize:12,
        color:'#E63C27',
        //borderRadius:5,
        // backgroundColor: 'blue',
    },
    button: {
        width:'100%',
        //borderRadius:5,
       // backgroundColor: 'blue',
    },
});
