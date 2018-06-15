import {NavigationActions} from 'react-navigation';
let _navigator;
function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
    console.log(_navigator);
}
function navigator(routername,params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName:routername,
            params:params
        })
    )
}

export default ({
    navigator,
    setTopLevelNavigator
})