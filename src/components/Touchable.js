import PropTypes from 'prop-types';
import React from 'react';
import {Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import {withTheme} from '../theme';


class Touchable extends React.Component {

    pressed = false

    onPress = async () => {
        if (!this.props.disabled && !this.pressed) {
            this.pressed = true
            setTimeout(() => {
                this.props.onPress && this.props.onPress()
                this.pressed = false
            }, 400)
        }
    }

    render() {

        const {primary, children, theme, disabled, onPress, ...props} = this.props

        return (Platform.OS === 'android' && Platform.Version >= 21) ? (
            <TouchableNativeFeedback
                style={{flex: 1, borderRadius: theme.metrics.borderRadius}}
                background={
                    TouchableNativeFeedback.Ripple(
                        disabled ? 'transparent' : primary ?
                            theme.palette.primary : theme.palette.backgroundPrimary,
                        true
                    )
                }
                onPress={this.onPress}
                {...props}>
                {children}
            </TouchableNativeFeedback>
        ) : (
            <TouchableOpacity style={{flexGrow: 1}} {...props} onPress={this.onPress}>
                {children}
            </TouchableOpacity>
        )
    }
}

Touchable.propTypes = {
    theme: PropTypes.any.isRequired,
    primary: PropTypes.bool,
    disabled: PropTypes.bool,
    onPress: PropTypes.func
}

export default withTheme({}, Touchable)