import React, {useCallback, useContext, useState} from "react";
import {Box, Button, Loading, Text} from "../components";
import {LoginContext} from "../api/LoginProvider";
import {describe} from "../services/Describe";

export default ({navigation}) => {

    const loginProvider = useContext(LoginContext);

    const [user, setUser] = useState();

    const doLogin = useCallback(() => {
        describe(async () => {
            setUser(await loginProvider.getUser());
        }, "doLogin");
    }, [user]);

    const doLogout = useCallback(() => {
        (async () => {
            await loginProvider.clearUser();
            setUser(null);
        })();
    }, [user]);

    return (
        <Loading>
            <Box fit>
                <Box centralize column>
                    <Text>{user ? user.displayName : " -- No User -- "}</Text>
                    <Button onPress={doLogin}>Do Login</Button>
                    <Button onPress={doLogout}>Do Logout</Button>
                </Box>
            </Box>
        </Loading>
    );
}
