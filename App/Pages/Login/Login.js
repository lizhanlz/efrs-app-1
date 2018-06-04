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
            passWord: ''
        }

    }
    componentDidMount () {
             AsyncStorage.setItem('token','112');
             console.log(1);
    }
    onPress ()  {
        if (this.state.userName && this.state.passWord){
            //alert(this.state.userName);
            let logJson = {};
            logJson['userName'] = this.state.userName;
            logJson['passWord'] = this.state.passWord;
            //console.log(logJson)
           // this.props.navigation.navigate('Main')
            Fetch.fetchData('usermessage',logJson,(res)=>{
                if (res.code == '1'){
                   // this.props.navigation.navigate('Login')
                }
            })
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Cell proportion={4} alignment='center' cellStyles={{ backgroundColor: 'white',height:140 }} cellPadding='XL'>
                    <Image style={styles.userImg} source={require('../../res/images/1.png')} />
                </Cell>
                <Cell proportion={10} alignment='center' cellStyles={styles.textInputView} cellPadding='XL'>
                    <TextInput style={styles.textInput}
                               placeholder = "请输入用户名"
                               underlineColorAndroid = 'transparent'
                               onChangeText ={(text) => {this.setState({userName:text})}}
                    />
                </Cell>
                <Cell proportion={10} alignment='center' cellStyles={styles.textInputView} cellPadding='XL'>
                    <TextInput style={styles.textInput}
                               placeholder = "请输入密码"
                               underlineColorAndroid = 'transparent'
                               onChangeText ={(text) => {this.setState({passWord:text})}}
                    />
                </Cell>
                <Cell proportion={10} alignment='center' cellStyles={styles.textButtonView}>
                    <View style={styles.button}>
                    <Button
                            title={"登陆"}
                            onPress={()=>{this.onPress()}}
                            color="red"
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
        borderColor: '#ffffff',
    },
    textInputView: {
        borderWidth:1,
        borderRadius:5,
        borderColor: '#000000',
        backgroundColor: 'white',
        height:46
    },
    textButtonView: {
        borderRadius:5,
        backgroundColor: 'red',
        height:46,
        marginTop:30,
    },
    button: {
        width:'100%',
        //borderRadius:5,
       // backgroundColor: 'blue',

    },
});
