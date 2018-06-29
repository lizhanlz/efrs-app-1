import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    Image,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import Fetch from '../Fetch/DataFactories';
const REQUEST_URL = 'jsonpost';//请求的分页json文件
const detailPage = 'Detail';//点击跳转的下一个页面
let totalPage;
let pageNo = 1;//当前第几页
let page="1";
let totalpage;
var Dimensions = require('Dimensions');
var {width,height} = Dimensions.get('window');
export default class CommonListPage extends Component{

    constructor(props){
        super(props);
        thiz=this;

        this.state = {
            data:[],//存储列表数据
            Code:"",
            Errormsg:"",
            showFoot:2,
            listtype:"1",
            datalength:0,
            refreshing:false,//当前的刷新状态

        };
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.info,
            headerTitleStyle: {
                textAlign: 'center',
                alignSelf: 'center',
                flex:1,
                color:'#333333',

            },
            headerRight: (<View></View>)
        }


    }





    render(){
        const { state: {params}} = this.props.navigation;
        console.log(this.state.data);
        return(
            <View >
                <FlatList

                    data={this.state.data}

                    initialNumToRender={this.initialNumToRender}
                    keyExtractor={this._keyExtractor}
                    renderItem={this.getView}//渲染每一条记录

                    //ListHeaderComponent={this.header}//头部
                    ListFooterComponent={this.footer.bind(this)}//尾部
                    ListEmptyComponent={this.ListEmptyComponent()}//data为空
                    //下拉刷新，必须设置refreshing状态
                    onRefresh={this.onRefresh}
                    refreshing={this.state.refreshing}

                    //上拉加载
                    onEndReachedThreshold={0.1}
                    onEndReached={this.onEndReached}

                />
            </View>
        );

    }

    getView({item}){
        //返回每个item
        let arr=[];
        let title=[];

        //判断列表显示样式，年报类还是普通类。0为普通类，1为年报类，该列表页只展示年份;2为动产抵押。

        if(thiz.state.listtype ==="1"){

            arr.push(
                <Text key={item.name}  style={styles._key}>{item.name}
                </Text>
            );
            console.log(arr);
            return(
                <TouchableOpacity activeOpacity={0.5}
                                  onPress={() => thiz.props.navigation.navigate(detailPage,{info:item,type:thiz.state.data.listtype?thiz.state.data.listtype:thiz.state.listtype})}>
                    <View style={styles.container}>
                        <View style={styles.list}>

                            <View style={styles.item}>{arr}</View>
                        </View>
                        <Image source={require('../Res/Images/arrow.png')} style={styles.arrow}
                        />
                    </View>


                </TouchableOpacity>
            );
        }
        else if(thiz.state.listtype ==="2"){
            let listvalue =Object.values(item.value);
            //for(let n =0;n<listvalue.length;n++){
            let key = Object.keys(listvalue[0]);
            let value =Object.values(listvalue[0]);
            console.log(arr);
            for(let i=0;i<3;i++){
                arr.push(
                    <Text key={'Li'+i} style={styles.key}>{key[i]}:
                        <Text style={styles.value}>  {value[i]}
                        </Text>
                    </Text>
                );

            }
            //}


        }
        else
        {
            //加标题
            for(let i=1;i<4;i++){
                arr.push(
                    <Text key={i} style={styles.key}>{Object.keys(item)[i]}:
                        <Text  style={styles.value} numberOfLines={2}>  {Object.values(item)[i]}
                        </Text>
                    </Text>
                );
            }
            title.push(
                Object.values(item)[0]
            )
            //json数据前4个字段，循环生成列表

         /*   for(let i=0;i<4;i++){
                arr.push(
                    <Text key={i} style={styles.key}>{Object.keys(item)[i]}:
                        <Text  style={styles.value}>  {Object.values(item)[i]}
                        </Text>
                    </Text>
                );
            }*/
            return(
                <TouchableOpacity activeOpacity={0.5}
                                  onPress={() => thiz.props.navigation.navigate(detailPage,{info:item,type:thiz.state.data.listtype?thiz.state.data.listtype:thiz.state.listtype})}>
                    <View style={styles.container}>
                        <View style={styles.list}>
                            <Text style={styles.title} numberOfLines={1}>{title}</Text>
                            <View style={styles.item}>{arr}</View>
                        </View>
                        <Image source={require('../Res/Images/arrow.png')} style={styles.arrow}
                        />
                    </View>


                </TouchableOpacity>
            );
        }

    };



    //设置每页渲染的数据条数
    initialNumToRender:10;

    //设置keyExtractor
    _keyExtractor(item,index){
        return "index"+item+index;
    }

    //footer 尾部
    footer(){
        if(this.state.showFoot === 1){
            // var flatheight= Dimensions.get('FlatList');
            return(
                //<View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                //   <Text style={{color:'black',fontSize:14,marginTop:5,marginBottom:5,}}>没有更多数据了</Text>
                //</View>
                <View ><Text></Text></View>
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
        else {
            return(
                <View style={styles.footer}><Text>{thiz.state.errorMsg}</Text></View>
            );
        }
    }
    //上拉加载方法
    onEndReached = ()=>{

        //如果是正在加载中或者没有更多数据了，返回
        if(this.state.showFoot !==0){
            return;
        }
        //如果当前页大于或者等于总页数，那就是最后一页了，返回
        if((pageNo>=totalpage)){
            this.setState({showFoot:1});
        }else{
            pageNo++;
            //底部显示正在加载更多数据
            this.setState({showFoot:0});
            //获取分页数据
            this.requestPageData();
        }


    };
    //下拉刷新方法
    onRefresh =() =>{
        //设置刷新状态为正在刷新
        this.setState({
            refreshing:true,
        },()=>{
            this.requestRefreshData();
        });

    };

    //请求上拉加载数据
    requestPageData=()=>{
        page=pageNo+"";
        Fetch.fetchData(REQUEST_URL,{"serviceKey":this.props.navigation.state.params.info,
            "bankId":"8B94459B9F1D4ECD",
            "userId":"001100807",
            "key":this.props.navigation.state.params.key,
            "page":page,
            "size":"10"},function(res) {

            totalpage=Number(res.totalpage);
            console.log(totalpage);
            //判断请求是否成功
            let respCode=res.respCode;

            if(respCode==="failed")
            {

                thiz.setState({
                    Errormsg:res.Errormsg,
                    refreshing:false,
                    showfoot:2,

                });
            }

            else{
                let foot = 0;



                //上拉加载的新数据push进原数据数组
                const getNewData =(res)=> {
                    let olddata = thiz.state.data;

                    if (res.listtype === "1" || res.listtype === "2") {
                        let SecondData = res.data;
                        let DataArr = [];
                        for (let i in SecondData) {
                            DataArr.push(
                                {
                                    name: i,
                                    value: SecondData[i],
                                }
                            );
                        }
                        for (let i = 0; i < DataArr.length; i++) {
                            olddata.push(DataArr[i]);

                        }
                        return olddata
                    }
                    else {

                        for (let i = 0; i < res.data.length; i++) {
                            olddata.push(res.data[i]);

                        }
                        return olddata
                    }
                }
                const newData = getNewData(res)

                //this的作用域需要重新指定为thiz
                thiz.setState({
                    data:newData,

                    refreshing:false,
                    showFoot:foot,

                    listtype:res.listtype,
                });
            }
        })
    }
    //请求下拉刷新数据
    requestRefreshData=()=>{
        pageNo=1;
        page="1";
        //具体请求的参数在文档里面写出，根据模块不同，配置的参数也不同。
        Fetch.fetchData(REQUEST_URL,{"serviceKey":this.props.navigation.state.params.info,
            "bankId":"8B94459B9F1D4ECD",
            "userId":"001100807",
            "key":this.props.navigation.state.params.key,
            "page":page,
            "size":"10"},function(res) {

            let respCode=res.respCode;

            if(respCode==="failed")
            {

                thiz.setState({
                    Errormsg:res.Errormsg,
                    refreshing:false,

                });
            }

            else{
                /*   totalPage=res.totalpage;

                   if(pageNo>=totalPage){
                       foot =1;//底部显示没有更多数据
                   }
                   console.log("111");
                   console.log(res);*/
                let foot = 0;
                let FirstData = res.data;
                let DataArr = [];

                if(res.listtype ==="1" || res.listtype ==="2") {
                    for (let i in FirstData) {

                        DataArr.push(
                            {
                                name: i,
                                value: FirstData[i],
                            }
                        );
                    }
                }
                else {
                    DataArr = res.data;
                }
                //this的作用域需要重新指定为thiz
                thiz.setState({
                    data:DataArr,
                    refreshing:false,
                    showFoot:foot,
                    Code:res.code,
                    listtype:res.listtype,
                });
            }
        })
    }
    //第一次加载数据
    componentWillMount(){
        //第一次请求后端数据
        //this.requestRefreshData();
        totalPage=this.props.navigation.state.params.totalpage,
        totalpage=Number(totalPage)
            //获取上级页面传来的参数
        let foot;
        console.log(this.props.navigation.state.params.data);
        if((pageNo>=totalpage)){
            foot = 1;
        }else{
            foot = 0;
        }

        let FirstData = this.props.navigation.state.params.data;
        let DataArr = [];
        if(this.props.navigation.state.params.listtype ==="1" || this.props.navigation.state.params.listtype ==="2") {
            for (let i in FirstData) {

                DataArr.push(
                    {
                        name: i,
                        value: FirstData[i],
                    }
                );
            }
        }
        else {
            if(this.props.navigation.state.params.info==="照面信息")
            {
                DataArr.push(FirstData);

            }
            else{ DataArr = this.props.navigation.state.params.data;}

        }


            thiz.setState({
                data:DataArr,
                refreshing:false,
                showFoot:foot,
                listtype:this.props.navigation.state.params.listtype,

            });

    }
    //data为空展示信息
    ListEmptyComponent(){
        if(thiz.state.listtype ==="3"){
            return <View style={styles.info}><Text style={styles.infotxt}>存在{this.props.navigation.state.params.info}行为</Text></View>
        }
     /*   else if(thiz.state.listtype ==="4"){
            return <View style={styles.info}><Text style={styles.infotxt}>该企业不存在相关记录</Text></View>
        }*/
        else{
            return <View style={styles.info}><Text style={styles.infotxt}>不存在{this.props.navigation.state.params.info}相关记录</Text></View>
        }
    }

    //错误页面显示信息判断
/*    handlerError=(code,Msg)=>{
        if(code==="400"|| code==="404"||code==="444"||code==="445"|| code==="703")
        {
            msg="没有查到满足条件的信息";

        }
        else if(code==="1314"|| code==="1315"||code==="1316"||code==="1319"||code==="0001")
        {
            msg=Msg;
        }
        else
        {
            msg="查询过程中出现异常";
        }
        console.log(msg);
        thiz.setState({
            errorMsg:msg,
            Code:code,
        });
    }*/
}

const styles =StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 5,
        alignItems:'center',

    },
    list:{
        width:width-88,

    },
    title:{
        fontSize: 16,
        marginTop: 10,
        color:'#333333',
        marginLeft: 25,

    },
    item: {
        flex:1,
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent:'center',
        marginLeft: 25,
        marginBottom:5,
    },
    key: {
        fontSize: 13,
        marginTop: 5,
        color:'#333333',
    },
    _key: {
        fontSize: 18,
        marginTop: 10,
        color:'#333333',
    },
    value: {
        fontSize: 13,
        color:'#9e9e9e',
        lineHeight:18,
    },

    arrow: {
        width:13,
        height:22,

        marginLeft:50,

    },
    arrow2: {
        width:13,
        height:22,
        marginRight:30,
        marginLeft:30,
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
    info:{
        height:height,
        alignItems:'center',
        justifyContent:'center',

    },
    infotxt:{
        fontSize:20,
    },
});