// 我的页面

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native';
import { ListItem,Button } from 'IFTide';
import Fetch from '../../../Fetch/DataFactories';
import NavigationService from "../../../Utils/NavigationService";
export default class MinePage extends Component {
    constructor (props) {
        super(props)
        this.state = {
            userData: ''
        }
    }
    componentDidMount () {
      // Fetch.fetchData('usermessage',{},(res)=>{
      //     this.setState({userData:res});
      //     console.log(this.state.userData.data.jigou);
      // })
    }
    userMessage (item){
        this.props.navigation.navigate('Login');
       // NavigationService.navigator('Login',{userName:'dfbd'});
       // console.log(item);
        //alert(item)
    }
    render() {
       // console.log(this.state.userData.jigou);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerImg}>
                        <Image style={styles.userImg} source={require('../../../Res/Images/userimg.png')}>
                            {/*<View style={styles.userImgWrraper}>*/}

                            {/*</View>style={{"width":60}}*/}
                        </Image>
                    </View>
                    <View style={styles.headerMessage}>
                        <View style={styles.mainHeaderNameWapper}>
                            <Text style={styles.mainHeaderText}>
                                {this.state.userData ? this.state.userData.data.userName : ''}
                            </Text>
                        </View>
                        <View style={styles.mainHeaderTypeWapper}>
                            <Text style={styles.mainHeaderText}>
                                普通用户
                            </Text>
                        </View>
                        {/*<View style={styles.mainHeaderButtonWapper}>*/}
                           {/*<Button title={"成为VIP"} size={"small"}/>*/}
                        {/*</View>*/}
                    </View>
                    {/*<View style={styles.headerPower}>*/}

                    {/*</View>*/}
                </View>
                {/*<View style={styles.mainMiddle}>*/}
                {/*</View>*/}
                <View style={styles.mainBottom}>
                    {/*<ListItem*/}
                        {/*containerStyle={{*/}
                            {/*borderBottomColor:'#fff',*/}
                            {/*backgroundColor:'#fff',*/}
                            {/*marginTop:10*/}
                        {/*}}*/}
                        {/*avatar={require('../../../res/images/test.png')}*/}
                        {/*avatarOverlayContainerStyle={{backgroundColor:'#ffffff'}}*/}
                        {/*avatarStyle={{width:20,height:20}}*/}
                        {/*avatarContainerStyle={{paddingTop:0,paddingBottom:0,paddingRight:0}}*/}
                        {/*avatarHeight={20}*/}
                        {/*avatarWidth={20}*/}
                        {/*title={"个人信息"}*/}
                        {/*onPress={(event)=>this.userMessage(event,"扫一扫认证")}*/}
                    {/*/>*/}
                    {/*<TouchableHighlight*/}
                        {/*onPress={this.userMessage('个人信息')}*/}
                    {/*>*/}
                    <View style={styles.userMessageLists}>
                    <View style={styles.userMessageList}>
                        <View style={styles.userMessageListInner}>
                            <Text style={styles.userMessageListText}>
                                用户所在机构
                            </Text>
                            <Text style={styles.userMessageListTextValue}>
                                {this.state.userData ? this.state.userData.data.jigou : ''}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.userMessageList}>
                        <View style={styles.userMessageListInner}>
                            <Text style={styles.userMessageListText}>
                                用户所在机构ID
                            </Text>
                            <Text style={styles.userMessageListTextValue}>
                                {this.state.userData ? this.state.userData.data.jigouid : ''}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.userMessageList}>
                        <View style={styles.userMessageListInnerLast}>
                            <Text style={styles.userMessageListText}>
                                用户所在机构层级
                            </Text>
                            <Text style={styles.userMessageListTextValue}>
                                {this.state.userData ? this.state.userData.data.jigoucengji : ''}
                            </Text>
                        </View>
                    </View>
                    </View>
                    {/*<View style={styles.userMessageButton}>*/}
                        {/*<TouchableHighlight*/}
                            {/*style={styles.userMessageButtonBox}*/}
                            {/*underlayColor="#dfdfdf"*/}
                            {/*onPress={()=>{this.userMessage('个人信息')}}*/}
                        {/*>*/}
                            {/*<Text style={styles.userMessageButtonText}>*/}
                               {/*个人信息*/}
                            {/*</Text>*/}
                        {/*</TouchableHighlight>*/}
                    {/*</View>*/}
                    {/*</TouchableHighlight>userRemoveButtonBox*/}
                    <View style={styles.userMessageButton}>
                        <TouchableOpacity
                            style={styles.userMessageButtonBox}
                            onPress={()=>{this.userMessage('注销')}}
                        >
                        <Text style={styles.userMessageButtonText}>
                            注销
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
    },
    header: {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: 'black',
    },
    headerImg:{
        flex:1,
        alignItems:'center',
        height:120,
      //  backgroundColor: 'yellow',
    },
    headerMessage:{
        flex:2,
        height:120,
        // justifyContent:'center',
    },
    // headerPower:{
    //     flex:1,
    //     height:120,
    //     backgroundColor: 'blue',
    // },
    // mainMiddle:{
    //     flex:0.4,
    //     flexDirection:'row',
    //     backgroundColor: 'blue',
    // },
    mainBottom:{
        flex:3,
        paddingTop:20,
        backgroundColor: '#eef0f4',
    },
    userImg:{
        width:120,
        height:120,
        //borderColor:'white',
       // borderWidth:2,
        borderRadius: 100,
    },
    userImgWrraper:{
        width:120,
        height:120,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 50,
        overflow:'hidden',
        backgroundColor: 'white',
    },
    mainHeaderNameWapper:{
        flex:1,
        justifyContent:'center',
       // backgroundColor: 'red',
    },
    mainHeaderTypeWapper:{
        flex:1,
        justifyContent:'center',
       // backgroundColor: 'blue',
    },
    mainHeaderText:{
        color:'white',
        fontSize:16,
    },
    userMessageListText:{
        color:'#333',
    },
    userMessageListTextValue:{
        color:'#333',
    },
    userMessageButton:{
        flex:0,
        height:46,
        width:"100%",
        //justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        backgroundColor: 'white',
    },
    userMessageLists:{
         width:'100%',
         backgroundColor: 'white',
         alignItems:'center',
    },
    userMessageList:{
        flex:0,
        width:'96%',
       // flexDirection:'row',
       // alignItems:'center',
        backgroundColor: 'white',
    },
    userMessageListInner:{
        height:46,
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:2,
        borderBottomColor:'#eef0f4',
        justifyContent:'space-between',
        backgroundColor: 'white',
        paddingLeft:8,
        paddingRight:8
    },
    userMessageListInnerLast:{
        height:46,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor: 'white',
        paddingLeft:8,
        paddingRight:8
    },
    userMessageButtonText:{
        color:'#333',
    },
    userMessageButtonBox:{
        height:46,
        width:'96%',
        justifyContent:'center',
        paddingLeft:8,
    }
    // mainHeaderButton:{
    //     flex:1,
    //     backgroundColor: 'yellow',
    // },
    // mainHeaderButtonWapper:{
    //     flex:1,
    //     justifyContent:'flex-end',
    // },
});
