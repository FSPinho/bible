import React, {Component} from 'react'
import {withTheme} from "../theme";
import {createStackNavigator} from "react-navigation";
import {Home, Daily, Bible, BibleBook, About, Stories, Story, Parables, Parable, Articles, Article} from "../screens";
import Header from "./Header";
import HeaderTitle from "./HeaderTitle";

export const Routes = {
    Home: 'HOME',
    Daily: 'DAILY',
    Bible: 'BIBLE',
    BibleBook: 'BIBLE_BOOK',
    About: 'ABOUT',
    Stories: 'STORIES',
    Story: 'STORY',
    Parables: 'PARABLES',
    Parable: 'PARABLE',
    Articles: 'ARTICLES',
    Article: 'ARTICLE',
}

class RootNavigation extends Component {
    constructor(props) {
        super(props)

        const stackOptions = {
            header: (props) => <Header {...props}/>
        }

        this.Nav = createStackNavigator({
            [Routes.Home]: {
                screen: Home,
                navigationOptions: {
                    headerTitle: <HeaderTitle text={'Oração Diária & Bíblia Sagrada'}/>, ...stackOptions
                }
            },
            [Routes.Daily]: {
                screen: Daily,
                navigationOptions: {headerTitle: <HeaderTitle text={'Oração do dia'}/>, ...stackOptions}
            },
            [Routes.Bible]: {
                screen: Bible,
                navigationOptions: {headerTitle: <HeaderTitle text={'Bíblia Sagrada'}/>, ...stackOptions}
            },
            [Routes.BibleBook]: {
                screen: BibleBook,
                navigationOptions: ({navigation}) => ({
                    headerTitle: <HeaderTitle text={navigation.getParam('book').title}/>, ...stackOptions
                })
            },
            [Routes.About]: {
                screen: About,
                navigationOptions: {headerTitle: <HeaderTitle text={'Quem somos'}/>, ...stackOptions}
            },
            [Routes.Stories]: {
                screen: Stories,
                navigationOptions: {headerTitle: <HeaderTitle text={'Histórias Bíblicas'}/>, ...stackOptions}
            },
            [Routes.Story]: {
                screen: Story,
                navigationOptions: ({navigation}) => ({
                    headerTitle: <HeaderTitle text={navigation.getParam('story').title}/>, ...stackOptions
                })
            },
            [Routes.Parables]: {
                screen: Parables,
                navigationOptions: {headerTitle: <HeaderTitle text={'Parábolas'}/>, ...stackOptions}
            },
            [Routes.Parable]: {
                screen: Parable,
                navigationOptions: ({navigation}) => ({
                    headerTitle: <HeaderTitle text={navigation.getParam('parable').title}/>, ...stackOptions
                })
            },
            [Routes.Articles]: {
                screen: Articles,
                navigationOptions:{
                    headerTitle: <HeaderTitle text={'Histórias Reais'}/>, ...stackOptions
                }
            },
            [Routes.Article]: {
                screen: Article,
                navigationOptions: ({navigation}) => ({
                    headerTitle: <HeaderTitle text={navigation.getParam('article').title}/>, ...stackOptions
                })
            },
        }, {navigationOptions: stackOptions})
    }

    render() {
        return (<this.Nav/>)
    }
}

export default withTheme({}, RootNavigation)
