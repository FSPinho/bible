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

        this.props.navigation.navigate(Routes.Bible)
    }

    _doOpenDaily = () => {
        this.props.navigation.navigate(Routes.Daily)
    }

    _doOpenBible = () => {
        this.props.navigation.navigate(Routes.Bible)
    }

    componentWillUnmount() {
        FireBase.analytics().logEvent(Events.SessionEnd)
    }

    render() {
        const {data, theme} = this.props
        const {styles} = theme

        const {daily} = data

        return (
            <Box secondary fit column>
                <Loading active={data.dailyLoading} size={56}>
                    <Box scroll>
                        <Box column fit padding>
                            {
                                !!daily && (
                                    <Box fit paper primary>
                                        <Touchable primary onPress={this._doOpenDaily}>
                                            <Box column fit>
                                                <Box padding centralize color={theme.palette.primary}
                                                     style={styles.cardMedia}>
                                                    <LineIcon size={96} color={theme.palette.primaryText}
                                                              name={'eyeglass'}/>
                                                </Box>
                                                <Box padding>
                                                    <Text size={20}>Oração do dia</Text>
                                                </Box>
                                            </Box>
                                        </Touchable>
                                    </Box>
                                )
                            }

                            <Spacer vertical large/>

                            <Box fit paper primary>
                                <Touchable primary onPress={this._doOpenBible}>
                                    <Box column fit>
                                        <Box padding centralize color={theme.palette.primary}
                                             style={styles.cardMedia}>
                                            <LineIcon size={96} color={theme.palette.primaryText}
                                                      name={'book-open'}/>
                                        </Box>
                                        <Box padding>
                                            <Text size={20}>Bíblia</Text>
                                        </Box>
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
        opacity: .8,
        borderTopLeftRadius: theme.metrics.borderRadius,
        borderTopRightRadius: theme.metrics.borderRadius,
    }
})

export default withData(withTheme(styles, Home))
