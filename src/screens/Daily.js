import React from 'react'
import {StyleSheet} from 'react-native'
import {withTheme} from "../theme";
import withData from "../api/withData";
import Loading from "../components/Loading";
import Box from "../components/Box";
import Line from "../components/Line";
import FireBase from 'react-native-firebase'
import {Events} from "../constants/Analytics";
import Text from "../components/Text";
import {Routes} from "../navigation/RootNavigation";
import Markdown from 'react-native-simple-markdown'
import LineIcon from 'react-native-vector-icons/SimpleLineIcons'
import Touchable from "../components/Touchable";
import Spacer from "../components/Spacer";

class Daily extends React.Component {

    componentDidMount() {
        console.log("Home:componentDidMount - Sending current screen to analytics...")
        FireBase.analytics().logEvent(Events.OpenDaily)

        // this.props.navigation.navigate(Routes.LetterFinder)
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
                                    <Box fit paper primary padding>
                                        <Markdown
                                            styles={{
                                                text: {
                                                    color: theme.palette.backgroundPrimaryText
                                                }
                                            }}>
                                            {daily.data}
                                        </Markdown>
                                    </Box>
                                )
                            }
                        </Box>
                    </Box>
                </Loading>
            </Box>
        )
    }
}

const styles = theme => StyleSheet.create({})

export default withData(withTheme(styles, Daily))
