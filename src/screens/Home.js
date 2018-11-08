import React from 'react'
import {StyleSheet} from 'react-native'
import {withTheme} from "../theme";
import withData from "../api/withData";
import Loading from "../components/Loading";
import Box from "../components/Box";
import FireBase from 'react-native-firebase'
import {Events} from "../constants/Analytics";
import Text from "../components/Text";
import {Routes} from "../navigation/RootNavigation";
import LineIcon from 'react-native-vector-icons/SimpleLineIcons'
import Touchable from "../components/Touchable";
import Spacer from "../components/Spacer";

class Home extends React.Component {

    componentDidMount() {
        console.log("Home:componentDidMount - Sending current screen to analytics...")
        FireBase.analytics().logEvent(Events.SessionStart)
        FireBase.analytics().logEvent(Events.OpenHome)

        // this.props.navigation.navigate(Routes.About)

        this.notificationOpenedListener = FireBase.notifications().onNotificationOpened(({notification}) => {
            const {data} = notification
            if (data.daily) {
                this._doOpenDaily()
            }
            FireBase.notifications().removeDeliveredNotification('daily')
        });
    }

    _doOpenDaily = () => {
        this.props.navigation.navigate(Routes.Daily)
    }

    _doOpenBible = () => {
        this.props.navigation.navigate(Routes.Bible)
    }

    componentWillUnmount() {
        FireBase.analytics().logEvent(Events.SessionEnd)
        this.notificationOpenedListener()
    }

    render() {
        const {data, theme} = this.props
        const {styles} = theme

        return (
            <Box secondary fit column>
                <Loading active={data.dailyLoading} size={56}>
                    <Box scroll>
                        <Box column fit padding>
                            <Box fit paper primary>
                                <Touchable onPress={this._doOpenDaily} primary>
                                    <Box padding centralize
                                         column fit
                                         style={styles.cardMedia}>
                                        <Spacer vertical large/>
                                        <LineIcon size={96} color={theme.palette.primary}
                                                  name={'eyeglass'}/>
                                        <Spacer vertical large/>
                                        <Text size={20} color={theme.palette.primary}>
                                            Oração diária
                                        </Text>
                                        <Spacer vertical large/>
                                    </Box>
                                </Touchable>
                            </Box>

                            <Spacer vertical large/>

                            <Box fit paper primary>
                                <Touchable onPress={this._doOpenBible} primary>
                                    <Box padding centralize
                                         column fit
                                         style={styles.cardMedia}>
                                        <Spacer vertical large/>
                                        <LineIcon size={96} color={theme.palette.primary}
                                                  name={'book-open'}/>
                                        <Spacer vertical large/>
                                        <Text size={20} color={theme.palette.primary}>
                                            Bíblia Sagrada
                                        </Text>
                                        <Spacer vertical large/>
                                    </Box>
                                </Touchable>
                            </Box>
                        </Box>
                    </Box>
                </Loading>
            </Box>
        )
    }
}

const styles = theme => StyleSheet.create({
    cardMedia: {
        borderRadius: theme.metrics.borderRadius,
        borderTopLeftRadius: theme.metrics.borderRadius,
        borderTopRightRadius: theme.metrics.borderRadius,
    }
})

export default withData(withTheme(styles, Home))
