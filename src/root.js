import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
    Animated,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import reducer from './reducers';
import { Actions } from 'react-native-router-flux';
import ViewPager from 'react-native-viewpager';
import Menu from './components/menu';
import Global from './global';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded
} from 'react-native-admob';


class Root extends Component {

    painterView(painter) {
        return (
            <View key={painter.id + "_wrap_touch_painter"}>
                <TouchableOpacity style={{flex: 1}}
                    key={painter.id + "_touch_painter"}
                    onPress={() => Actions.profile({painter})}>
                    <View key={painter.id + "_painter_view"}>
                        <Image
                            source={{uri: Global.BASE_URL + painter.portrait}}
                            style={styles.painter_image}
                            key={painter.id} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    _renderPage(data: Object) {
        return (
            <TouchableOpacity style={{flex: 1}}
                key={data.id + "_touch_painter"}
                onPress={() => Actions.detail({art_work: data})}>
                <Image source={{uri: Global.BASE_URL + data.art_work}} style={styles.page} />
            </TouchableOpacity>
        );
    }

    render() {
        var views = [];
        if (this.props.painters.length > 0) {
            views.push(
                this.painterView(this.props.painters[0]),
                this.painterView(this.props.painters[2]),
                this.painterView(this.props.painters[1]),
                this.painterView(this.props.painters[3]),
            )
        }

        var dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });

        return (
            <View style={{flex: 1}}>
                <ScrollView style={{flex: 1, paddingTop: 40}}>
                    <View style={{flex: 1, marginTop: 15}}>
                        <Image
                            source={require('./assets/images/wwa_main.jpg')}
                            style={styles.main_image} />
                    </View>

                    <View style={{flex: 1, alignItems: 'center', marginTop: 50}}>
                        <Text style={styles.label}>Pickup Painters</Text>
                        <Image
                            source={require('./assets/images/line2.png')}
                            style={{marginTop: 2, marginBottom: 20}} />
                    </View>

                    <View style={styles.wrap_painters_view}>
                        {views}
                    </View>


                    <View style={{flex: 1, alignItems: 'center', marginTop: 50}}>
                        <Text style={styles.label}>Today's pickup</Text>
                        <Image
                            source={require('./assets/images/line2.png')}
                            style={{marginTop: 2, marginBottom: 20}} />
                    </View>

                    <View style={styles.wrap_art_works_view}>
                        <ViewPager
                            dataSource={dataSource.cloneWithPages(this.props.art_works_today)}
                            renderPage={this._renderPage}
                            isLoop={true}
                            autoPlay={true}/>
                    </View>

                    <AdMobBanner
                        bannerSize="smartBannerPortrait"
                        adUnitID={Global.AD_UNIT_ID}
                        testDeviceID={Global.TEST_DEVICE}
                        didFailToReceiveAdWithError={this.bannerError} />

                    <View style={{marginTop: 40}}></View>
                </ScrollView>
                <Menu />
            </View>
        );
    }
}

function mapStateToProps(state) {
    if (state) {
        return {
            painters: state.painters,
            art_works_today: state.art_works_today
        }
    } else {
        return { painters: [], art_works_today: [] }
    }
}

export default connect(mapStateToProps)(Root);

const styles= StyleSheet.create({
    main_image: {
        resizeMode: 'contain',
        width: Global.DEVICE_WIDTH,
        height: Global.DEVICE_WIDTH*0.75
    },

    painter_image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },

    painter_name: {
        textAlign: 'center',
        marginTop: 5,
        color: '#606060'
    },

    wrap_painters_view: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 18,
        paddingRight: 18
    },

    wrap_art_works_view: {
        flex: 1,
        marginBottom: 80,
        paddingLeft: 20,
        paddingRight: 20
    },

    label: {
        color: '#B88743',
        ...Platform.select({
            ios: {
                fontFamily: 'Iowan Old Style'
            },
            android: {
                fontFamily: 'serif'
            }
        }),
        fontSize: 20,
        backgroundColor: 'transparent'
    },

    page: {
        width: Global.DEVICE_WIDTH - 80,
        height: 300,
        marginRight: 20,
        marginLeft: 20
    },
})
