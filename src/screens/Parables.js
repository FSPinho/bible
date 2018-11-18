import React from 'react'
import {FlatList} from 'react-native'
import {withTheme} from "../theme";
import withData from "../api/withData";
import Box from "../components/Box";
import FireBase from 'react-native-firebase'
import {Events} from "../constants/Analytics";
import {Routes} from "../navigation/RootNavigation";
import Spacer from "../components/Spacer";
import ParablesData from '../resources/data/parables'
import ListItem from "../components/ListItem";

class Parables extends React.Component {

    componentDidMount() {
        console.log("Home:componentDidMount - Sending current screen to analytics...")
        FireBase.analytics().logEvent(Events.OpenParables)

        // this.props.navigation.navigate(Routes.About)
    }

    _doOpenParable = (parable) => {
        this.props.navigation.navigate(Routes.Parable, {parable})
    }

    render () {
        return (
            <Box secondary fit column>
                <FlatList
                    numColumns={2}
                    data={ParablesData.map((s, key) => ({...s, subtitle: s.data[0].slice(0, 32) + '...', key}))}
                    ListHeaderComponent={<Spacer vertical/>}
                    ListFooterComponent={<Spacer vertical/>}
                    renderItem={({item}) => (
                        <ListItem item={item} onPress={this._doOpenParable}/>
                    )}
                />
            </Box>
        )
    }
}

export default withData(withTheme({}, Parables))
