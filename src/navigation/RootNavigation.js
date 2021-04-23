import React, {Component} from 'react'
import {withTheme} from "../theme";
import {createBottomTabNavigator, createStackNavigator} from "react-navigation";
import {
    About,
    Article,
    Articles,
    Bible,
    BibleBook,
    Daily,
    Feed,
    Home,
    ImageMaker,
    Parable,
    Parables,
    Stories,
    Story
} from "../screens";
import Header from "./Header";
import HeaderTitle from "./HeaderTitle";
import Quiz from "../screens/Quiz";
import Icon from "react-native-vector-icons/SimpleLineIcons";

export const Routes = {
    Home: 'HOME',
    Feed: 'FEED',
    Daily: 'DAILY',
    ImageMaker: 'IMAGE_MAKER',
    Bible: 'BIBLE',
    BibleBook: 'BIBLE_BOOK',
    About: 'ABOUT',
    Stories: 'STORIES',
    Story: 'STORY',
    Parables: 'PARABLES',
    Parable: 'PARABLE',
    Articles: 'ARTICLES',
    Article: 'ARTICLE',
    Quiz: 'QUIZ',
}

class RootNavigation extends Component {
    constructor(props) {
        super(props)

        const stackOptions = {
            header: (props) => <Header {...props}/>
        }

        this.StackNav = createStackNavigator({
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
            [Routes.ImageMaker]: {
                screen: ImageMaker,
                navigationOptions: {headerTitle: <HeaderTitle text={'Compartilhar Oração'}/>, ...stackOptions}
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
                navigationOptions: {
                    headerTitle: <HeaderTitle text={'Histórias Reais'}/>, ...stackOptions
                }
            },
            [Routes.Article]: {
                screen: Article,
                navigationOptions: ({navigation}) => ({
                    headerTitle: <HeaderTitle text={navigation.getParam('article').title}/>, ...stackOptions
                })
            },
            [Routes.Quiz]: {
                screen: Quiz,
                navigationOptions: ({}) => ({
                    headerTitle: <HeaderTitle text={'Quiz'}/>, ...stackOptions
                })
            },
        }, {navigationOptions: stackOptions});

        this.TabNav = createBottomTabNavigator({
            [Routes.Feed]: {
                screen: Feed,
                navigationOptions: {
                    tabBarIcon: ({tintColor}) => <Icon color={tintColor} size={20} name={"grid"}/>
                }
            },
            [Routes.Home]: {
                screen: this.StackNav,
                navigationOptions: {
                    tabBarIcon: ({tintColor}) => <Icon color={tintColor} size={20} name={"home"}/>
                }
            }
        }, {
            tabBarOptions: {
                showLabel: false,
                activeTintColor: props.theme.palette.primary,
                inactiveTintColor: props.theme.palette.backgroundPrimaryTextSecondary,
            }
        });
    }

    render() {
        return (<this.StackNav />)
    }
}

export default withTheme({}, RootNavigation)
