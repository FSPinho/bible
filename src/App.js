import React, {Component} from 'react';
import ThemeProvider from "./theme/ThemeProvider";
import FireBase from 'react-native-firebase'
import RootNavigation from "./navigation/RootNavigation";
import DataProvider from "./api/DataProvider";
import SplashScreen from 'react-native-splash-screen'
import TextToSpeech from "./services/TextToSpeech";
import AsyncStorage from 'redux-persist-filesystem-storage'
import DateFormat from 'dateformat'
import BackgroundJob from 'react-native-background-job';
import {LoginProvider} from './api';
import Snow from "./components/Snow";

const backgroundJob = {
    jobKey: "check-for-notifications",
    job: async () => {
        try {
            console.log("BackgroundJob:job - Checking FireBase for new daily")

            const date = DateFormat(new Date(), 'dd-mm-yyyy')

            let existing = false

            try {
                existing = await AsyncStorage.getItem("bi:" + date)
            } catch (e) {
            }

            if (existing) {
                console.log("BackgroundJob:job - Skipping notification...")
            } else {
                await AsyncStorage.setItem("bi:" + date, 'true')

                console.log("BackgroundJob:job - Checking FireBase for:", date)

                const dailyRef = FireBase.firestore().collection('daily').where('schedule', '==', date).limit(1)

                const querySnapshot = await dailyRef.get()
                querySnapshot.forEach(async snapshot => {
                    const daily = snapshot.data()
                    console.log("BackgroundJob:job - Got daily:", daily.schedule)

                    const notification = new FireBase.notifications.Notification()
                        .setNotificationId('daily')
                        .setTitle('Oração do dia!')
                        .setBody(daily.notification)
                        .setData({
                            daily: true,
                        });
                    notification
                        .android.setChannelId('daily')
                        .android.setSmallIcon('ic_launcher');
                    FireBase.notifications().displayNotification(notification)
                })
            }
        } catch (error) {
            /** ... */
        }
    }
};

// BackgroundJob.register(backgroundJob);
// BackgroundJob.schedule({
//     jobKey: "check-for-notifications",
//     allowExecutionInForeground: true
// });

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

        const fcmToken = await FireBase.messaging().getToken();
        if (fcmToken) {
            console.log("Initial token:", fcmToken)
        }

        this.onTokenRefreshListener = FireBase.messaging().onTokenRefresh(fcmToken => {
            console.log("onTokenRefresh:", fcmToken)
        });
        this.notificationDisplayedListener = FireBase.notifications().onNotificationDisplayed(() => {
            console.log("onNotificationDisplayed")
        });
        this.notificationListener = FireBase.notifications().onNotification(() => {
            console.log("onNotification")
        });

        // this.notificationOpenedListener = FireBase.notifications().onNotificationOpened((notificationOpen) => {
        //     console.log("onNotificationOpened")
        // });

        /** Setting up notification channel */
        const channelDaily = new FireBase.notifications.Android.Channel('daily', 'Oração diária', FireBase.notifications.Android.Importance.Max)
            .setDescription('Canal de orações diárias');
        const channelArticle = new FireBase.notifications.Android.Channel('article', 'Histórias Reais', FireBase.notifications.Android.Importance.Max)
            .setDescription('Canal de histórias reais');
        FireBase.notifications().android.createChannel(channelDaily);
        FireBase.notifications().android.createChannel(channelArticle);

        /**
         * Initializing Firebase Admob
         * */
        FireBase.admob().initialize('ca-app-pub-5594222713152935~5298185330')

        /** Initializing speech */
        TextToSpeech.initialize()

        /**
         * Hiding splash screen
         * */
        setTimeout(SplashScreen.hide, 1800)
    }

    componentWillUnmount() {
        this.notificationDisplayedListener();
        this.notificationListener();
        // this.notificationOpenedListener();
        this.onTokenRefreshListener();
    }

    render() {
        return (
            <ThemeProvider>
                <LoginProvider>
                    <DataProvider>
                        <Snow>
                            <RootNavigation/>
                        </Snow>
                    </DataProvider>
                </LoginProvider>
            </ThemeProvider>
        );
    }
}
