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
import Touchable from "../components/Touchable";
import Spacer from "../components/Spacer";
import StoriesData from '../resources/data/stories'

class Parable extends React.Component {

    componentDidMount() {
        console.log("Home:componentDidMount - Sending current screen to analytics...")
        FireBase.analytics().logEvent(Events.OpenParable, {
            bi_story_title: this.story.title
        })

        // this.props.navigation.navigate(Routes.About)
    }

    get story() {
        return this.props.navigation.getParam('parable') || {}
    }

    render() {
        const story = this.story

        return (
            <Box secondary fit column>
                <Box scroll>
                    <Box column fit paddingSmall>
                        <Box fit paper primary marginSmall column centralize padding>
                            <Text size={20}
                                  weight={'700'}
                                  center>
                                {story.title}
                            </Text>
                            <Spacer vertical large/>
                            {story.data.map((p, i) => (
                                <Box column key={i}>
                                    <Text size={16}
                                          weight={'300'}
                                          center>
                                        {p}
                                    </Text>
                                    <Spacer vertical/>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }
}

const styles = theme => StyleSheet.create({})

export default withData(withTheme(styles, Parable))
