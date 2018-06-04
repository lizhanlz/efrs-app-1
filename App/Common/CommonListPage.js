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
const REQUEST_URL = 'fygg';//请求的分页json文件
const DetailPage = 'Detail';//点击跳转的下一个页面
let totalPage =3;//数据总页数
let pageNo = 1;//当前第几页

export default class CommonListPage extends Component{

    constructor(props){
        super(props);
        thiz=this;
        this.state = {
            data:[],//存储列表数据
            showFoot:2,
            refreshing:false,//当前的刷新状态
        };
    }

    render(){
        const { state: {params}} = this.props.navigation;

        return(
            <View >
                <FlatList
                    data={this.state.data.data}

                    initialNumToRender={this.initialNumToRender}
                    keyExtractor={this._keyExtractor}
                    renderItem={this.getView}//渲染每一条记录

                    //ListHeaderComponent={this.header}//头部
                    ListFooterComponent={this.footer.bind(this)}//尾部

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


        //json数据前4个字段，循环生成列表
        let arr=[];
        for(let i=0;i<4;i++){
            arr.push(
                <Text key={i} style={styles.key}>{Object.keys(item)[i]}:
                    <Text style={styles.value}>   {Object.values(item)[i]}
                    </Text>
                </Text>
            );
        }

        return(
            //this的作用域需要重新指定为thiz
            <View style={styles.container}>
                <View style={styles.item}>{arr}</View>
                <TouchableOpacity activeOpacity={0.5}
                                  onPress={() => thiz.props.navigation.navigate(DetailPage, {info: item})}>
                    <Image source={require('../Res/Images/arrow.png')}
                           style={styles.arrow}
                    /></TouchableOpacity>


            </View>
        );
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
            return(
                <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>没有更多数据了</Text>
                </View>
            );
        }
        else if (this.state.showFoot === 0){
            return(
                <View style={styles.footer}>
                    <ActivityIndicator/>
                    <Text>正在加载更多数据</Text>
                </View>
            );
        }
        else if(this.state.showFoot===2){
            return(
                <View style={styles.footer}><Text></Text></View>
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
        if((pageNo!=1)&&(pageNo>=totalPage)){
            return;
        }else{
            pageNo++;
        }

        //底部显示正在加载更多数据
        this.setState({showFoot:0});
        //获取分页数据
        this.requestPageData();
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


    //请求全量数据
    /*    requestAllData=()=>{
            Fetch.fetchData(REQUEST_URL,{},function(res) {
                //this的作用域需要重新指定为thiz
                thiz.setState({
                    data:res,
                    refreshing:false,
                })
            })
        }*/
    //请求上拉加载数据
    requestPageData=()=>{

        Fetch.fetchData(REQUEST_URL+pageNo,{},function(res) {
            let foot = 0;
            if(pageNo>=totalPage){
                foot =1;//底部显示没有更多数据
            }
            //上拉加载的新数据push进原数据数组
            const getNewData =(res)=>{
                console.log(1)
                let olddata = thiz.state.data;
                for(var i = 0;i< res.data.length;i++)
                {
                    olddata.data.push(res.data[i]);

                }
                return olddata
            }
            const newData = getNewData(res)

            //this的作用域需要重新指定为thiz
            thiz.setState({
                data:newData,

                refreshing:false,
                showFoot:foot,
            });
            console.log(thiz.state.data);

        })
    }
    //请求下拉刷新数据
    requestRefreshData=()=>{
        pageNo=1;
        Fetch.fetchData(REQUEST_URL+pageNo,{},function(res) {
            let foot = 0;
            if(pageNo>=totalPage){
                foot =1;//底部显示没有更多数据
            }
            //this的作用域需要重新指定为thiz
            thiz.setState({
                data :null,
                data:res,
                refreshing:false,
                showFoot:foot,
            });

        })
    }
    //第一次加载数据
    componentDidMount(){
        //第一次请求后端数据
        this.requestRefreshData();

    }

}

const styles =StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 8,
        alignItems:'center',
        justifyContent:'center',
    },
    item: {
        flex:1,
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent:'center',

    },
    value: {
        fontSize: 14,
        marginTop: 10,
        marginBottom: 10,
        color:'#9e9e9e',
        marginLeft: 10,
    },
    key: {
        fontSize: 15,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        color:'#333333',
    },
    arrow: {
        width:13,
        height:22,
        marginRight:30,

    },
    footer:{
        flexDirection:'row',
        height:24,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:8,
    }
});