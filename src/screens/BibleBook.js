import React from 'react'
import {StyleSheet} from 'react-native'
import {withTheme} from "../theme";
import withData from "../api/withData";
import Loading from "../components/Loading";
import Box from "../components/Box";
import FireBase from 'react-native-firebase'
import {Events} from "../constants/Analytics";
import BibleData from '../resources/data/bible'
import Text from "../components/Text";
import Line from "../components/Line";
import Spacer from "../components/Spacer";
import Touchable from "../components/Touchable";

class BibleBook extends React.Component {

    componentDidMount() {
        console.log("Home:componentDidMount - Sending current screen to analytics...")
        FireBase.analytics().logEvent(Events.OpenBibleBook)
    }

    get book() {
        return this.props.navigation.getParam('book')
    }

    render() {
        const {data, theme} = this.props
        const {styles} = theme

        const book = this.book

        return (
            <Box secondary fit column>
                <Loading active={data.dailyLoading} size={56}>
                    <Box scroll>
                        <Box column fit padding>
                            <Box padding>
                                <Text secondary>{book.title}</Text>
                            </Box>

                            <Spacer vertical large/>

                            {book.chapters.map((c, i) =>
                                <Box column key={i}>
                                    <Box fit paper primary key={i} column>
                                        <Box padding>
                                            <Text secondary>{c.title} - Capítulo {c.index}</Text>
                                        </Box>
                                        <Line/>
                                        <Box fit paddingSmall column>
                                            {c.versicles.map((v, i) => [
                                                    <Box fit primary column key={0}>
                                                        <Touchable primary>
                                                            <Box fit paddingSmall key={i} primary>
                                                                <Text>{v.index} - {v.title}</Text>
                                                            </Box>
                                                        </Touchable>
                                                    </Box>,
                                                    <Spacer vertical large key={1}/>
                                                ]
                                            )}
                                        </Box>
                                    </Box>
                                    <Spacer vertical large/>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Loading>
            </Box>
        )
    }
}

const styles = theme => StyleSheet.create({})

export default withData(withTheme(styles, BibleBook))
