import config  from '../Res/Config/Config';
import {
    Alert
} from 'react-native';
import NavigationService from '../Utils/NavigationService';
export default class getData {
    static overTime=false;
    static overtime (fetchPromise,timeout){
        let timeoutPromise = new Promise(function (resolve,reject) {
                setTimeout(() => {
                    reject(new Error('请求超时'))
                   // reject({"err":"请求超时"});
                },timeout)
        });
        return Promise.race([fetchPromise,timeoutPromise])
    }
    // static get(url,params,callback,time){//说明:当调用get方法时如果不需要params请用''表示;
    //     let geturl;
    //     if (time) {
    //         time = time;
    //     }else {
    //         time = 15000;
    //     }
    //     if(params){
    //         let paramsArry = [];
    //         Object.keys(params).forEach(key => paramsArry.push(key + '=' +params[key]));
    //         if (url.search(/\?/) === -1){
    //              geturl=ip+url+'?' + paramsArry.join('&')
    //         } else{
    //             geturl=ip+url+'&' + paramsArry.join('&')
    //         }
    //     }else{
    //         geturl = ip+url;
    //     }
    //     console.log(geturl);
    //     this.overtime(fetch(geturl,{
    //         method:'GET',
    //         headers:{
    //
    //         }
    //     }),time)
    //         .then((response) =>{
    //            return response.json();
    //         })
    //         .then((responseJson) =>{
    //             callback(responseJson);
    //         })
    //         .catch(function(error){
    //             console.log(error);
    //         })
    // }
    static fetchData(url,params,callback,time,encoding){
        let getUrl,getUrlName,getTime,getEncoding;
        String.prototype.trim = function () {
           // return this.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g,"");
            return this.replace(/\s+/g,"");
        };
        if (time) {
            getTime = time;
        }else {
            getTime = config.timeout;
        }
        if (encoding) {
            getEncoding = encoding;
        }else {
            getEncoding = config.defaultEncoding;
        }
        getUrlName = url.trim();
        if (getUrlName.slice(0,1) === '/'){
            getUrlName = getUrlName.slice(1);
        }
        getUrl =  config.ip + config.path + getUrlName + config.fileType;
        //console.log(getUrl);
        if (params.bankId===undefined&&params.userId===undefined){
            params["bankId"] = config.bankId;
            params["userId"] = config.userId;
        }
        console.log(params);
        this.overtime(fetch(getUrl,{
            method:'POST',
            headers:{
                 'content-type':'application/json;charset='+getEncoding
            },
            body:JSON.stringify(params)
        }),getTime)
            .then((response) =>{
               // console.log(response);
                return response.json();
            })
            .then((responseJson) =>{
                console.log(responseJson);
                callback(responseJson);
                // if (responseJson.code == 1){
                //     NavigationService.navigator('Login')
                // }
            })
            .catch((error) => {
                let err = {
                    //"errorMsg":"http访问异常",
                    "success":false
                };
                callback(err);
                console.log(error.message);
                //Alert.alert('提示','对方答复')
            })
    }
}