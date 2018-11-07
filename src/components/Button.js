import React from 'react';
import {withTheme} from '../theme';
import PropTypes from "prop-types";
import Box from "./Box";
import Text from './Text'
import Touchable from "./Touchable";


class Button extends React.Component {
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
            ...props
        } = this.props

        return (
            <Box
                style={{
                    borderRadius: theme.metrics.borderRadius,
                    overflow: 'hidden'
                }}
                centralize

                {...props}>
                <Touchable onPress={onPress} primary={flat || (!primary && !accent)}
                           disabled={disabled}>
                    <Box
                        style={{
                            paddingLeft: size === 'small' ? 12 : size === 'big' ? 20 : 18,
                            paddingRight: size === 'small' ? 12 : size === 'big' ? 20 : 18,
                            paddingTop: size === 'small' ? 8 : size === 'big' ? 14 : 12,
                            paddingBottom: size === 'small' ? 8 : size === 'big' ? 14 : 12,
                            borderRadius: theme.metrics.borderRadius,
                            overflow: 'hidden'
                        }}
                        centralize
                        color={disabled ? theme.palette.backgroundPrimaryTextDisabled : color ? color : !flat ? (
                            primary ? theme.palette.primary
                                : accent ? theme.palette.accent
                                : theme.palette.backgroundPrimary
                        ) : 'transparent'}>
                        {
                            typeof children === 'string' ? (
                                <Text
                                    size={size === 'small' ? 10 : size === 'big' ? 24 : 14}
                                    color={textColor ? textColor : flat ? (
                                        primary ? theme.palette.primary
                                            : accent ? theme.palette.accent
                                            : theme.palette.backgroundPrimary
                                    ) : (
                                        primary ? theme.palette.primaryText
                                            : accent ? theme.palette.accentTextPrimary
                                            : theme.palette.backgroundPrimaryTextPrimary
                                    )}
                                >
                                    {children}
                                </Text>
                            ) : children
                        }
                    </Box>
                </Touchable>
            </Box>
        )
    }
}

Button.propTypes = {
    size: PropTypes.oneOf(['small', 'big']),
    flat: PropTypes.bool,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    color: PropTypes.string,
    textColor: PropTypes.string,
    primary: PropTypes.bool,
    accent: PropTypes.bool,
}

export default withTheme({}, Button)