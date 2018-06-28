本目录不要提交版本


##App文件夹结构
```
App
|--Routers\Routers.js(入口文件)
|--Common(公共组件文件夹)
|--Fetch(负责网络请求和本地储存文件夹)
|--Pages(页面类，内部一个页面一个文件夹)
|--Res(静态资源类，包括 本地json数据，图片，样式)
|--Utils(工具类)
|--Routers(路由文件)
```


------------------

###组件

##### CommonSudoku（九宫格）
- 属性

| 属性名称 | 是否必选 | 格式类型 | 默认 | 描述|
|--------|--------|
|data|是|array|无|为九宫格渲染的数据，注意排序，是按顺序渲染为静态图标的|
|images|是|array|无|由require图标命令组成的数组，注意排序，是按顺序渲染为静态图标的|
|onPressFn|是|function|无|为九宫格添加的通用点击函数，例如路由跳转至列表页或搜索页等|
|onPressFnMore|否|function|无|为九宫格中的“更多（全部）”这一元素添加点击函数，如果没有则不写|
|headerName|否|string|无|九宫格的头部标签栏显示的字符，如果不写则没有头部标签栏|

- data
     示例:
 ```
[
    {"name": "裁判文书", "hasData": "list"},
    {"name": "失信记录", "hasData": "false"},
    {"name": "涉诉信息", "hasData": "detail"},
]
 ```
- images
     示例:
 ```
[
    require('../../Res/Images/icon1.png'),
    require('../../Res/Images/icon2.png'),
    require('../../Res/Images/icon3.png'),
]
 ```

- 示例:
````
import CommonSudoku from "./CommonSudoku"
return (
    <CommonSudoku
        data={data}
        images={images}
        onPressFnList={this._onPressFnList.bind(this)}
        onPressFnMore={this._onPressFnMore.bind(this)}
        headerName={title}
    />
)
````
##### Fetch
- 引入方法`import Fetch from '../../../fetch/DataFactories';`

- 引入方法后使用`Fetch.fetchData(url,params,callback,time,encoded);`


-  可传参数介绍
| 属性名称 | 是否必选 | 格式 | 描述 |
|--------|--------|
|url|是|string|要访问的接口文件名 如 demo;后缀名不需要输入,默认后缀名.do|
|params|是|json|在 body 中传给后台的参数 为json对象 如{"username":"sdvsdv"},如果没有可传参数请设置为{}空对象|
|callback|是|function|获取接口返回数据的回调函数(建议为箭头函数)|
|time|否|number|设置超时时间 默认为15000 (一般情况下不用单独设置)|
|encoded|否|string|编码类型 默认 utf-8 (一般情况下不用单独设置)|


- 示例:
 ```
   Fetch.fetchData('demo',{},(res) => {
        console.log(res);
    },10000,'UTF-8')
 ```

#####CornerLabel(图标标签)
- 属性
| 名称 | 格式类型 | 是否必选 | 默认 | 描述 |
|--------|--------|
|alignment|string|是|'left'|标签显示的位置(左右)|
|cornerRadios|number|否||标签现实的位置(角半径)|
|style|style|是||标签样式|
|textStyle|style|是||标签内字符样式|
-示例
```
    <CornerLabel
        cornerRadius={54}
        alignment={'right'}
        style={{backgroundColor:'red', height: 24,}}
        textStyle={{color: '#fff', fontSize: 12,}}
        >
        未开放
    </CornerLabel>
```

#####CommonExpandableList(可折叠列表)
- 属性
| 名称 | 格式类型 | 是否必选 | 默认 | 描述 |
|--------|--------|
|data|array|是||为CommonExpandableList中的数据，数组中每个对象由groupHeaderData和groupListData构成|
|style|object|是||作用在CommonExpandableList上的样式|
|groupStyle|object|是||作用在每个group上的样式|
|groupSpacing|number|否|0|group之间的间隙|
|implementedBy|string|否|'FlatList'|组件实现的方式，一共有'View','ListView','FlatList'三种方式可选|
|renderGroupHeader|function|是||渲染GroupHeader的方法|
|renderGroupListItem|function|是||渲染GroupListItem的方法|
- 示例
 ```
   <CommonExpandableList
		data={xxx}
        style={xxx}
        groupStyle={xxx}
        groupSpacing={xxx}
        implementedBy={xxx}
        renderGroupHeader={xxx}
        renderGroupListItem={xxx}
   >
 ```