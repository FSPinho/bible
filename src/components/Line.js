import React from 'react';
import {withTheme} from '../theme';
import PropTypes from "prop-types";
import Box from "./Box";

class Spacer extends React.Component {

    render() {

        const {vertical, theme, ...props} = this.props

        return (<Box color={theme.palette.backgroundPrimaryTextDisabled}
                     style={{
                         [vertical ? 'height' : 'width']: '100%',
                         [!vertical ? 'height' : 'width']: 1,
                     }} {...props} />)
    }
}

Spacer.propTypes = {
    vertical: PropTypes.bool,
}

export default withTheme({}, Spacer)