import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    SectionList,
    ListView,
    ScrollView,
    LayoutAnimation
} from 'react-native';


export default class CommonExpandableList extends Component {


    static navigationOptions = ({ navigation }) => {
        return {
            title: '详情',
            headerTitleStyle: {
                textAlign: 'center',
                alignSelf: 'center',
                flex:1,
            },
            headerRight: (<View></View>)
        }
    };


    constructor(props){
        super(props);
        this.state = {
            groupStatus: this._getInitialGroupStatus()
        };
        this.closeAll = this.closeAll.bind(this);
        this.toggleGroupStatus = this.toggleGroupStatus.bind(this);
        this._supportFlatList = this._supportFlatList.bind(this);
        this._renderFlatListItem = this._renderFlatListItem.bind(this);
        this._renderListViewItem = this._renderListViewItem.bind(this);
        this._renderUsingView = this._renderUsingView.bind(this);
        this._renderUsingFlatList = this._renderUsingFlatList.bind(this);
        this._renderUsingListView = this._renderUsingListView.bind(this);




    }
    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    };
    _supportFlatList() {
        return !!FlatList;
    };

    _getInitialGroupStatus() {
        //判断用户是否传递了判断是否展开的数组
        const {initialOpenGroups = [], data = []} = this.props;
        return new Array(data.length)
            .fill(false)
            .map((item, index) => {
                return initialOpenGroups.indexOf(index) !== 1;
            });
    };

    closeAll() {
        this.setState({
            groupStatus: this.state.groupStatus.map(() => false)
        });
    };

    toggleGroupStatus(index, closeOthers) {
        // closeOthers 是可选的，如果为true，则所有组状态联动
        const newGroupStatus = this.state.groupStatus.map((status, idx) => {
            return idx !== index
                ? (closeOthers ? false : status)
                : !status;
        });
        this.setState({
            groupStatus: newGroupStatus
        });
    }


    _renderGroupItem(groupItem, groupId) {
        const status = this.state.groupStatus[groupId];
        const {groupHeaderData = [], groupListData = []} = groupItem;
        const {renderGroupHeader, renderGroupListItem, groupStyle, groupSpacing} = this.props;

        const groupHeader = renderGroupHeader && renderGroupHeader({
            status,
            groupId,
            item: groupHeaderData,
            toggleStatus: this.toggleGroupStatus.bind(this, groupId)
        });
        const groupBody = groupListData.length > 0 && (
            <ScrollView bounce={false} style={!status && {height: 0}}>
                {groupListData.map((listItem, index) =>(
                    <View key={`gid:${groupId}-rid:${index}`}>
                        {renderGroupListItem && renderGroupListItem({
                            item: listItem,
                            rowId: index,
                            groupId
                        })}
                    </View>
                ))}
            </ScrollView>
        );
        return(
            <View
                key={`group-${groupId}`}
                style={[groupStyle, groupId && groupSpacing && {marginTop: groupSpacing}]}
            >
                {groupHeader}
                <View style={{height:1}}>
                </View>
                {groupBody}
            </View>
        )
    }
    _renderFlatListItem({item, index}) {
        return this._renderGroupItem(item, index)
    }
    _renderListViewItem(rowData, groupId, rowId) {
        return this._renderGroupItem(rowData, parseInt(rowId))
    }

    _renderUsingFlatList() {
        const {data = [], style} = this.props;

        return (
            <FlatList
                data={data}
                style={style}
                extraData={this.state}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item,index) => index}
                renderItem={this._renderFlatListItem}
            />
        )
    }

    _renderUsingView() {
        const {data = [], style} = this.props;

        return (
            <View style={style}>
                {data.map((item, groupId) => {
                    return this._renderGroupItem(item, groupId)
                })}
            </View>
        )
    }

    _renderUsingListView() {
        const {data = [], style} = this.props;

        return (
            <ListView
                style={style}
                showsVerticalScrollIndicator={false}
                renderRow={this._renderListViewItem}
                dataSource={new ListView.DataSource({
                    rowHasChanged: (r1, r2) => r1 !== r2
                }).cloneWithRows(data)}
            />
        )
    }
    render(){
        const strategy = {
            'View': this._renderUsingView,
            'ListView': this._renderUsingListView,
            'FlatList': this._supportFlatList() ? this._renderUsingFlatList : this._renderUsingListView,
        }

        //设置默认选项
        let {implementedBy} = this.props;
        if (!strategy[implementedBy]) {
            implementedBy = 'FlatList'
        }

        return strategy[implementedBy]()
    };



}

