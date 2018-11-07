import React from 'react';
import {Text as RNText} from 'react-native';
import {withTheme} from '../theme';
import PropTypes from "prop-types";


class Text extends React.Component {
    render() {

        const {
            size,
            color,
            weight,
            thin,
            light,
            medium,
            bold,
            black,
            center,
            style,
            theme,
            secondary,
            disabled,
            fit,
            ...props
        } = this.props

        return <RNText style={[{
            fontSize: size,
            // lineHeight: size * 1.05,
            fontWeight: weight || (
                thin ? '200' : light ? '300' : medium ? '500' : bold ? '700' : black ? '900' : '400'
            ),
            color: color || (
                disabled ? theme.palette.backgroundPrimaryTextDisabled
                    : secondary ? theme.palette.backgroundPrimaryTextSecondary
                    : theme.palette.backgroundPrimaryTextPrimary
            ),
            textAlign: center ? 'center' : 'left',
            opacity: secondary ? 0.7 : 1,
        }, fit ? {flex: 1} : undefined, style]} {...props} />
    }
}

Text.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    weight: PropTypes.string,
    thin: PropTypes.bool,
    light: PropTypes.bool,
    medium: PropTypes.bool,
    bold: PropTypes.bool,
    black: PropTypes.bool,
    center: PropTypes.bool,
    secondary: PropTypes.bool,
    disabled: PropTypes.bool,
    fit: PropTypes.bool,
}

export default withTheme({}, Text)