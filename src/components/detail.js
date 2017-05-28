import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    Image,
    Dimensions,
    Animated,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import Global from '../global';
import { AdMobBanner } from 'react-native-admob'


class Detail extends Component {

    basicInformationView() {
        return (
            <View style={styles.basic_information}>
                <Text style={styles.art_work_name}>{this.props.art_work.name}</Text>
                <Text style={styles.painter_name}>{this.props.art_work.painter_name}</Text>
            </View>
        )
    }

    locationView() {
        if (this.props.art_work.location) {
            return (
                <View style={styles.content_section}>
                    <Text style={styles.label}>Painted at</Text>
                    <Text style={styles.information}>{this.props.art_work.location}</Text>
                </View>
            )
        }
    }

    exhibitedView() {
        if (this.props.art_work.exhibited) {
            return (
                <View style={styles.content_section}>
                    <Text style={styles.label}>Exhibited at</Text>
                    <Text style={styles.information}>{this.props.art_work.exhibited}</Text>
                </View>
            )
        }
    }

    realPictureView() {
        if (!this.props.art_work.real_picture.match(/(.+)missing(.+)/)) {
            return (
                <View style={styles.content_section}>
                    <Text style={styles.label}>Picture at the place</Text>
                    <Image
                        style={styles.real_picture}
                        source={{uri: Global.BASE_URL + this.props.art_work.real_picture}} />
                </View>
            )
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{flex: 1, backgroundColor: '#DDDDDD'}}>
                    <Image
                        style={styles.art_work_image}
                        source={{uri: Global.BASE_URL + this.props.art_work.art_work}}
                        />
                    <View style={{paddingBottom: 30}}>
                        {this.basicInformationView()}
                        {this.locationView()}
                        {this.exhibitedView()}
                        {this.realPictureView()}
                    </View>
                </ScrollView>

                <AdMobBanner
                    bannerSize="smartBannerPortrait"
                    adUnitID={Global.AD_UNIT_ID}
                    testDeviceID={Global.TEST_DEVICE}
                    didFailToReceiveAdWithError={this.bannerError} />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return { state }
}

export default connect(mapStateToProps)(Detail);

const styles = StyleSheet.create({
    art_work_image: {
        width: Global.DEVICE_WIDTH,
        height: Global.DEVICE_WIDTH*0.8,
        resizeMode: 'contain',
        marginTop: 15
    },

    basic_information: {
        paddingTop: 5,
        paddingBottom: 15,
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor: '#ffffff'
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
        textAlign: 'center',
        marginTop: 5,
        fontSize: 25,
        color: '#606060',
        fontWeight: 'bold',
        fontStyle: 'italic',
    },

    painter_name: {
        ...Platform.select({
            ios: {
                fontFamily: 'Iowan Old Style'
            },
            android: {
                fontFamily: 'serif'
            }
        }),
        fontSize: 15,
        textAlign: 'right',
        marginRight: 60
    },

    content_section: {
        backgroundColor: '#ffffff',
        marginTop: 15,
        marginRight: 10,
        marginLeft: 10,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
    },

    label: {
        fontSize: 12,
    },

    information: {
        ...Platform.select({
            ios: {
                fontFamily: 'Iowan Old Style'
            },
            android: {
                fontFamily: 'serif'
            }
        }),
        fontSize: 18,
        color: '#606060',
    },

    real_picture: {
        width: Global.DEVICE_WIDTH*0.7,
        height: Global.DEVICE_WIDTH*0.7,
        marginTop: 10
    }
})
