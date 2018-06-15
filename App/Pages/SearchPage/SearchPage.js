// 搜索页面
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
    AsyncStorage,
    ScrollView,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import Fetch from "../../Fetch/DataFactories";
import Soat from "../../Utils/JsonUtils";
const selectMoneyData = ["不限","0-100万","100-200万","200-500万","500-1000万","1000万以上",];
const selectTimeData = ["不限","1年内","1-5年","5-10年","10-15年","15年以上",];
const soatData = ["按成立日期升序","按成立日期降序","按注册资本升序","按注册资本降序"];
const REQUEST_URL = 'searchData';//请求的分页json文件
let totalPage =3;//数据总页数
let currentPage = 1;//当前第几页
let params = {"pageNum":currentPage,"city":'',"Industry":'',"key":'',"size":'10',"esdateStart":'起始时间',"esdateEnd":'',"regcapGte":'起始资本',"regcapLte":''};//当前第几页
export default class SearchPage extends Component {
    constructor (props) {
        super(props)
        thiz = this;
        this.state = {
            modal:false,
            seachResult:false,
            selectedMoneyActive:'',
            selectedTimeActive:'',
            data:'',
            listData:[],
            textNum:'',
            selectType:1,
            searchValue: '',
            soat:false,
            soatOptionsActive:'',
            searchOptionsValue:[],
            searchIndustryValue: '',
            selectCityIndex:'',
            selectCityDefault:"全国",
            selectIndustryDefault:"全部行业",
            selectIndustryIndex:'',
            refreshing:false,//当前的刷新状态
            showFoot:2,
            params:{"pageNum":currentPage,"key":'',"size":'10',"esdateStart":'起始时间',"esdateEnd":'',"regcapGte":'起始资本',"regcapLte":''},
        }
    }
    componentDidMount () {
       // console.log(dataJson);
      //  Fetch.fetchData('searchData',{},(res)=>{
      //       this.setState({data:res.data});
            //console.log(View);
      //   });
    }
    getCompanyListData (){
        Fetch.fetchData('searchDataRe',{},(res)=>{
            this.setState({listData:res.data.companyMessage});
            //console.log(this.state.data);
            if (res.code === '1'){
                this.setState({refreshing:false});
            }
        });
    }
    //搜索按钮回调
    sendSearch () {
        if (this.state.searchValue === ''){
            alert('搜索内容不能为空')
            return
        }
        params.key = this.state.searchValue;
        this.setState({seachResult:true});
    }
    deleteSearch () {
        if (this.state.searchValue !== ''){
           // alert(1);
            this.myTextInput.clear();
        }
    }
    searchCitySelect (code,number) {
        //alert(1);
       // console.log(code.name);
        this.setState({selectCityIndex:number});
        if (code.name.length > 4){
            this.setState({selectCityDefault:this.fontCut(code.name)});
        }else{
            this.setState({selectCityDefault:code.name});
        }
        params.city = code.name;
        console.log(params);
       // this.getCompanyListData()
       // this.fontCut(code.name);
    }
    searchIndustrySelect (code,number) {
         //alert(2);
        // console.log(1);
        this.setState({selectIndustryIndex:number});
        if (code.name.length > 4){
            this.setState({selectIndustryDefault:this.fontCut(code.name)});
        }else{
            this.setState({selectIndustryDefault:code.name});
        }
        params.Industry = code.name;
        console.log(params);
        //this.getCompanyListData()
    }
    openSoat(){
        //console.log(this.state.listData);
        if (this.state.listData == ''){
           // console.log(this.state.listData);
           return
        }
        if (this.state.soat === true){
            this.setState({soat:false});
        }else{
            this.setState({soat:true});
            this.setState({modal:false});
            this.setState({textNum:''});
        }
        //this.setState({soat:true});
    }
    soatOptionActive(itme,index){
       // alert(index)
        this.setState({soatOptionsActive:index});
        this.setState({soat:false});
        getSortData = ()=>{
            let soatData;
            // console.log(1);
            if (index === 0){
                soatData = Soat.sort(this.state.listData,'time');
            }else if (index === 1){
                soatData = Soat.sort(this.state.listData,'time',true);
            }else if (index === 2){
                soatData = Soat.sort(this.state.listData,'money');
            }else if (index === 3){
                soatData = Soat.sort(this.state.listData,'money',true);
            }
             this.setState({listData:soatData,refreshing:false});
        }
        this.setState({
            refreshing:true,
        },()=>{
            getSortData();
        });
    }
    openSlect(num) {
       // console.log(cityData);
        this.setState({selectType:num});
        if (this.state.modal === true){
            this.setState({modal:false});
            this.setState({textNum:0});
        }else{
            this.setState({textNum:num});
            this.setState({modal:true});
        }
        const cityData = this.state.data.city;
        const industryData = this.state.data.industry;
        if (num === 1){
            this.setState({searchOptionsValue:cityData});
        }else if (num === 2) {
            this.setState({searchOptionsValue:industryData});
        }
    }
    slectedMoney (itme,index) {
            this.setState({selectedMoneyActive:index});
            if (index === 0){
                params.regcapGte = '';
                params.regcapLte = '';
            } else if (index === 1){
                params.regcapGte = '0';
                params.regcapLte = '100';
            }else if (index === 2){
                params.regcapGte = '100';
                params.regcapLte = '200';
            }else if (index === 3){
                params.regcapGte = '200';
                params.regcapLte = '500';
            }else if (index === 4){
                params.regcapGte = '500';
                params.regcapLte = '1000';
            }else if (index === 5){
                params.regcapGte = '1000';
                params.regcapLte = '';
            }
        console.log(params)
    }
    slectedTime (itme,index) {
        this.setState({selectedTimeActive:index});
        if (index === 0){
            params.esdateStart = '';
            params.esdateEnd = '';
        } else if (index === 1){
            params.esdateStart = '';
            params.esdateEnd = '1';
        }else if (index === 2){
            params.esdateStart = '1';
            params.esdateEnd = '5';
        }else if (index === 3){
            params.esdateStart = '5';
            params.esdateEnd = '10';
        }else if (index === 4){
            params.esdateStart = '10';
            params.esdateEnd = '15';
        }else if (index === 5){
            params.esdateStart = '15';
            params.esdateEnd = '';
        }
        console.log(params)
    }
    getView = ({item}) => {
        //返回每个itemthis.props.navigation.navigate('Company')
        return(<TouchableWithoutFeedback

            onPress={()=>{this.props.navigation.navigate('Company',{companyName:item.cname})}}
        >
            <View style={styles.seachResultList}>
                <View style={styles.seachResultListTitle}>
                    <Text style={styles.seachResultListTitleText}>
                        {item.cname}
                    </Text>
                    <View style={styles.seachResultListTitleRight}>
                        <Text style={styles.seachResultListTitleRightText}>
                            {item.status}
                        </Text>
                    </View>
                </View>
                <View style={styles.seachResultListCode}>
                    <Text style={styles.seachResultListCodeText}>
                        统一社会信用代码 : {item.code}
                    </Text>
                </View>
                <View style={styles.seachResultListMessage}>
                    <View style={styles.seachResultListMessageLeftInner}>
                        <Text style={styles.seachResultListCodeText}>
                            法定代表人
                        </Text>
                        <Text style={styles.seachResultListNameText}>
                            {item.NAME}
                        </Text>
                    </View>
                    <View style={styles.seachResultListMessageInnerBottom}>
                        <View>
                            <Text style={styles.seachResultListSpaceText}>
                                |
                            </Text>
                        </View>
                        <View style={styles.seachResultListMessageCenterText}>
                            <Text style={styles.seachResultListCodeText}>
                                注册资本
                            </Text>
                            <Text style={styles.seachResultListMoneyText}>
                                {item.money}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.seachResultListSpaceText}>
                                |
                            </Text>
                        </View>
                    </View>
                    <View style={styles.seachResultListMessageRightInner}>
                        <Text style={styles.seachResultListCodeText}>
                            注册时间
                        </Text>
                        <Text style={styles.seachResultListTimeText}>
                            {item.time}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>)
    };
    //footer 尾部
    footer = () =>{
        if(this.state.showFoot === 1){
            return(
                <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'black',fontSize:14,marginTop:5,marginBottom:5,}}>没有更多数据了</Text>
                </View>
            );
        }
        else if (this.state.showFoot === 0){
            return(
                <View style={styles.footer}>
                    <ActivityIndicator/>
                    <Text style={styles.footerfont}>正在加载更多数据</Text>
                </View>
            );
        }
        else if(this.state.showFoot===2){
            return(
                <View style={styles.footer}><Text></Text></View>
            );
        }
    }
    //请求上拉加载数据
    onEndReached  =() => {
       // console.log(params);
       let pageNum = 1;
        Fetch.fetchData(REQUEST_URL,{},(res) => {
           let foot = 0;
           if(pageNum>=totalPage){
               foot =1;//底部显示没有更多数据
           }
            console.log(res);
        this.setState({
            listData:this.state.listData.concat(res.data.companyMessage),
            data:res.data
        });
        })
    }
    //下拉刷新方法
    onRefresh =() =>{
        //设置刷新状态为正在刷新
        this.setState({
            refreshing:true,
        },()=>{
            this.getCompanyListData();
        });

    };
    _keyExtractor(item,index){
        return "index"+item+index;
    }
    //设置每页渲染的数据条数
    initialNumToRender:10;
    fontCut (font){
        let fontCut = font.slice(0,4) + '...';
        return fontCut;
    }
    render() {
        //const { state: {params}} = this.props.navigation;
        const selectOptions = this.state.searchOptionsValue?this.state.searchOptionsValue.map((itme,index)=>{
            return(<TouchableWithoutFeedback
                onPress={()=>{this.state.selectType === 1?this.searchCitySelect(itme,index):this.searchIndustrySelect(itme,index)}}
                key={index}
            >
                <View style={[styles.scrollViewInnerButton,this.state.selectType === 1?this.state.selectCityIndex===index&&styles.scrollViewInnerButtonBg:this.state.selectIndustryIndex===index&&styles.scrollViewInnerButtonBg]}>
                    <Text >
                        {itme.name}
                    </Text>
                </View>
            </TouchableWithoutFeedback>)
        }):<Text>暂无数据</Text>;
        const selectTimeOrMoney = (<View style={styles.selectMoreWrapper}>
            <View style={styles.selectMorePublicWrapper}>
                <View style={styles.selectMorePublicInner}>
                    <Text style={styles.selectMoreText}>
                        注册资本
                    </Text>
                    <View style={styles.selectMoreInner}>
                        {selectMoneyData.map((itme,index)=>{
                            return( <TouchableWithoutFeedback
                                onPress={()=>{this.slectedMoney(itme,index)}}
                                key = {index}
                            >
                                <View style={[styles.selectMore,this.state.selectedMoneyActive === index&&styles.selectMoreActive]}>
                                    <Text style={[styles.selectMoreText,this.state.selectedMoneyActive === index&&styles.selectMoreTextActive]}>
                                        {itme}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>)
                        })}
                    </View>
                </View>
            </View>
            <View style={styles.selectMoreTimeWrapper}>
                <View style={styles.selectMorePublicWrapper}>
                    <View style={styles.selectMorePublicInner}>
                        <Text style={styles.selectMoreText}>
                            注册时间
                        </Text>
                        <View style={styles.selectMoreInner}>
                            {selectTimeData.map((itme,index)=>{
                                return( <TouchableWithoutFeedback
                                    onPress={()=>{this.slectedTime(itme,index)}}
                                    key = {index}
                                >
                                    <View style={[styles.selectMore,this.state.selectedTimeActive === index&&styles.selectMoreActive]}>
                                        <Text style={[styles.selectMoreText,this.state.selectedTimeActive === index&&styles.selectMoreTextActive]}>
                                            {itme}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>)
                            })}
                        </View>
                    </View>
                </View>
            </View>
        </View>);
        return (
            <View style={styles.container}>
                <View style={styles.searchInput}>
                    <View>
                        <TouchableOpacity
                            onPress={()=>{this.props.navigation.goBack()}}
                        >
                            <Image style={styles.userImg} source={require('../../Res/Images/back.png')} />
                        </TouchableOpacity>

                    </View>
                    <View style={styles.textInputInner}>
                        <TouchableOpacity
                            style={styles.searchButtonBox}
                            onPress={()=>{this.sendSearch()}}
                        >
                            <Image style={styles.userImg} source={require('../../Res/Images/search.png')} />
                        </TouchableOpacity>
                        <TextInput style={styles.textInput}
                                   ref={(ref)=>{this.myTextInput = ref}}
                                   placeholder = "请输入企业名称,人名,品牌等"
                                   placeholderTextColor = "#bbbbbb"
                                   underlineColorAndroid = 'transparent'
                                   onChangeText ={(text) => {this.setState({searchValue:text})}}
                        />
                        <TouchableOpacity
                            style={styles.searchDeleteButtonBox}
                            onPress={()=>{this.deleteSearch()}}
                        >
                            <Image style={styles.userImg} source={require('../../Res/Images/delete.png')} />
                        </TouchableOpacity>
                    </View>
                    <View >
                        <TouchableOpacity
                            onPress={()=>{this.openSoat()}}
                        >
                            <Text >
                               排序
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/*历史记录开始*/}
                {/*<View style={styles.searchSpace}>*/}
                {/*</View>*/}
                {/*<View style={styles.historySearch}>*/}
                    {/*<View style={styles.historySearchTitle}>*/}
                        {/*<View style={styles.historySearchTitleInner}>*/}
                            {/*<Text style={styles.title}>*/}
                                {/*最近搜索*/}
                            {/*</Text>*/}
                        {/*</View>*/}
                    {/*</View>*/}
                    {/*<View style={styles.historySearchList}>*/}
                        {/*<View style={styles.historySearchListInner}>*/}
                            {/*<Text style={styles.listTitle}>*/}
                                {/*中国工商股份*/}
                            {/*</Text>*/}
                            {/*<View>*/}
                                {/*<Image style={styles.listImg} source={require('../../res/images/icon56.png')} />*/}
                            {/*</View>*/}
                        {/*</View>*/}
                        {/*<View style={styles.historySearchListInner}>*/}
                            {/*<Text style={styles.listTitle}>*/}
                                {/*中国工商股份*/}
                            {/*</Text>*/}
                            {/*<View>*/}
                                {/*<Image style={styles.listImg} source={require('../../res/images/icon56.png')} />*/}
                            {/*</View>*/}
                        {/*</View>*/}
                        {/*<View style={styles.historySearchListInner}>*/}
                            {/*<Text style={styles.listTitle}>*/}
                                {/*中国工商股份*/}
                            {/*</Text>*/}
                            {/*<View>*/}
                                {/*<Image style={styles.listImg} source={require('../../res/images/icon56.png')} />*/}
                            {/*</View>*/}
                        {/*</View>*/}
                    {/*</View>*/}
                {/*</View>*/}
                {/*历史记录结束*/}
                {/*{this.state.seachResult?seachResult:<Text></Text>}*/}
                <View style={[styles.seachResult,this.state.seachResult === false&&styles.seachResultHidden]}>
                    <View style={styles.seachSelect}>
                            <TouchableWithoutFeedback
                                onPress={()=>{this.openSlect(1)}}
                            >
                                <View style={styles.seachSelectInner}>
                                    <Text style={[styles.seachResultCountPage,this.state.textNum === 1&&styles.selectTextColor]}>
                                        {this.state.selectCityDefault}
                                    </Text>
                                    <Image style={[styles.seachSelectImg]} source={this.state.textNum === 1?require('../../Res/Images/sanjiaoactive.png'):require('../../Res/Images/sanjiao.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                                onPress={()=>{this.openSlect(2)}}
                            >
                                <View style={styles.seachSelectInner}>
                                    <Text style={[styles.seachResultCountPage,this.state.textNum === 2&&styles.selectTextColor]}>
                                        {this.state.selectIndustryDefault}
                                    </Text>
                                    <Image style={[styles.seachSelectImg]} source={this.state.textNum === 2?require('../../Res/Images/sanjiaoactive.png'):require('../../Res/Images/sanjiao.png')} />
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback
                                onPress={()=>{this.openSlect(3)}}
                            >
                                <View style={styles.seachSelectInner}>
                                    <Text style={[styles.seachResultCountPage,this.state.textNum === 3&&styles.selectTextColor]}>
                                        更多筛选
                                    </Text>
                                    <Image style={[styles.seachSelectImg]} source={this.state.textNum === 3?require('../../Res/Images/sanjiaoactive.png'):require('../../Res/Images/sanjiao.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.seachResultCount}>
                        <Text style={styles.seachResultCountText}>
                            搜索到<Text style={styles.seachResultCountTextColor}>超过5000个</Text>公司<Text style={styles.seachListRule}>(最多显示100条)</Text>
                        </Text>
                        {/*<Text style={styles.seachResultCountPage}>*/}
                            {/*第<Text>1</Text>/<Text>125</Text>页*/}
                        {/*</Text>*/}
                    </View>
                    <View style={styles.seachResultListWrapper}>
                        <FlatList
                            keyboardShouldPersistTaps={'handled'}
                            data={this.state.listData}
                            initialNumToRender={this.initialNumToRender}
                            keyExtractor={this._keyExtractor}
                            renderItem={this.getView}//渲染每一条记录
                            ListFooterComponent={this.footer}//尾部
                            //下拉刷新，必须设置refreshing状态
                            onRefresh={this.onRefresh}
                            refreshing={this.state.refreshing}
                            //上拉加载
                            onEndReachedThreshold={0.1}
                            onEndReached={this.onEndReached}
                        >
                        </FlatList>
                    </View>
                    <View style={[styles.seachValue,this.state.modal?styles.seachValueModalYes:styles.seachValueModalNo]}>
                        <View style={styles.scrollViewContainer}>
                            <View style={this.state.selectType === 3?styles.scrollViewInnerMore:styles.scrollViewInner}>
                                <ScrollView
                                    showsVerticalScrollIndicator = {false}
                                >
                                    {this.state.selectType === 3?selectTimeOrMoney:selectOptions}
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[styles.sortWrapper,this.state.soat?styles.sortWrapperShow:styles.sortWrapperHidden]}>
                    <View style={styles.sortInner}>
                        {soatData.map((itme,index)=>{
                            return(<TouchableWithoutFeedback
                            onPress={()=>{this.soatOptionActive(itme,index)}}
                            key={index}
                            >
                                <View style={[styles.sortOptions,this.state.soatOptionsActive === index&&styles.sortOptionsActive]}>
                                    <Text>
                                        {itme}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>)
                         })}
                    </View>
                </View>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
       // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    selectTextColor: {
         color:'#1abef9',
    },
    selectImgRotation: {
        rotation:180,
    },
    seachValue: {
        //flex: 1,
        width:'100%',
        // justifyContent: 'center',
        height:'100%',
        backgroundColor: 'rgba(0,0,0,0.2)',
        position:'absolute',
        top:60,
    },
    seachValueModalNo: {
        display:'none'
    },
    seachValueModalYes: {
        display:'flex'
    },
    searchInput: {
        width:'94%',
        height:40,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop:20,
        marginBottom:20,
       // backgroundColor: 'blue',
    },
    historySearch:{
        // justifyContent: 'center',
         alignItems: 'center',
        // backgroundColor: '#F5FCFF',
        width:'100%',
    },
    userImg:{
        width:22,
        height:22,
    },
    listImg:{
        width:20,
        height:20,
    },
    textInput:{
        width:'82%',
       // backgroundColor: 'red',
    },
    textInputInner:{
        width:'82%',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f0f0f0',
        borderRadius:5,
    },
    searchSpace:{
        backgroundColor: '#dfdfdf',
        height:20,
        width:'100%'
    },
    historySearchTitle:{
        //height:50,
        width:'100%',
        //justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth:1,
        borderBottomColor:'#eef0f4',
       // backgroundColor: '#dfdfdf',
    },
    historySearchTitleInner:{
        justifyContent: 'center',
        height:50,
        width:'96%',
        paddingLeft:20,
    },
    historySearchListInner:{
       // justifyContent: 'center',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
       // backgroundColor: '#dfdfdf',
        height:60,
        width:'96%',
        borderBottomWidth:1,
        borderBottomColor:'#eef0f4',
        paddingLeft:20,
        paddingRight:10
    },
    historySearchInner:{
        justifyContent: 'center',
        // backgroundColor: '#dfdfdf',
        height:60,
        width:'96%',
        borderBottomWidth:1,
        borderBottomColor:'red',
        paddingLeft:20,
    },
    searchButtonBox:{
        paddingLeft: 10,
    },
    searchDeleteButtonBox:{
        paddingRight: 10,
    },
    title:{
        fontSize: 18,
        color:'#333333'
    },
    listTitle:{
        fontSize:16,
        color:'#333333'
    },
    historySearchList:{
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    seachResult:{
        flex: 1,
        width:'100%',
       // backgroundColor: 'yellow',
        borderTopWidth:1,
        borderTopColor:'#F0F0F0',
    },
    seachResultHidden:{
        display:'none'
    },
    seachSelect:{
       // flex:1,
        width:'100%',
       // position:'relative',
       // top:20,
       height:60,
       flexDirection:'row',
       alignItems: 'center',
      // backgroundColor: 'blue',
        borderBottomWidth:1,
        borderBottomColor:'#F0F0F0',
    },
    seachSelectDetial:{
        flex:1,
        backgroundColor: 'red',
    },
    seachSelectInner:{
        flex:1,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
       // backgroundColor: '#dfdfdf',
    },
    seachSelectImg:{
        width:14,
        height:12,
        marginLeft:8,
    },
    seachResultCount:{
        width:'100%',
        height:60,
        backgroundColor: '#f0f0f0',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft:20,
        paddingRight:20,
    },
    seachResultCountText:{
        fontSize: 16,
        color:'#333333',
    },
    seachResultCountTextColor:{
        color:'#E63C27',
    },
    seachResultCountPage:{
        fontSize: 16,
    },
    seachResultListWrapper:{
        width:'100%',
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    seachResultList:{
        paddingTop:20,
        paddingLeft:40,
        paddingRight:10,
        paddingBottom:20,
        marginBottom:10,
        backgroundColor: 'white',
    },
    seachResultListTitleRight:{
        borderWidth:1,
        borderColor:'#67c94d',
        paddingRight:6,
        paddingLeft:10,
        paddingBottom:1,
        paddingTop:1,
        borderRadius:4,
    },
    seachResultListTitleRightText:{
        color:'#67c94d'
    },
    seachResultListTitle:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    seachResultListTitleText:{
        fontSize: 20,
        color:'#333333',
    },
    seachResultListCode:{
        paddingTop:10,
    },
    seachResultListCodeText:{
        fontSize: 16,
        color:'#9e9e9e',
    },
    seachResultListMoneyText:{
        fontSize: 16,
        color:'#333333',
    },
    seachResultListTimeText:{
        fontSize: 16,
        color:'#333333',
    },
    seachResultListMessage:{
        paddingTop:10,
        flexDirection:'row',
        alignItems: 'center',
    },
    seachResultListMessageLeftInner:{
        paddingRight:10,
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    seachResultListNameText:{
        fontSize: 16,
        color:'#1abef9',
    },
    seachListRule:{
        fontSize: 14,
       // color:'#1abef9',
    },
    seachResultListMessageInnerBottom:{
        flexDirection:'row',
        alignItems: 'center',
       // backgroundColor: 'blue',
    },
    seachResultListMessageCenterText:{
           paddingLeft:10,
           paddingRight:10,
           alignItems: 'center',
    },
    seachResultListMessageRightInner:{
        paddingLeft:10,
        alignItems: 'center',
    },
    seachResultListSpaceText:{
           fontSize: 20,
           color:'#dfdfdf'
    },
    scrollViewContainer:{
        width:'100%',
        height:'60%',
        backgroundColor: '#f0f0f0',
    },
    scrollViewInner:{
        width:'30%',
        height:'100%',
        backgroundColor: 'white',
    },
    scrollViewInnerMore:{
        width:'100%',
        height:'100%',
        backgroundColor: 'white',
    },
    selectMorePublicWrapper:{
        alignItems: 'center',
    },
    selectMoreTimeWrapper:{
          borderTopColor:"#f0f0f0",
          borderTopWidth:1,
    },
    selectMorePublicInner:{
        width:'92%',
        marginTop:16,
        marginBottom:10,
       // backgroundColor: 'red',
    },
    selectMoreInner:{
        flexDirection:'row',
        alignItems: 'center',
        flexWrap:'wrap',
    },
    selectMore:{
        //flex:1,
       // width:100,
        alignItems: 'center',
        paddingRight:12,
        paddingLeft:12,
        paddingTop:2,
        paddingBottom:2,
        marginBottom:16,
        marginRight:16,
       // borderColor:"#dfdfdf",
        backgroundColor: '#f0f0f0',
        borderRadius:4,
       // borderWidth:1,
    },
    selectMoreText:{
        color: '#333333',
    },
    selectMoreTextActive:{
        color: 'white',
    },
    selectMoreActive:{
        backgroundColor: '#1abef9',
    },
    scrollViewInnerButton:{
        width:'100%',
        height:40,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'red',
        borderBottomWidth:1,
        borderBottomColor:'#F0F0F0',
    },
    scrollViewInnerButtonBg:{
        backgroundColor: '#F0F0F0',
    },
    footer:{
        flexDirection:'row',
        height:24,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:8,
    },
    footerfont:{
        color:'black',
    },
    sortWrapper:{
        width:'100%',
        height:'100%',
        backgroundColor: 'rgba(0,0,0,0.1)',
        position:'absolute',
        top:80,
    },
    sortWrapperHidden:{
        display:'none'
    },

    sortWrapperShow: {
        display:'flex'
    },
    sortInner:{
        width:'100%',
        height:220,
        backgroundColor: '#ffffff',
        borderTopWidth:1,
        borderTopColor:'#F0F0F0',
        alignItems:'center',
    },
    sortOptions:{
        width:'96%',
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:16,
        // backgroundColor: '#ffffff',
        borderBottomWidth:1,
        borderBottomColor:'#F0F0F0',
    },
    sortOptionsActive:{
        backgroundColor:'#F0F0F0',
    },
});

