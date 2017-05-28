import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import { initialState } from './reducers';
import Root from './root';
import Profile from './components/profile';
import Gallery from './components/gallery';
import Detail from './components/detail';
import ArtMap from './components/art_map';
import ListWorks from './components/list_works';
import ListPainters from './components/list_painters';
import {
    fetchRandomPainters,
    fetchRandomArtWorks,
    fetchAllArtWorks,
    fetchAllPainters
} from './actions'
import {
    StyleSheet,
    Text,
    View,
    Navigator,
    Image,
    Platform
} from 'react-native';
import {
    Scene,
    Router,
    Actions
} from 'react-native-router-flux';

const store = configureStore(initialState);
store.dispatch(fetchRandomPainters())
store.dispatch(fetchRandomArtWorks())
store.dispatch(fetchAllArtWorks())
store.dispatch(fetchAllPainters())

const Logo = Platform.select({
    ios: () => {
        return (
            <Image source={require('./assets/images/wwa_logo2.png')} style={styles.titleLogo} />
        )
    },
    android: () => {
        return (
            <View style={{flex: 1, alignItems: 'center', marginTop: 13}}>
                <Image source={require('./assets/images/wwa_logo2.png')} style={styles.titleLogo} />
            </View>
        )
    }
})

const scenes = Actions.create(
    <Scene key="root">
        <Scene key="welcome" initial
            title={Logo}
            renderTitle={Logo}
            component={Root}
            leftButtonIconStyle={{tintColor: '#ffffff'}} />
        <Scene key="profile"
            component={Profile}
            title={Logo}
            renderTitle={Logo}
            leftButtonIconStyle={{tintColor: '#ffffff'}}/>
        <Scene key="gallery"
            component={Gallery}
            title={Logo}
            renderTitle={Logo}
            leftButtonIconStyle={{tintColor: '#ffffff'}}/>
        <Scene key="detail"
            component={Detail}
            title={Logo}
            renderTitle={Logo}
            leftButtonIconStyle={{tintColor: '#ffffff'}}/>
        <Scene key="art_map"
            component={ArtMap}
            title={Logo}
            renderTitle={Logo}
            leftButtonIconStyle={{tintColor: '#ffffff'}}/>
        <Scene key="list_works"
            component={ListWorks}
            title={Logo}
            renderTitle={Logo}
            leftButtonIconStyle={{tintColor: '#ffffff'}}/>
        <Scene key="list_painters"
            component={ListPainters}
            title={Logo}
            renderTitle={Logo}
            leftButtonIconStyle={{tintColor: '#ffffff'}}/>
    </Scene>
)


const Application = () => {
    return (
        <Provider store={store}>
            <Router navigationBarStyle={styles.navBar} scenes={scenes} sceneStyle={styles.routerScene} />
        </Provider>
    )
}

export default Application;

const styles = StyleSheet.create({
    navBar: {
        flex: 1,
        backgroundColor: '#7E005A', // changing navbar color
        borderWidth: 1
    },

    routerScene: {
        paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight-5, // some navbar padding to avoid content overlap
    },

    titleLogo: {
        width: 180,
        height: 30,
        resizeMode: 'contain',
        alignItems: 'center',
    }
})
