import config  from '../Res/Config/Config';
export default class getData {
    static overtime (fetchPromise,timeout){
        let timeoutPromise = new Promise(function (resolve,reject) {
                setTimeout(() => {
                    reject(new Error('请求超时！'))
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
    static fetchData(url,params,callback,time,encoded){
        let getUrl,getUrlName,getTime,getEncoded;
        String.prototype.trim = function () {
           // return this.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g,"");
            return this.replace(/\s+/g,"");
        }
        if (time) {
            getTime = time;
        }else {
            getTime = config.timeout;
        }
        if (encoded) {
            getEncoded = encoded;
        }else {
            getEncoded = config.encoded;
        }
        if (url.indexOf(" ") == -1&&url.slice(0,1) != '/'){
            getUrlName = url;
        } else if (url.indexOf(" ") == -1) {
            if (url.slice(0,1) == '/'){
                getUrlName = url.slice(1);
            }
        } else if(url.indexOf(" ") != -1){
            console.log(url.trim());
            if (url.trim().slice(0,1) == '/'){
                getUrlName = url.trim().slice(1);
            }
            //  console.log(getUrlName);
        }
       getUrl =  config.ip + config.path + getUrlName + config.fileType;
       console.log(typeof getUrl);
        this.overtime(fetch(getUrl,{
            method:'POST',
            headers:{
                'content-type':'application/json;charset='+getEncoded
            },
            body:JSON.stringify(params)
        }),getTime)
            .then((response) =>{
                return response.json();
            })
            .then((responseJson) =>{
                callback(responseJson);
            })
            .catch((error) => {
                console.log(error);
            })
    }
}