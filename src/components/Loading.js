import React from 'react';
import {ActivityIndicator} from 'react-native'
import {withTheme} from '../theme';
import PropTypes from "prop-types";
import Box from "./Box";


class Loading extends React.Component {
    render() {
        const {
            active,
            size,
            children,
            theme,
            ...props
        } = this.props

        return (
            <Box fit pointerEvents={active ? 'none' : 'auto'} rounded {...props}>
                {children}

                {!!active && (
                    <Box fitAbsolute color={theme.palette.backgroundSecondary} centralize rounded>
                        <ActivityIndicator size={size} color={theme.palette.primary}/>
                    </Box>
                )}
            </Box>
        )
    }
}

Loading.propTypes = {
    active: PropTypes.bool,
    size: PropTypes.oneOfType([
        PropTypes.oneOf(['small', 'large']),
        PropTypes.number
    ])
}

Loading.defaultProps = {
    active: false,
    size: 'small'
}

export default withTheme({}, Loading)