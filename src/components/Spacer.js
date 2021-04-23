import React from 'react';
import {withTheme} from '../theme';
import PropTypes from "prop-types";
import Box from "./Box";

class Spacer extends React.Component {

    render() {

        const {large, small, vertical, theme, ...props} = this.props

        return (<Box style={{
            [vertical ? 'height' : 'width']: large ? (theme.metrics.spacing * 2)
                : small ? (theme.metrics.spacing / 2) : theme.metrics.spacing
        }} {...props} />)
    }
}

Spacer.propTypes = {
    large: PropTypes.bool,
    small: PropTypes.bool,
    vertical: PropTypes.bool,
}

export default withTheme({}, Spacer)