import React from 'react'
import {FlatList} from 'react-native'
import {withTheme} from "../theme";
import withData from "../api/withData";
import Box from "../components/Box";
import FireBase from 'react-native-firebase'
import {Events} from "../constants/Analytics";
import {Routes} from "../navigation/RootNavigation";
import Spacer from "../components/Spacer";
import StoriesData from '../resources/data/stories'
import ListItem from "../components/ListItem";

class Stories extends React.Component {

    componentDidMount() {
        console.log("Home:componentDidMount - Sending current screen to analytics...")
        FireBase.analytics().logEvent(Events.OpenStories)

        // this.props.navigation.navigate(Routes.About)
    }

    _doOpenStory = (story) => {
        this.props.navigation.navigate(Routes.Story, {story})
    }

    render () {
        return (
            <Box secondary fit column>
                <FlatList
                    numColumns={2}
                    data={StoriesData.map((s, key) => ({...s, subtitle: s.index, key}))}
                    ListHeaderComponent={<Spacer vertical/>}
                    ListFooterComponent={<Spacer vertical/>}
                    renderItem={({item}) => (
                        <ListItem item={item} onPress={this._doOpenStory}/>
                    )}
                />
            </Box>
        )
    }
}

export default withData(withTheme({}, Stories))
