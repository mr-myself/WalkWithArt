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


class ListPainters extends Component {

    _renderPainterView(painter, index) {
        return (
            <View key={'painter_view_' + index}>
                <TouchableOpacity key={painter.id + "_touch_painter"} onPress={() => Actions.profile({painter})}>
                    <View style={styles.wrap_view}>
                        <View style={{flex: 2}}>
                            <Text style={styles.painter_name} key={'painter_name_' + index}>{painter.name}</Text>
                            <Text style={styles.painter_lifespan} key={'painter_lifespan_' + index}>{painter.lifespan}</Text>
                        </View>

                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Image
                                style={styles.painter}
                                source={{uri: Global.BASE_URL + painter.portrait}}
                                key={index}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        var views = [];
        if (this.props.all_painters.length > 0) {
            this.props.all_painters.map((painter, i) => {
                views.push(this._renderPainterView(painter, i))
            })
        }

        return (
            <Image source={require('../assets/images/wall_alpha.jpg')} style={{flex: 1, width: Global.DEVICE_WIDTH}}>
                 <ScrollView style={{flex: 1, paddingTop: 40, paddingBottom: 50}}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={styles.label}>Painters</Text>
                        <Image source={require('../assets/images/line2.png')} style={{marginTop: 2, marginBottom: 20}} />
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
    return { all_painters: state.all_painters }
}

export default connect(mapStateToProps)(ListPainters);


const styles = StyleSheet.create({

    wrap_view: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        marginBottom: 8,
        marginRight: 15,
        marginLeft: 15,
        paddingRight: 15,
        paddingLeft: 15,
        width: Global.DEVICE_WIDTH-30,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#eeeeee',
        height: 100
    },

    painter_name: {
        fontSize: 18,
        backgroundColor: 'transparent',
        color: '#000',
        marginTop: 18,
        ...Platform.select({
            ios: {
                fontFamily: 'Iowan Old Style'
            },
            android: {
                fontFamily: 'serif'
            }
        })
    },

    painter_lifespan: {
        fontSize: 13,
        color: '#909090',
        backgroundColor: 'transparent',
        marginTop: 5
    },

    painter: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginTop: 15
    },

    label: {
        color: '#B88743',
        fontSize: 20,
        backgroundColor: 'transparent',
        ...Platform.select({
            ios: {
                fontFamily: 'Iowan Old Style'
            },
            android: {
                fontFamily: 'serif'
            }
        }),
    },
})
