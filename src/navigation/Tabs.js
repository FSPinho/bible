import React, {Component} from 'react'
import {withTheme} from "../theme";
import {MaterialTopTabBar} from "react-navigation-tabs";
import {StyleSheet} from "react-native";

class Tabs extends Component {
    render() {
        const {theme, ...props} = this.props
        const _extraProps = {
            ...props,
            activeTintColor: theme.palette.primary,
            inactiveTintColor: theme.palette.backgroundPrimaryTextSecondary,
            showIcon: true,
            showLabel: true,
            upperCaseLabel: true,
            pressColor: theme.palette.primary,
            pressOpacity: .5,
            scrollEnabled: false,
            style: theme.styles.tab,
            indicatorStyle: theme.styles.tabIndicator,
            labelStyle: theme.styles.tabLabel,
            iconStyle: theme.styles.tabIcon
        }
        return (
            <MaterialTopTabBar
                {..._extraProps}
            />
        )
    }
}

const styles = theme => StyleSheet.create({
    tab: {
        elevation: 12,
        backgroundColor: theme.palette.backgroundPrimary
    },
    tabIndicator: {
        height: 0
    },
    tabLabel: {},
    tabIcon: {},
    headerStyle: {
        backgroundColor: theme.palette.backgroundPrimary,
        elevation: 4
    }
})

export default withTheme(styles, Tabs)
