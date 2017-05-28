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
import {
    Actions
} from 'react-native-router-flux';
import Global from '../global';


class Profile extends Component {

    render() {
        const painter = this.props.painter
        return(
            <View style={{flex: 1}}>
                <Image source={require('../assets/images/wall_alpha.jpg')} style={styles.background_image} />
                <ScrollView style={{flex: 1, backgroundColor: 'transparent'}}>
                    <View style={styles.above_section}>
                        <View style={styles.painter_profile_section}>
                            <Text style={styles.painter_name}>{painter.name}</Text>
                            <Text style={styles.painter_lifespan}>{painter.lifespan}</Text>
                        </View>
                        <View style={styles.painter_image_section}>
                            <Image
                                source={{uri: Global.BASE_URL + painter.portrait}}
                                style={styles.painter_image}
                                resizeMode={Image.resizeMode.contain}
                            />
                        </View>
                    </View>

                    <View style={styles.description_section}>
                        <Text style={{color: '#303030'}}>{painter.description}</Text>
                    </View>
                </ScrollView>

                <View style={styles.to_gallery}>
                    <TouchableOpacity onPress={() => Actions.gallery({painter})}>
                        <View style={{paddingRight: 15}}>
                            <Text style={styles.to_gallery_text}>To Gallery</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return { state }
}

export default connect(mapStateToProps)(Profile);

const styles = StyleSheet.create({
    above_section: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 25,
        padding: 20,
        marginBottom: 0,
        backgroundColor: 'transparent'
    },

    background_image: {
        width: Global.DEVICE_WIDTH,
        position: 'absolute',
        top: 0,
        bottom: 0,
        ...Platform.select({
            ios: {
                resizeMode: 'repeat',
            },
        })
    },

    painter_profile_section: {
        flex: 1,
        height: 200
    },

    painter_image_section: {
        flex: 1,
    },

    painter_image: {
        height: 200
    },

    painter_name: {
        fontSize: 20,
        marginTop: 60,
        marginBottom: 5,
        fontWeight: 'bold',
        ...Platform.select({
            ios: {
                fontFamily: 'Iowan Old Style'
            },
            android: {
                fontFamily: 'serif'
            }
        }),
    },

    painter_lifespan: {
        color: '#606060',
        ...Platform.select({
            ios: {
                fontFamily: 'Iowan Old Style'
            },
            android: {
                fontFamily: 'serif'
            }
        }),
    },

    description_section: {
        flex: 1,
        padding: 15,
        backgroundColor: 'transparent',
        marginBottom: 50,
    },

    to_gallery: {
        width: Global.DEVICE_WIDTH,
        height: 40,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#7E005A',
        justifyContent: 'center'
    },

    to_gallery_text: {
        color: '#ffffff',
        textAlign: 'right',
        fontSize: 18,
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
