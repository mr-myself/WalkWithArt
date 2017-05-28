import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    Image,
    TouchableOpacity,
    Animated,
    Dimensions,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import {
    Actions,
} from 'react-native-router-flux';
import Menu from './menu';
import Global from '../global';
import { AdMobBanner } from 'react-native-admob';


class ListWorks extends Component {

    _renderWorkView(art_work, index) {
        return (
            <View style={styles.wrap_view} key={'art_work_view_' + index}>
                <TouchableOpacity key={art_work.id + "_touch_art_work"} onPress={() => Actions.detail({art_work})}>
                    <Image
                        style={styles.art_work}
                        source={{uri: Global.BASE_URL + art_work.art_work}}
                        key={index}
                        resizeMode={Image.resizeMode.contain}
                    />
                    <Text style={styles.art_work_name} key={'art_work_name_' + index}>{art_work.name}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _admobBanner(index) {
        return (
            <View style={styles.admob_wrap_view} key={'admob_banner_' + index}>
                <AdMobBanner
                    bannerSize="mediumRectangle"
                    adUnitID={Global.AD_UNIT_ID}
                    testDeviceID={Global.TEST_DEVICE}
                    didFailToReceiveAdWithError={this.bannerError}
                    admobDispatchAppEvent={this.adMobEvent} />
            </View>
        )
    }

    render() {
        var views = [];
        if (this.props.all_art_works.length > 0) {
            this.props.all_art_works.map((art_work, i) => {
                views.push(this._renderWorkView(art_work, i))

                if (i != 0 && i%10 == 0) {
                    views.push(this._admobBanner(i))
                }
            })
        }

        return (
            <Image source={require('../assets/images/wall_alpha.jpg')} style={{flex: 1, width: Global.DEVICE_WIDTH}}>
                <ScrollView style={{flex: 1, paddingTop: 40}}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={styles.label}>Works</Text>
                        <Image source={require('../assets/images/line2.png')} style={{marginTop: 2}} />
                    </View>
                    <View style={{marginBottom: 70}}>
                        {views}
                    </View>
                </ScrollView>
                <Menu />
            </Image>
        )
    }
}

function mapStateToProps(state) {
    return { all_art_works: state.all_art_works }
}

export default connect(mapStateToProps)(ListWorks);


const styles = StyleSheet.create({

    wrap_view: {
        flex: 1,
        marginTop: 40,
        marginBottom: 40,
        paddingRight: 15,
        paddingLeft: 15,
        width: Global.DEVICE_WIDTH
    },

    admob_wrap_view: {
        flex: 1,
        marginTop: 40,
        marginBottom: 40,
        justifyContent: 'center',
        flexDirection: 'row',
    },

    art_work_name: {
        ...Platform.select({
            ios: {
                fontFamily: 'Iowan Old Style'
            },
            android: {
                fontFamily: 'serif'
            }
        }),
        fontSize: 18,
        backgroundColor: 'transparent',
        textAlign: 'center',
        color: '#606060',
        marginTop: 10
    },

    art_work: {
        width: Global.DEVICE_WIDTH-30,
        height: (Global.DEVICE_WIDTH*0.8)
    },

    label: {
        ...Platform.select({
            ios: {
                fontFamily: 'Iowan Old Style'
            },
            android: {
                fontFamily: 'serif'
            }
        }),
        color: '#B88743',
        fontSize: 20,
        backgroundColor: 'transparent',
    },
})
