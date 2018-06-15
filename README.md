本目录不要提交版本


##App文件夹结构


- Routers\Routers.js
      入口文件

- Common
      公共组件文件夹

- Fetch
      负责网络请求和本地储存文件夹

- Pages
      页面类，内部一个页面一个文件夹

- Res
      静态资源类，包括 本地json数据，图片，样式

- Utils
      工具类

- Routers
      路由文件

------------------

###组件

##### CommonSudoku（九宫格）
- 属性
     **data**（必写）：为九宫格渲染的数据，格式必须为数组，注意排序，是按顺序渲染为静态图标的
     例如：
     ```
    [
        {"name": "裁判文书", "hasData": "list"},
        {"name": "失信记录", "hasData": "false"},
        {"name": "涉诉信息", "hasData": "detail"},
    ]
	 ```
     **images**（必写）：由require图标命令组成的数组，格式必须为数组，注意排序，是按顺序渲染为静态图标的
     例如：
     ```
    [
        require('../../Res/Images/icon1.png'),
        require('../../Res/Images/icon2.png'),
        require('../../Res/Images/icon3.png'),
    ]
	 ```
     **onPressFn**（二选一必写）：为九宫格添加的通用点击函数，例如路由跳转至列表页或搜索页等
     **onPressFnDetail**（二选一必写）：为九宫格添加的特殊点击函数（特指跳转至详情页），例如路由跳转等
     **onPressFnMore**（选写）：为九宫格中的“更多（全部）”这一元素添加点击函数，如果没有则不写
     **headerName**（选写）：九宫格的头部标签栏显示的字符，如果不写则没有头部标签栏

	**DEMO**:
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

