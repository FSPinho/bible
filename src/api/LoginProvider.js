import React, {useCallback, useEffect, useState} from "react";
import {GoogleSignin} from "react-native-google-signin";
import firebase from "react-native-firebase";
import Alert from "../services/Alert";

export const LoginContext = React.createContext({
    getUser: () => null
});

export const LoginProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(loading);
            try {
                await GoogleSignin.configure();
                const data = await GoogleSignin.signInSilently();
                const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
                const {user} = await firebase.auth().signInWithCredential(credential);
                setUser(user._user);
            } catch (e) {
                console.warn("Login:componentDidMount - SignInSilently login error:", e);
            }
            setLoading(false);
        })();
    }, []);

    const getUser = useCallback(async () => {
        if (user) {
            return user;
        } else {
            setLoading(true);
            try {
                await GoogleSignin.configure()
                const data = await GoogleSignin.signIn()
                const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
                const {user} = await firebase.auth().signInWithCredential(credential)
                await setUser(user._user);
                await setLoading(false);
                return user._user;
            } catch (e) {
                console.warn(e);
                Alert.showLongText("Não foi possível entrar com Google!")
            }
            await setLoading(false);
            return null;
        }
    }, [user]);

    const clearUser = useCallback(async () => {
        try {
            await GoogleSignin.signOut();
        } catch (error) {
            console.log(`Can't clear user:`, error);
        }

        try {
            await firebase.auth().signOut();
        } catch (error) {
            console.log(`Can't clear user:`, error);
        }
    });

    return (
        <LoginContext.Provider
            value={{
                getUser,
                clearUser,
            }}>
            {children}
        </LoginContext.Provider>
    );
};
