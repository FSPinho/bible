import React, {Component} from 'react';
import ThemeProvider from "./theme/ThemeProvider";
import FireBase from 'react-native-firebase'
import RootNavigation from "./navigation/RootNavigation";
import DataProvider from "./api/DataProvider";
import SplashScreen from 'react-native-splash-screen'
import Snow from "./components/Snow";

console.disableYellowBox = true;

export default class App extends Component {

    async componentDidMount() {
        /**
         * Initialize Firebase Notifications
         * */
        const enabled = await FireBase.messaging().hasPermission();
        if (enabled) {
        } else {
            try {
                await FireBase.messaging().requestPermission();
            } catch (error) {
            }
        }

        const notificationOpen = await FireBase.notifications().getInitialNotification();
        if (notificationOpen) {
            console.log("App opened by notification:", notificationOpen)
        }

        const fcmToken = await FireBase.messaging().getToken();
        if (fcmToken) {
            console.log("Initial token:", fcmToken)
        }

        this.onTokenRefreshListener = FireBase.messaging().onTokenRefresh(fcmToken => {
            console.log("onTokenRefresh:", fcmToken)
        });
        this.notificationDisplayedListener = FireBase.notifications().onNotificationDisplayed((notification) => {
            console.log("onNotificationDisplayed:", notification)
        });
        this.notificationListener = FireBase.notifications().onNotification((notification) => {
            console.log("onNotification:", notification)
        });
        this.notificationOpenedListener = FireBase.notifications().onNotificationOpened((notificationOpen) => {
            console.log("onNotificationOpened:", notificationOpen)
        });

        /**
         * Initializing Firebase Admob
         * */
        FireBase.admob().initialize('ca-app-pub-5594222713152935~1157666327')

        /**
         * Hiding splash screen
         * */
        setTimeout(SplashScreen.hide, 1800)
    }

    componentWillUnmount() {
        this.notificationDisplayedListener();
        this.notificationListener();
        this.notificationOpenedListener();
        this.onTokenRefreshListener();
    }

    render() {
        return (
            <ThemeProvider>
                <DataProvider>
                    <Snow>
                        <RootNavigation/>
                    </Snow>
                </DataProvider>
            </ThemeProvider>
        );
    }
}
