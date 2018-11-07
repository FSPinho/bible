import React from 'react'
import {StyleSheet} from 'react-native'
import {withTheme} from "../theme";
import withData from "../api/withData";
import Loading from "../components/Loading";
import Box from "../components/Box";
import FireBase from 'react-native-firebase'
import {Events} from "../constants/Analytics";
import {Routes} from "../navigation/RootNavigation";
import BibleData from '../resources/data/bible'
import Text from "../components/Text";
import Line from "../components/Line";
import Spacer from "../components/Spacer";
import Touchable from "../components/Touchable";

class Bible extends React.Component {

    componentDidMount() {
        console.log("Home:componentDidMount - Sending current screen to analytics...")
        FireBase.analytics().logEvent(Events.OpenBible)

        // this.props.navigation.navigate(Routes.BibleBook, {book: BibleData.testments[0].books[0]})
    }

    _doOpenBook = (book) => {
        this.props.navigation.navigate(Routes.BibleBook, {book})
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
                            {BibleData.testments.map((t, i) =>
                                <Box fit column key={i}>
                                    <Box fit paper primary column>
                                        <Box padding>
                                            <Text secondary>LIVROS DO {t.title}</Text>
                                        </Box>
                                        <Line/>
                                        <Box fit paddingSmall column>
                                            {t.books.map((b, i) => [
                                                    <Box fit primary column key={'0_' + i}>
                                                        <Touchable onPress={() => this._doOpenBook(b)} primary>
                                                            <Box fit paddingSmall key={i} primary>
                                                                <Text>{b.title}</Text>
                                                            </Box>
                                                        </Touchable>
                                                    </Box>,
                                                    <Spacer vertical large key={'1_' + i}/>
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

export default withData(withTheme(styles, Bible))
