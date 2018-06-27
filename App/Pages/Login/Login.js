// 我的页面
import React, { Component } from 'react';

import {
    NetInfo,
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
            backText:"",
            disable:false
        }
    }
    componentDidMount () {
            // AsyncStorage.setItem('token','112');
            // console.log(1);
        NetInfo.isConnected.addEventListener('connectionChange',this.getNetworkStatus())
    }
    getNetworkStatus(isConnected){
       // console.log(1);
        console.log(isConnected?'yes':'no');
    }
    onPress ()  {
        if (this.state.userName === ''){
            this.setState({backText:'用户名不能为空!'});
            return;
        } else if (this.state.passWord === '') {
            this.setState({backText:'密码不能为空!'});
            return;
        }else if (this.state.userName && this.state.passWord){

            //this.setState({disable:true});
            let logJson = {};
            logJson['userName'] = this.state.userName;
            logJson['passWord'] = this.state.passWord;
           // Fetch.fetchData('Login',logJson,(res)=>{
           //     if (res.code === '1'){
           //         this.setState({disable:false});
           //         AsyncStorage.setItem('token','112');
           //         this.setState({backText:'用户名错误！'})
           //         this.props.navigation.navigate('Mine');
           //     }
           // });
           fetch('http://84.232.237.87:8081/efrsapp/app/json/jsonpost.do',{
                method:'POST',
                headers:{
                    'content-type':'application/json;charset=UTF-8'
                },
                body:JSON.stringify({
                    "serviceKey":"裁判文书",
                    "bankId":"23FE904471DEB429",
                    "userId":"888899998",
                    "key":"中国工商银行股份有限公司",
                    "page":"1",
                    "size":"10"
                })
            })
                .then((response) =>{
                    console.log(response);
                   return response.json();
                })
                .then((responseJson) =>{
                   console.log(responseJson);
                    if (responseJson.code == 1){
                      //  NavigationService.navigator('Login')
                    }
                })
                .catch((error) => {
                    console.log(error.onerror);
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
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>{this.onPress()}}
                        disabled={this.state.disable}
                    >
                            <Text style={styles.buttonText}>
                                登录
                            </Text>
                    </TouchableOpacity>
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
        backgroundColor: 'white',
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
        borderRadius:5,
        height:56,
        backgroundColor:'#E63C27',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color:'#ffffff',
        fontSize:16,
    },
});
