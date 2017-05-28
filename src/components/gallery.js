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
import { Actions } from 'react-native-router-flux';
import Menu from './menu';
import Global from '../global'
import { AdMobBanner } from 'react-native-admob'


class Gallery extends Component {

    componentWillMount() {
        this.props.dispatch(actions.fetchArtWorks(this.props.painter.id))
    }

    _renderWorkView(art_work, index) {
        return (
            <View style={{flex: 1}} key={'art_work_view_' + index}>
                <TouchableOpacity key={art_work.id + "_touch_art_work"} onPress={() => Actions.detail({art_work})}>
                    <Image
                        style={(index == this.props.art_works.length-1) ? styles.last_art_work_image : styles.art_work_image}
                        source={{uri: Global.BASE_URL + art_work.art_work}}
                        key={index}
                        resizeMode={Image.resizeMode.contain}
                    />

                    <View style={styles.information_card}>
                        <Text key={'painter_name_' + index} style={styles.painter_name}>{this.props.painter.name}</Text>
                        <Text key={'art_work_name_' + index} style={styles.art_work_name}>{art_work.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    _admobBanner() {
        return (
            <View style={{flex: 1, marginLeft: 100}} key={'admob_banner'}>
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
        if (this.props.art_works.length > 0) {
            this.props.art_works.map((art_work, i) => {
                views.push(this._renderWorkView(art_work, i))
            })
            views.push(this._admobBanner())
        }

        return (
            <Image source={require('../assets/images/wall_alpha.jpg')} style={styles.backgroundImage}>
                <Text style={styles.background_painter_name}>{this.props.painter.name}</Text>
                <ScrollView horizontal={true} contentContainerStyle={{flexGrow: 1}} style={{flex: 1}}>
                    <View style={styles.wrap_view}>{views}</View>
                </ScrollView>
                <Menu />
            </Image>
        )
    }
}

function mapStateToProps(state) {
    return { art_works: state.art_works }
}

export default connect(mapStateToProps)(Gallery);

const styles = StyleSheet.create({
    last_art_work_image: {
        width: 300,
        height: 300,
    },

    art_work_image: {
        width: 300,
        height: 300,
        marginRight: 100
    },

    scroll_view: {
        flex: 1,
        flexDirection: 'column',
    },

    wrap_view: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 40,
        paddingRight: 80,
        marginTop: -20
    },

    backgroundImage: {
        flex: 1,
        width: Global.DEVICE_WIDTH
        //resizeMode: 'cover', // or 'stretch'
    },

    information_card: {
        width: 200,
        backgroundColor: '#ffffff',
        padding: 15,
        marginLeft: 50,
        marginTop: 20
    },

    painter_name: {
        fontSize: 12,
        ...Platform.select({
            ios: {
                fontFamily: 'Iowan Old Style'
            },
            android: {
                fontFamily: 'serif'
            }
        }),
    },

    art_work_name: {
        marginTop: 5,
        fontSize: 18
    },

    background_painter_name: {
        color: '#886506',
        fontStyle: 'italic',
        fontSize: 40,
        position: 'absolute',
        top: 45,
        left: 30,
        backgroundColor: 'transparent',
        ...Platform.select({
            ios: {
                fontFamily: 'Iowan Old Style'
            },
            android: {
                fontFamily: 'serif'
            }
        }),
    }
})
