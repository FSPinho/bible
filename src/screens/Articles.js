import React from 'react'
import {FlatList} from 'react-native'
import {withTheme} from "../theme";
import withData from "../api/withData";
import Box from "../components/Box";
import FireBase from 'react-native-firebase'
import {Events} from "../constants/Analytics";
import {Routes} from "../navigation/RootNavigation";
import Spacer from "../components/Spacer";
import ListItem from "../components/ListItem";
import Loading from "../components/Loading";

class Articles extends React.Component {

    componentDidMount() {
        console.log("Home:componentDidMount - Sending current screen to analytics...")
        FireBase.analytics().logEvent(Events.OpenArticles)
    }

    _doOpenArticle = (article) => {
        this.props.navigation.navigate(Routes.Article, {article})
    }

    render() {

        const {data} = this.props
        const {articles, articlesLoading} = data

        return (
            <Loading active={articlesLoading}>
                <Box secondary fit column>
                    <FlatList
                        numColumns={2}
                        data={articles.map((s, key) => ({...s, subtitle: s.author, key}))}
                        ListHeaderComponent={<Spacer vertical/>}
                        ListFooterComponent={<Spacer vertical/>}
                        renderItem={({item}) => (
                            <ListItem item={item} onPress={this._doOpenArticle}/>
                        )}
                    />
                </Box>
            </Loading>
        )
    }
}

export default withData(withTheme({}, Articles))
