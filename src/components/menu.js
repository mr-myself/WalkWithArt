import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Platform
} from 'react-native';
import RadialMenu from 'react-native-radial-menu';
import {
    Actions
} from 'react-native-router-flux';
import ActionButton from 'react-native-circular-action-menu';


class Menu extends Component {

    _renderAndroidMenu() {
        return (
            <ActionButton icon={<Image source={require('../assets/images/wwa_menu_root.png')} style={{width: 40, height: 40}}/>} position="right" degrees="30" bgColor="transparent" buttonColor="transparent" btnOutRange="transparent">
                <ActionButton.Item onPress={() => Actions.art_map()}>
                    <Image
                        style={styles.menu_icon}
                        source={require('../assets/images/wwa_menu_map.png')} />
                </ActionButton.Item>
                <ActionButton.Item onPress={() => Actions.list_works()}>
                    <Image
                        style={styles.menu_icon}
                        source={require('../assets/images/wwa_menu_works.png')} />
                </ActionButton.Item>
                <ActionButton.Item onPress={() => Actions.list_painters()}>
                    <Image
                        style={styles.menu_icon}
                        source={require('../assets/images/wwa_menu_painters.png')} />
                </ActionButton.Item>
                <ActionButton.Item  onPress={() => Actions.welcome()}>
                    <Image
                        style={styles.menu_icon}
                        source={require('../assets/images/wwa_menu_top.png')} />
                </ActionButton.Item>
            </ActionButton>
        )
    }

    _renderIosMenu() {
        return (
            <View style={{flex: 1, position: 'absolute', bottom: 0, right: 0}}>
                <RadialMenu spreadAngle={110} startAngle={-10}
                    onOpen={() => {}} onClose={() => {}}
                    style={styles.menu_position}>
                    <Image
                        style={styles.menu_icon}
                        source={require('../assets/images/wwa_menu_root.png')} />
                    <Image
                        style={styles.menu_icon}
                        onSelect={() => Actions.art_map()}
                        source={require('../assets/images/wwa_menu_map.png')} />
                    <Image
                        style={styles.menu_icon}
                        onSelect={() => Actions.list_works()}
                        source={require('../assets/images/wwa_menu_works.png')} />
                    <Image
                        style={styles.menu_icon}
                        onSelect={() => Actions.list_painters()}
                        source={require('../assets/images/wwa_menu_painters.png')} />
                    <Image
                        style={styles.menu_icon}
                        onSelect={() => Actions.welcome()}
                        source={require('../assets/images/wwa_menu_top.png')} />
                </RadialMenu>
            </View>
        )
    }

    render() {
        var platformMenu;
        if (Platform.OS == "android") {
            platformMenu = this._renderAndroidMenu();
        } else {
            platformMenu = this._renderIosMenu();
        }

        return platformMenu;
    }
}

export default Menu

const styles= StyleSheet.create({
    menu_position: {
        position: 'absolute',
        bottom: 20,
        right: 20
    },

    menu_icon: {
        ...Platform.select({
            ios: {
                width: 58,
                height: 58
            },
            android: {
                width: 36,
                height: 36
            }
        })
    },
})
