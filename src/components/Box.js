import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import withTheme from "../theme/withTheme";

class Box extends React.PureComponent {

    render() {

        const {
            children,

            centralize,

            alignCenter,
            alignStart,
            alignEnd,
            alignStretch,

            justifyCenter,
            justifyStart,
            justifyEnd,
            justifySpaceAround,
            justifySpaceBetween,

            flex,
            column,
            fit,
            fitAbsolute,

            wrap,
            padding,
            paddingSmall,
            margin,
            marginSmall,

            theme,
            style,
            color,
            border,
            primary,
            secondary,
            paper,
            rounded,
            scroll,

            ...anotherProps
        } = this.props

        const {styles} = theme

        const _styles = [
            styles.box
        ]

        if (centralize) _styles.push(styles.centralize)
        if (alignCenter) _styles.push(styles.alignCenter)
        if (alignStart) _styles.push(styles.alignStart)
        if (alignEnd) _styles.push(styles.alignEnd)
        if (alignStretch) _styles.push(styles.alignStretch)
        if (justifyCenter) _styles.push(styles.justifyCenter)
        if (justifyStart) _styles.push(styles.justifyStart)
        if (justifyEnd) _styles.push(styles.justifyEnd)
        if (justifySpaceAround) _styles.push(styles.justifySpaceAround)
        if (justifySpaceBetween) _styles.push(styles.justifySpaceBetween)
        if (flex) _styles.push(styles.flex)
        if (column || scroll) _styles.push(styles.column)
        if (fit) _styles.push(styles.fit)
        if (fitAbsolute) _styles.push(styles.fitAbsolute)
        if (wrap) _styles.push(styles.wrap)
        if (padding) _styles.push(styles.padding)
        if (paddingSmall) _styles.push(styles.paddingSmall)
        if (margin) _styles.push(styles.margin)
        if (marginSmall) _styles.push(styles.marginSmall)
        if (border) _styles.push(styles.border)
        if (paper) _styles.push(styles.paper)
        if (rounded) _styles.push(styles.rounded)

        _styles.push({
            backgroundColor: color ? color : (
                secondary ? theme.palette.backgroundSecondary
                    : primary ? theme.palette.backgroundPrimary
                    : 'transparent'
            )
        })

        if (style) _styles.push(style)

        return scroll ?
            (
                <ScrollView style={{flex: 1}}>
                    <View style={[styles.scrollInner, _styles]} ref="root" {...anotherProps}>
                        {children}
                    </View>
                </ScrollView>
            ) : (
                <View style={_styles} ref="root" {...anotherProps}>
                    {children}
                </View>
            )
    }
}

Box.propTypes = {
    centralize: PropTypes.bool,

    alignCenter: PropTypes.bool,
    alignStart: PropTypes.bool,
    alignEnd: PropTypes.bool,
    alignStretch: PropTypes.bool,

    justifyCenter: PropTypes.bool,
    justifyStart: PropTypes.bool,
    justifyEnd: PropTypes.bool,
    justifySpaceAround: PropTypes.bool,
    justifySpaceBetween: PropTypes.bool,

    flex: PropTypes.string,
    column: PropTypes.bool,
    fit: PropTypes.bool,
    fitAbsolute: PropTypes.bool,
    fitFixed: PropTypes.bool,

    wrap: PropTypes.bool,
    padding: PropTypes.bool,
    paddingSmall: PropTypes.bool,
    margin: PropTypes.bool,
    marginSmall: PropTypes.bool,

    children: PropTypes.any,
    style: PropTypes.any,
    color: PropTypes.string,
    border: PropTypes.bool,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    paper: PropTypes.bool,
    rounded: PropTypes.bool,
    scroll: PropTypes.bool,
}

const styles = theme => StyleSheet.create({
    box: {
        position: 'relative',
        flexDirection: 'row',
    },
    scroll: {
        flex: 1
    },
    scrollInner: {
        flex: 1
    },
    centralize: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    alignCenter: {
        alignItems: 'center',
    },
    alignStart: {
        alignItems: 'flex-start',
    },
    alignEnd: {
        alignItems: 'flex-end',
    },
    alignStretch: {
        alignItems: 'stretch',
    },

    justifyCenter: {
        justifyContent: 'center',
    },
    justifyStart: {
        justifyContent: 'flex-start',
    },
    justifyEnd: {
        justifyContent: 'flex-end',
    },
    justifySpaceAround: {
        justifyContent: 'space-around',
    },
    justifySpaceBetween: {
        justifyContent: 'space-between',
    },

    column: {
        flexDirection: 'column',
    },
    fit: {
        flex: 1,
    },
    fitAbsolute: {
        position: 'absolute',
        top: 0, bottom: 0,
        left: 0, right: 0
    },

    wrap: {
        flexWrap: 'wrap'
    },
    padding: {
        padding: theme.metrics.spacing * 2,
    },
    paddingSmall: {
        padding: theme.metrics.spacing,
    },
    margin: {
        margin: theme.metrics.spacing * 2,
    },
    marginSmall: {
        margin: theme.metrics.spacing,
    },
    border: {
        borderWidth: 1,
        borderColor: '#555'
    },
    paper: {
        backgroundColor: theme.palette.backgroundPrimary,
        borderRadius: theme.metrics.borderRadius,
        elevation: 0,
    },
    rounded: {
        borderRadius: theme.metrics.borderRadius,
    }
})

export default withTheme(styles, Box)