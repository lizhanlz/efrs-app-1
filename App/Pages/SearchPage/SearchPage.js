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
import { MessageBox,Dialog,Label } from 'IFTide';
import Fetch from "../../Fetch/DataFactories";
import Soat from "../../Utils/JsonUtils";
const selectMoneyData = ["不限","0-100万","100-200万","200-500万","500-1000万","1000万以上",];
const selectTimeData = ["不限","1年内","1-5年","5-10年","10-15年","15年以上",];
const soatData = ["按成立日期升序","按成立日期降序","按注册资本升序","按注册资本降序"];
let totalPage =3;//数据总页数
let currentPage = 1;//当前第几页
let params = {"serviceKey": "模糊查询","reqParams":{"page":currentPage,"areaCode":'',"industryPhy":'',"key":'',"size":'10',"esdateStart":'',"esdateEnd":'',"regcapGte":'',"regcapLte":'',"enableAggregate":"true"}};//当前第几页
export default class SearchPage extends Component {
    constructor (props) {
        super(props)
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
            soatDisable:true,
            soatOptionsActive:'',
            searchOptionsValue:[],
            searchIndustryValue: '',
            selectCityIndex:'',
            selectCityDefault:"全国",
            selectIndustryDefault:"全部行业",
            selectIndustryIndex:'',
            refreshing:false,//当前的刷新状态
            showFoot:2,
            msg:'',
            vioceModal:false,
            bluffShow:false,
            bluffData:'trdtrrdt',
            totalnum:0,
            view:false,
        }
    }
    componentDidMount () {
       // console.log(dataJson);
      //  Fetch.fetchData('searchData',{},(res)=>{
      //       this.setState({data:res.data});
            //console.log(View);
      //   });
       // console.log(this.props.navigation.state.params.info)
    }
    //手动获取搜索结果
    getCompanyListData (){
        params.reqParams.page = 1;
        params.reqParams.key = this.state.searchValue;
        this.setState({refreshing:true});
       // console.log(params);
       // console.log(Fetch.overTime);
        Fetch.fetchData('jsonpost',params,(res)=>{
           // this.setState({listData:res.data.ENTERPRISES});
            //console.log(res);
            if (res.success!==undefined&&res.success === false){
                this.setState({msg:'连接超时,请重试！',refreshing:false});
                this.alertSearch._show();
            }
            if (res.code === '200' || res.code === '404'){
                this.setState({listData:res.data.ENTERPRISES,refreshing:false,totalnum:res.totalnum,data:res.data});
            }else if(res.code === '-1'){
                this.setState({refreshing:false});
            }
            if (res.totalpage>1){
                this.setState({showFoot:0})
            }else {
                this.setState({showFoot:2})
            }
            if (res.data.ENTERPRISES != ''){
                this.setState({soatDisable:false,view:false});
            }else{
                this.setState({view:true,showFoot:2})
               // view = '<Text style={{textAlign:"center"}}>没有查询到相关数据</Text>';
            }
        });
    }
    //搜索按钮回调
    sendSearch () {
        if (this.state.searchValue === ''){
            this.setState({msg:'搜索内容不能为空！'});
            this.alertSearch._show();
            return
        }
        currentPage = 1;
        params.reqParams.areaCode = '';
        params.reqParams.industryPhy = '';
        params.reqParams.esdateStart = '';
        params.reqParams.esdateEnd = '';
        params.reqParams.regcapGte = '';
        params.reqParams.regcapLte = '';
        this.setState({selectedMoneyActive:'',selectedTimeActive:'',selectCityDefault:'全国',selectIndustryDefault:"全部行业"});
        if (this.props.navigation.state.params.info === '电信诈骗'){
            Fetch.fetchData('stuff',{},(res)=>{
                if (res.respCd === '0000'){
                    console.log(2);
                    this.setState({bluffShow:true});
                    this.setState({bluffData:res.result.msg});
                }else if(res.code === '-1'){

                }
            });
            return
        }
        // if(this.state.seachResult===true){
        //     this.getCompanyListData();
        //     return
        // }
        this.setState({seachResult:true});
        this.getCompanyListData();
    };
    //键盘搜索按钮回调
    onSubmitEditing (){
        // alert(1);
        this.sendSearch();
    };
    //清除输入框内容
    deleteSearch () {
        if (this.state.searchValue !== ''){
           // alert(1);
            this.myTextInput.clear();
            this.setState({searchValue:''});
        }
    };
    //打开语音搜索界面
    openVioce (){
        this.setState({vioceModal:true})
    }
    //筛选城市
    searchCitySelect (code,number) {
        this.setState({selectCityIndex:number});
        if (code.AREANAME.length > 4){
            this.setState({selectCityDefault:this.fontCut(code.AREANAME)});
        }else{
            this.setState({selectCityDefault:code.AREANAME});
        }
        params.reqParams.areaCode = code.AREACODE;
        console.log(params);
        this.setState({modal:false,textNum:0});
        this.getCompanyListData();
       // this.fontCut(code.name);
    };
    //筛选行业
    searchIndustrySelect (code,number) {
        this.setState({selectIndustryIndex:number});
        if (code.INDUSTRYPHYNAME.length > 4){
            this.setState({selectIndustryDefault:this.fontCut(code.INDUSTRYPHYNAME)});
        }else{
            this.setState({selectIndustryDefault:code.INDUSTRYPHYNAME});
        }
        params.reqParams.industryPhy = code.INDUSTRYPHY;
        this.setState({modal:false,textNum:0});
        this.getCompanyListData();
    };
    //显示排序浮层
    openSoat(){
        //console.log(this.state.listData);
        // if (this.state.listData == ''){
        //    // console.log(this.state.listData);
        //     this.setState({soatDisable:true});
        //     return
        // }else{
        //     this.setState({soatDisable:false});
        // }
        if (this.state.soat === true){
            this.setState({soat:false});
        }else{
            this.setState({soat:true});
            this.setState({modal:false});
            this.setState({textNum:''});
        }
        //this.setState({soat:true});
    };
    //排序选项选择
    soatOptionActive(itme,index){
       // alert(index)
        this.setState({soatOptionsActive:index});
        this.setState({soat:false});
        getSortData = ()=>{
            let soatData;
            // console.log(1);
            if (index === 0){
                soatData = Soat.sort(this.state.listData,'ESDATE',index);
            }else if (index === 1){
                soatData = Soat.sort(this.state.listData,'ESDATE',index,true);
            }else if (index === 2){
                soatData = Soat.sort(this.state.listData,'REGCAP',index);
            }else if (index === 3){
                soatData = Soat.sort(this.state.listData,'REGCAP',index,true);
            }
             this.setState({listData:soatData,refreshing:false});
        }
        this.setState({
            refreshing:true,
        },()=>{
            getSortData();
        });
    };
    //显示筛选条件浮层
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
        const cityData = this.state.data.AREACODECOUNT;
        const industryData = this.state.data.INDUSTRYPHYCOUNT;
        if (num === 1){
            this.setState({searchOptionsValue:cityData});
        }else if (num === 2) {
            this.setState({searchOptionsValue:industryData});
        }
    };
    //注册资本筛选
    slectedMoney (itme,index) {
            this.setState({selectedMoneyActive:index});
            if (index === 0){
                params.reqParams.regcapGte = '';
                params.reqParams.regcapLte = '';
            } else if (index === 1){
                params.reqParams.regcapGte = '0';
                params.reqParams.regcapLte = '100';
            }else if (index === 2){
                params.reqParams.regcapGte = '100';
                params.reqParams.regcapLte = '200';
            }else if (index === 3){
                params.reqParams.regcapGte = '200';
                params.reqParams.regcapLte = '500';
            }else if (index === 4){
                params.reqParams.regcapGte = '500';
                params.reqParams.regcapLte = '1000';
            }else if (index === 5){
                params.reqParams.regcapGte = '1000';
                params.reqParams.regcapLte = '';
            }
       // console.log(params)
    };
    //更多筛选确定按钮回调
    moreButton(){
        this.setState({modal:false,textNum:0});
        if (params.reqParams.regcapGte===''&&params.reqParams.regcapLte===''&&params.reqParams.esdateStart===''&&params.reqParams.esdateEnd===''){
             return;
        }else{
            this.getCompanyListData();
        }
    }
    goSearchDetail (key){
        let info = this.props.navigation.state.params.info;
        if (info === ''){
          //  console.log(key);
            this.props.navigation.navigate('Company',{company:key})
        }else {
            let companyName = key.ENTNAME;
            let companyID = key.ID;
            let pressInformationName = this.props.navigation.state.params.info;
            //具体请求的参数在文档里面写出，根据模块不同，配置的参数也不同。
            if (pressInformationName === '股东信息' || pressInformationName === '法人对外投资' || pressInformationName === '企业对外任职') {
               // console.log('1')
                Fetch.fetchData('jsonpost', {"serviceKey":pressInformationName,
                    "bankId":"8B94459B9F1D4ECD",
                    "userId":"001100807",
                    "key":companyID,
                    "page":"1",
                    "size":"10"},(res) => {
                    let code = res.code;
                    let Msg = res.msg;
                    let Data = res.data;
                    let ListType = res.listtype;
                    let totalpage = res.totalpage;
                    if(code !== "200" && code !== "0000")
                    {
                        // thiz.handlerError(code,Msg);
                        // thiz.alertType1._show()
                        this.setState({msg:Msg});
                        this.alertSearch._show();
                    } else {
                        this.props.navigation.navigate('List', {info: pressInformationName, data: Data, listtype: ListType, totalpage: totalpage, key:companyID})
                    }
                    console.log('data', Data)
                });
            }else {
                console.log('2')
                Fetch.fetchData('jsonpost', {"serviceKey":pressInformationName,
                    "bankId":"8B94459B9F1D4ECD",
                    "userId":"001100807",
                    "key":companyName,
                    "page":"1",
                    "size":"10"}, (res) => {
                    let code = res.code;
                    let Msg = res.msg;
                    let Data = res.data;
                    let ListType = res.listtype;
                    let totalpage = res.totalpage;
                    if(code !== "200" && code !== "0000")
                    {
                        // thiz.handlerError(code,Msg);
                        // thiz.alertType1._show()
                        this.setState({msg:Msg});
                        this.alertSearch._show();
                    } else {
                        this.props.navigation.navigate('List', {info: pressInformationName, data: Data, listtype: ListType, totalpage: totalpage, key:companyName})
                    }
                    console.log('data', Data)
                });

            }
        }
        // this.setState({msg:'搜索内容'});
        // this.alertSearch._show();
        // Fetch.fetchData('fygg1', {}, function(res) {
        //     let code = res.code;
        //     let Msg = res.msg;
        //     let Data = res.data;
        //     let ListType = res.listtype;
        //     let totalpage = res.totalpage;
        //     if(code === '0')
        //     {
        //         this.setState({msg:'搜索内容不能为空！'});
        //         this.alertSearch._show();
        //     } else {
              //  this.props.navigation.navigate('List', {info: pressInformationName, data: Data, listtype: ListType, totalpage: totalpage})
            //}
            // console.log('data', Data)
       // });
       // this.props.navigation.navigate('Company',{companyName:item.ENTNAME,info:this.props.navigation.state.params.info})
    }
    //注册时间筛选
    slectedTime (itme,index) {
        let newTime = new Date();
        let year = newTime.getFullYear();
        let month = newTime.getMonth()+1;
        let day = newTime.getDate();
        if (month<10){
            month = "0" + month;
        }
        if (day<10){
            day = "0" + day;
        }
        if (month === "02"&&day === "29"){
            day = "28";
        }
        const oneYear = year-1 + "-" + month + "-" + day;
        const fiveYear = year-5 + "-" + month + "-" + day;
        const tenYear = year-10 + "-" + month + "-" + day;
        const fifteenYear = year-15 + "-" + month + "-" + day;
       // console.log(oneYear,fiveYear,fiveYear,fifteenYear);
        this.setState({selectedTimeActive:index});
        if (index === 0){
            params.reqParams.esdateStart = '';
            params.reqParams.esdateEnd = '';
        } else if (index === 1){
            params.reqParams.esdateStart = oneYear;
            params.reqParams.esdateEnd = '';
        }else if (index === 2){
            params.reqParams.esdateStart = fiveYear;
            params.reqParams.esdateEnd = oneYear;
        }else if (index === 3){
            params.reqParams.esdateStart = tenYear;
            params.reqParams.esdateEnd = fiveYear;
        }else if (index === 4){
            params.reqParams.esdateStart = fifteenYear;
            params.reqParams.esdateEnd = tenYear;
        }else if (index === 5){
            params.reqParams.esdateStart = '';
            params.reqParams.esdateEnd = fifteenYear;
        }
    };
    getView = ({item}) => {
        //返回每个itemthis.props.navigation.navigate('Company')
        return(<TouchableWithoutFeedback
            onPress={()=>{this.goSearchDetail(item)}}
        >
            <View style={styles.seachResultList}>
                <View style={styles.seachResultListTitle}>
                    <Text style={styles.seachResultListTitleText}>
                        {item.ENTNAME}
                    </Text>
                    <View style={styles.seachResultListTitleRight}>
                        <Text style={styles.seachResultListTitleRightText}>
                            {item.ENTSTATUS}
                        </Text>
                    </View>
                </View>
                <View style={styles.seachResultListCode}>
                    <Text style={styles.seachResultListCodeText}>
                        统一社会信用代码 : {item.CREDITCODE}
                    </Text>
                </View>
                <View style={styles.seachResultListMessage}>
                    <View style={styles.seachResultListMessageLeftInner}>
                        <Text style={styles.seachResultListCodeText}>
                            法定代表人
                        </Text>
                        <Text style={styles.seachResultListNameText}>
                            {item.NAME.length>6?item.NAME.slice(0,6) + '...':item.NAME}
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
                                注册资本(万元)
                            </Text>
                            <Text style={styles.seachResultListMoneyText}>
                                {item.REGCAP}
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
                            {item.ESDATE}
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

        if (this.state.listData.length >= 100){
            return
        }
        currentPage++;
       // this.setState({refreshing:true});
        // if (this.state.showFoot === 0){
        //     this.setState({refreshing:false});
        // }
        params.reqParams.page = currentPage;
        if (this.state.data.totalpage&&this.state.data.totalpage !== undefined){
            if(currentPage == this.state.data.totalpage){
                this.setState({showFoot:1});//底部显示没有更多数据
            }else if(currentPage>this.state.data.totalpage){
                return
            }
        }
       // params.reqParams.key = this.state.searchValue;
        Fetch.fetchData('jsonpost',params,(res) => {
           // console.log(currentPage);
         // console.log(res);
            if (res.success!==undefined&&res.success === false){
                this.setState({msg:'连接超时,请重试！'});
                this.alertSearch._show();
            }
          if (res.code === '200'){
              this.setState({
                  listData:this.state.listData.concat(res.data.ENTERPRISES),
                 // data:res.data,
                  totalnum:res.totalnum,
              });
          }else if(res.code === '-1'){
              this.setState({refreshing:false});
             // alert('服务器内部错误！')
          }
           if (this.state.listData != ''){
               this.setState({soatDisable:false});
           }
         })
    };
    //下拉刷新方法
    onRefresh =() =>{
        //设置刷新状态为正在刷新
        // this.setState({
        //     refreshing:true,
        // },()=>{
        //     this.getCompanyListData();
        // });
        this.getCompanyListData();
    };
    //设置搜索结果列表的key值
    _keyExtractor(item,index){
        return "index"+item+index;
    }
    //设置每页渲染的数据条数
    initialNumToRender:10;
    fontCut (font){
        let fontCut = font.slice(0,4) + '...';
        return fontCut;
    }
    // _getItemLoyout = (data:any,index:number)=>{
    //     return getItemLayout(data,index,false);
    // };
    render() {
        let placeholder;
        if (this.props.navigation.state.params.info === '电信诈骗'){
            placeholder = '请输入要查询的卡账号';
        }else{
            placeholder = "请输入企业名称,人名,品牌等";
        }
        const selectOptions = this.state.searchOptionsValue.length?this.state.searchOptionsValue.map((itme,index)=>{
            return(<TouchableWithoutFeedback
                onPress={()=>{this.state.selectType === 1?this.searchCitySelect(itme,index):this.searchIndustrySelect(itme,index)}}
                key={index}
            >
                <View style={[styles.scrollViewInnerButton,this.state.selectType === 1?this.state.selectCityIndex===index&&styles.scrollViewInnerButtonBg:this.state.selectIndustryIndex===index&&styles.scrollViewInnerButtonBg]}>
                    <Text >
                        {this.state.selectType === 1?itme.AREANAME:itme.INDUSTRYPHYNAME}
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
            <TouchableWithoutFeedback
                onPress={()=>{this.moreButton()}}
            >
                <View style={styles.moreButtonWrapper}>
                    <View style={styles.moreButton}>
                        <Text style={styles.moreButtonText}>
                             确认
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
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
                                   placeholder = {placeholder}
                                   placeholderTextColor = "#bbbbbb"
                                   underlineColorAndroid = 'transparent'
                                   returnKeyType = "search"
                                   onSubmitEditing={()=>{this.onSubmitEditing()}}
                                  // returnKeyLabel={}"请输入企业名称,人名,品牌等"
                                   onChangeText ={(text) => {this.setState({searchValue:text})}}
                        />
                        <TouchableOpacity
                            style={styles.searchDeleteButtonBox}
                            onPress={()=>{this.state.searchValue===''?this.openVioce():this.deleteSearch()}}
                        >
                            <Image style={styles.userImg} source={this.state.searchValue===''?require('../../Res/Images/yuyin.png'):require('../../Res/Images/delete.png')} />
                        </TouchableOpacity>
                    </View>
                    <View >
                        <TouchableOpacity
                            onPress={()=>{this.openSoat()}}
                            disabled={this.state.soatDisable}
                        >
                            <Text >
                               排序
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={!this.state.bluffShow&&styles.bluff}>
                    <Text>
                        {this.state.bluffData}
                    </Text>
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
                            搜索到<Text style={styles.seachResultCountTextColor}>{this.state.totalnum}</Text>家公司<Text style={styles.seachListRule}>(最多显示100条)</Text>
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
                            // getItemLayout={this._getItemLoyout}
                            ListEmptyComponent={this.state.view?<Text style={{textAlign:"center"}}>没有查询到相关数据</Text>:''}
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
                    <TouchableWithoutFeedback
                        onPress={()=>{this.setState({modal:false,textNum:0})}}
                    >
                        <View style={[styles.seachValue,this.state.modal?styles.seachValueModalYes:styles.seachValueModalNo]}
                            //  View.props.onStartShouldSetResponderCapture:{(evt)=> true }
                        >
                            <TouchableWithoutFeedback
                            >
                                <View style={styles.scrollViewContainer}>
                                    <View style={this.state.selectType === 3?styles.scrollViewInnerMore:styles.scrollViewInner}>
                                        <ScrollView
                                            showsVerticalScrollIndicator = {false}
                                        >
                                            {this.state.selectType === 3?selectTimeOrMoney:selectOptions}
                                        </ScrollView>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <TouchableWithoutFeedback
                    onPress={()=>{this.setState({soat:false})}}
                >
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
                </TouchableWithoutFeedback>
                <Modal
                transparent={true}
                visible={this.state.vioceModal}
                onRequestClose={()=>{}}
                >
                    <TouchableWithoutFeedback
                        onPress={()=>{this.setState({vioceModal:false})}}
                    >
                        <View style={styles.vioceModalStyle}>
                            <View style={styles.vioceContainer}>
                                <Text style={styles.vioceTitle}>
                                    语音识别中...
                                </Text>
                                <Image style={styles.viocingImg}  source={require('../../Res/Images/yuyinr.png')} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <MessageBox
                    ref={(obj) =>{this.alertSearch = obj}}
                    alertType = {1}
                    title={'提示'}
                    detailText={this.state.msg}
                    onClose={() => {
                    }}
                />
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
        width:'100%',
       height:60,
       flexDirection:'row',
       alignItems: 'center',
      // backgroundColor: 'blue',
        borderBottomWidth:1,
        borderBottomColor:'#F0F0F0',
    },
    seachSelectDetial:{
        flex:1,
       // backgroundColor: 'red',
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
        paddingBottom:20,
        marginBottom:10,
        backgroundColor: 'white',
    },
    seachResultListTitleRight:{
        borderWidth:1,
        borderColor:'#67c94d',
        paddingRight:4,
        paddingLeft:8,
        alignItems: 'center',
        paddingBottom:1,
        paddingTop:1,
        marginRight:10,
        borderRadius:4,
        //backgroundColor: 'blue',
    },
    seachResultListTitleRightText:{
        color:'#67c94d'
    },
    seachResultListTitle:{
        paddingLeft:20,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    seachResultListTitleText:{
        flex:1,
        fontSize: 20,
        color:'#333333',
       // backgroundColor: 'red',
    },
    seachResultListCode:{
        paddingTop:10,
        paddingLeft:20,
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
       // flex:1,
        paddingTop:10,
        flexDirection:'row',
        alignItems: 'center',
       // backgroundColor: 'red',
    },
    seachResultListMessageLeftInner:{
        flex:1,
       // paddingRight:10,
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
        flex:1,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
       // backgroundColor: 'blue',
    },
    seachResultListMessageCenterText:{
           paddingLeft:10,
           paddingRight:10,
           alignItems: 'center',
    },
    seachResultListMessageRightInner:{
        flex:1,
        alignItems: 'center',
       // backgroundColor: 'yellow',
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
          borderBottomWidth:1,
          borderBottomColor:"#f0f0f0",
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
        //height:40,
        paddingTop:6,
        paddingBottom:6,
        paddingLeft:10,
        paddingRight:10,
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
    vioceModalStyle:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(55,55,55,0.2)',
    },
    vioceContainer:{
        width:'80%',
        height:220,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.4)',
        borderRadius:8,
    },
    vioceTitle:{
        fontSize:18,
    },
    bluff:{
        display:'none',
    },
    moreButtonWrapper:{
        width:'100%',
        marginTop:56,
        alignItems:'center',
    },
    moreButton:{
        width:'90%',
        height:46,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:6,
        backgroundColor:'#1abef9'
    },
    viocingImg:{
        width:154,
        height:154
    },
    moreButtonText:{
        fontSize:16,
        color:"#ffffff"
    },
});

