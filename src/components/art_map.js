import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    Image,
    Animated,
    Dimensions,
    TouchableOpacity,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions'
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';
import Global from '../global';

const initialRegion = {
    latitude: 48.8587737,
    longitude: 2.2071322,
    latitudeDelta: 12,
    longitudeDelta: 12
}


class ArtMap extends Component {

    _renderMarkerView(art_work) {
        if (Platform.OS == "android") {
            return (
                <MapView.Marker
                    key={"map_pin_" + art_work.id}
                    coordinate={{
                        latitude: art_work.latitude,
                        longitude: art_work.longitude
                    }}
                    title={art_work.name}
                    pinColor={'#3588F2'}
                    onPress={() => this._setArtWorkOnViewer(art_work)}
                />
            )
        } else {
            return (
                <MapView.Marker
                    key={"map_pin_" + art_work.id}
                    coordinate={{
                        latitude: art_work.latitude,
                        longitude: art_work.longitude
                    }} >
                    {this._renderImagePinView(art_work)}
                </MapView.Marker>
            )
        }
    }

    _renderImagePinView(art_work) {
        return (
            <TouchableOpacity
                key={art_work.id + "_touch_art_work"}
                onPress={() => Actions.detail({art_work})}>
                <Image
                    source={{uri: Global.BASE_URL + art_work.art_work}}
                    style={{height: 70, width: 90 }} />
            </TouchableOpacity>
        )
    }

    _setArtWorkOnViewer(art_work) {
        this.setState({viewerArtWork: art_work})
    }

    _renderViewer() {
        if (this.state && this.state.viewerArtWork) {
            var art_work = this.state.viewerArtWork;
            return (
                <View style={styles.viewer}>
                    <Image source={require('../assets/images/wall_alpha.jpg')} style={styles.backgroundImage}>
                        <TouchableOpacity
                            key={this.state.viewerArtWork.id + "_touch_art_work"}
                            onPress={() => Actions.detail({art_work})}>
                            <Image
                                source={{uri: Global.BASE_URL + this.state.viewerArtWork.art_work}}
                                style={styles.artWorkImage} />
                            <Text style={styles.artWorkName}>
                                {this.state.viewerArtWork.name}
                            </Text>
                        </TouchableOpacity>
                    </Image>
                </View>
            )
        }
    }

    render() {
        var views = [];
        if (this.props.all_art_works.length > 0) {
            this.props.all_art_works.map(art_work => {
                if (art_work.latitude && art_work.longitude) {
                    views.push(this._renderMarkerView(art_work))
                }
            })
        }
        var viewer = this._renderViewer();

        return(
            <View style={{flex: 1}}>
                <MapView
                    style={styles.map_position}
                    initialRegion={initialRegion} >
                    {views}
                </MapView>
                {viewer}
            </View>
        )
    }
}

function mapStateToProps(state) {
    if (state) {
        return {
            all_art_works: state.all_art_works
        }
    } else {
        return {
            all_art_works: []
        }
    }
}

export default connect(mapStateToProps)(ArtMap);

const styles = StyleSheet.create({
    ...Platform.select({
        ios: {
            map_position: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }
        },
        android: {
            map_position: {
                flex: 3,
                width: Global.DEVICE_WIDTH,
                height: Global.DEVICE_WIDTH*0.8
            }
        }
    }),

    viewer: {
        flex: 2,
        width: Global.DEVICE_WIDTH,
        height: Global.DEVICE_WIDTH*0.2
    },

    artWorkImage: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        width: Global.DEVICE_WIDTH-100,
        marginTop: 15,
        marginBottom: 15,
    },

    artWorkName: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'serif'
    },

    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: Global.DEVICE_WIDTH
        //resizeMode: 'cover', // or 'stretch'
    },

})
