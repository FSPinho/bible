import React from 'react';
import {withTheme} from '../theme';
import PropTypes from "prop-types";
import Box from "./Box";
import LineIcon from 'react-native-vector-icons/SimpleLineIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Touchable from "./Touchable";


class IconButton extends React.Component {
    render() {
        const {
            size,
            flat,
            onPress,
            disabled,
            primary,
            accent,
            color,
            textColor,
            theme,
            children,
            icon,
            iconComponent,
            ...props
        } = this.props

        const _Icon = iconComponent === 'simple-line-icons'  ? LineIcon : MaterialIcon

        return (
            <Box
                style={{
                    borderRadius: 1000,
                    overflow: 'hidden'
                }}
                centralize

                {...props}>
                <Touchable onPress={onPress} primary={flat || (!primary && !accent)}>
                    <Box
                        style={{
                            paddingLeft: size === 'small' ? 10 : size === 'big' ? 14 : 12,
                            paddingRight: size === 'small' ? 10 : size === 'big' ? 14 : 12,
                            paddingTop: size === 'small' ? 10 : size === 'big' ? 14 : 12,
                            paddingBottom: size === 'small' ? 10 : size === 'big' ? 14 : 12,
                            borderRadius: 1000,
                            overflow: 'hidden'
                        }}
                        centralize
                        color={color || !flat ? (
                            primary ? theme.palette.primary
                                : accent ? theme.palette.accent
                                : theme.palette.backgroundPrimary
                        ) : 'transparent'}>
                        <_Icon
                            name={icon}
                            size={size === 'small' ? 14 : size === 'big' ? 36 : 24}
                            color={textColor ? textColor : flat ? (
                                primary ? theme.palette.primary
                                    : accent ? theme.palette.accent
                                    : theme.palette.backgroundPrimaryTextPrimary
                            ) : (
                                primary ? theme.palette.primaryTextPrimary
                                    : accent ? theme.palette.accentTextPrimary
                                    : theme.palette.backgroundPrimaryTextPrimary
                            )}>

                            {children}

                        </_Icon>
                    </Box>
                </Touchable>
            </Box>
        )
    }
}

IconButton.propTypes = {
    size: PropTypes.oneOf(['small', 'big']),
    flat: PropTypes.bool,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    color: PropTypes.string,
    textColor: PropTypes.string,
    primary: PropTypes.bool,
    accent: PropTypes.bool,
    icon: PropTypes.string,
    iconComponent: PropTypes.oneOf([
        'simple-line-icons',
        'material-community'
    ])
}

IconButton.defaultProps = {
    iconComponent: 'simple-line-icons'
}

export default withTheme({}, IconButton)