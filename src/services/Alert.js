import { Alert, Platform, ToastAndroid } from 'react-native';

export default class _Alert {
    static showText = message => {
        if (Platform.OS === 'android')
            ToastAndroid.show(message, ToastAndroid.SHORT)
        else if (Platform.OS === 'ios')
            AlertIOS.alert(msg)
    }

    static showLongText = message => {
        if (Platform.OS === 'android')
            ToastAndroid.show(message, ToastAndroid.LONG);
        else if (Platform.OS === 'ios')
            AlertIOS.alert(msg)
    }

    static ask = (context, message) => {

        const t = context.props.t
        const ok = typeof t === 'function' ? t('button-ok') : 'OK'
        const cancel = typeof t === 'function' ? t('button-cancel') : 'Cancel'

        return new Promise((accept, reject) => {
            Alert.alert(
                '',
                message,
                [
                    { text: cancel, onPress: () => reject('Canceled'), style: 'cancel' },
                    { text: ok, onPress: accept },
                ],
                { cancelable: false }
            )
        })
    }
}