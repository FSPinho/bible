import React, {Component} from 'react'
import {Image, TouchableWithoutFeedback, StyleSheet} from 'react-native'
import {withTheme} from "../theme";
import {Header as RNHeader} from "react-navigation";
import IconButton from "../components/IconButton";
import Box from "../components/Box";
import Spacer from "../components/Spacer";
import withData from "../api/withData";
import FireBase from 'react-native-firebase'
import {GoogleSignin} from 'react-native-google-signin'
import {Alert} from '../services'
import {Routes} from "./RootNavigation";
import {Events} from "../constants/Analytics";

class Header extends Component {

    doSignOut = async () => {
        try {
            await Alert.ask(this, 'Sair da sua conta?')
            await FireBase.auth().signOut()
            await GoogleSignin.signOut()
            this.props.navigation.navigate(Routes.Login)
            FireBase.analytics().logEvent(Events.TenderSignOut)
        } catch (e) {
            console.log("Header:doSignOut - Sign out canceled:", e)
        }
    }

    render() {
        const {scene, theme, navigation} = this.props;
        scene.descriptor.options.headerStyle = {
            ...scene.descriptor.options.headerStyle,
            backgroundColor: theme.palette.backgroundPrimary,
            elevation: 4
        }

        scene.descriptor.options.headerTintColor = theme.palette.backgroundPrimaryTextPrimary

        scene.descriptor.options.headerRight = (
            <Box>
				<Box fit>
	                <IconButton
	                    onPress={theme.doToggleTheme}
	                    icon={theme.light ? 'weather-night' : 'weather-sunny'}
						iconComponent={'material-community'} flat/>
				</Box>
				<Box>
					<Spacer/>
				</Box>
				<Box>
	                <IconButton
	                    onPress={() => navigation.navigate(Routes.About)}
	                    icon={'information'}
						iconComponent={'material-community'} flat/>
	                <Spacer/>
				</Box>
            </Box>
        )

        return (<RNHeader {...this.props} scene={scene}/>)
    }
}

const styles = theme => StyleSheet.create({
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 192
    }
})

export default withData(withTheme(styles, Header))
