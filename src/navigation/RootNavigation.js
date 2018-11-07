import React, {Component} from 'react'
import {withTheme} from "../theme";
import {createStackNavigator} from "react-navigation";
import {Home, Daily, Bible, BibleBook} from "../screens";
import Header from "./Header";
import HeaderTitle from "./HeaderTitle";

export const Routes = {
    Home: 'HOME',
    Daily: 'DAILY',
    Bible: 'BIBLE',
    BibleBook: 'BIBLE_BOOK',
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
                navigationOptions: {headerTitle: <HeaderTitle text={'Oração Diária & Bíblia Sagrada'}/>, ...stackOptions}
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
                navigationOptions: {headerTitle: <HeaderTitle text={'Bíblia Sagrada'}/>, ...stackOptions}
            }
        }, {navigationOptions: stackOptions})
    }

    render() {
        return (<this.Nav/>)
    }
}

export default withTheme({}, RootNavigation)
