import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    Image,
    Easing
} from 'react-native'

export default class DetailSectionHeader extends Component {


    constructor(props) {
        super(props);
        this.state = {
            rotateValue:new Animated.Value(0),
        }
    }

    handlerSectionHeader = (info) => {
        this.props.handlerSectionHeader(info);
        if (info.section.show) {
            this.state.rotateValue.setValue(180);
            Animated.timing(this.state.rotateValue, {
                toValue: 0,
                duration: 400,
                easing: Easing.linear
            }).start(); // 开始 spring 动画
        }else {
            this.state.rotateValue.setValue(0);
            Animated.timing(this.state.rotateValue, {
                toValue: 180,
                duration: 400,
                easing: Easing.linear
            }).start(); // 开始 spring 动画
        }
    };

    render() {
        const {info} = this.props;
        return(
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.handlerSectionHeader(info)}
                    style={styles.subView}
                >
                    <Text style={styles.txt}>
                        {info.section.key}
                    </Text>
                        <Animated.Image
                            style={
                                [styles.image,
                                {transform:
                                    [{rotate:
                                        this.state.rotateValue.interpolate({
                                            inputRange: [0, 180],
                                            outputRange: ['0deg', '180deg']
                                        })
                                    }]
                                }
                            ]}
                            source={require('../Res/Images/top_arrow.png')}
                        >
                        </Animated.Image>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
    },
    subView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    image: {
        width: 16,
        height: 16,
        marginLeft: 25,
    },
    txt: {
        fontSize: 18,
        color: '#333333',
    }
});