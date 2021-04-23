import React, {Component} from 'react'
import {StatusBar, Animated, Easing, StyleSheet, Dimensions} from 'react-native'
import DarkTheme from "./DarkTheme";
import LightTheme from "./LightTheme";
import AsyncStorage from 'redux-persist-filesystem-storage'
import FireBase from 'react-native-firebase'
import {Events} from "../constants/Analytics";

const {Provider, Consumer} = React.createContext({
    theme: undefined,
    doEnableDark: undefined,
    doEnableLight: undefined
});

export {Consumer}

class ThemeProvider extends Component {
    constructor(props) {
        super(props)

        this.state = {
            light: true,
            theme: LightTheme,
            themeAnimationScale: new Animated.Value(0),
            themeAnimationOpacity: new Animated.Value(1),
            themeAnimationNextColor: undefined
        }
    }

    asyncSetState = async state =>
        await new Promise(a => requestAnimationFrame(() => this.setState({...this.state, ...state}, a)))

    async componentDidMount() {
        try {
            console.log(await AsyncStorage.getAllKeys(), await AsyncStorage.getItem("le:theme"))
            const light = (await AsyncStorage.getItem("le:theme")) === 'light'
            await this.asyncSetState({light: light, theme: light ? LightTheme : DarkTheme})
        } catch (e) {
            console.log("ThemeProvider:componentDidMount - Can't get previous config. Setting to light theme.")
            await this.asyncSetState({light: true, theme: LightTheme})
        }
    }

    doEnableDark = async () => {
        await AsyncStorage.setItem("le:theme", 'dark')
        await this.doChangeTheme(DarkTheme)
        FireBase.analytics().logEvent(Events.ThemeEnableDark)
    }

    doEnableLight = async () => {
        await AsyncStorage.setItem("le:theme", 'light')
        await this.doChangeTheme(LightTheme)
        FireBase.analytics().logEvent(Events.ThemeEnableLight)
    }

    doChangeTheme = async (theme) => {
        await this.asyncSetState({
            themeAnimationNextColor: theme.palette.backgroundPrimary
        })

        const stepDuration = 800

        await new Promise(a => {
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(this.state.themeAnimationScale, {toValue: 0, duration: 0}),
                    Animated.timing(this.state.themeAnimationOpacity, {toValue: 0, duration: 0}),
                ]),
                Animated.parallel([
                    Animated.timing(
                        this.state.themeAnimationScale,
                        {
                            toValue: 1.5,
                            easing: Easing.bezier(.8, .2, .2, .8),
                            duration: stepDuration
                        }
                    ),
                    Animated.timing(
                        this.state.themeAnimationOpacity,
                        {
                            toValue: 1,
                            duration: stepDuration
                        }
                    ),
                ])
            ]).start(a)
        })

        await this.asyncSetState({
            theme,
            themeAnimationNextColor: theme.palette.backgroundPrimary
        })

        Animated.sequence([
            Animated.parallel([
                Animated.timing(
                    this.state.themeAnimationScale,
                    {
                        toValue: 1.5,
                        easing: Easing.bezier(.8, .2, .2, .8),
                        duration: stepDuration
                    }
                ),
                Animated.timing(
                    this.state.themeAnimationOpacity,
                    {
                        toValue: 0,
                        duration: stepDuration
                    }
                ),
            ]),
            Animated.parallel([
                Animated.timing(this.state.themeAnimationScale, {toValue: 0, duration: 0}),
                Animated.timing(this.state.themeAnimationOpacity, {toValue: 0, duration: 0}),
            ])
        ]).start()
    }

    doToggleTheme = async () => {
        if (this.state.light) {
            await this.asyncSetState({light: false})
            await this.doEnableDark()
        }
        else {
            await this.asyncSetState({light: true})
            await this.doEnableLight()
        }
    }

    render() {

        return (
            <Provider value={{
                theme: this.state.theme,
                light: this.state.light,
                doEnableDark: this.doEnableDark,
                doEnableLight: this.doEnableLight,
                doToggleTheme: this.doToggleTheme
            }}>
                <StatusBar
                    barStyle={this.state.theme.palette.statusBarStyle}
                    backgroundColor={this.state.theme.palette.statusBar}/>

                {this.props.children}

                <Animated.View
                    pointerEvents={'none'}
                    style={{
                        ...StyleSheet.absoluteFillObject,
                        transform: [{scale: this.state.themeAnimationScale}],
                        opacity: this.state.themeAnimationOpacity,
                        borderRadius: 1000000,
                        backgroundColor: this.state.themeAnimationNextColor
                    }}/>
            </Provider>
        )
    }
}


export default ThemeProvider
