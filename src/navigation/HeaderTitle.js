import React from 'react';
import {withTheme} from '../theme';
import PropTypes from "prop-types";
import Text from "../components/Text";
import Box from "../components/Box";
import Spacer from "../components/Spacer";


class HeaderTitle extends React.Component {
    render() {

        const {
            text
        } = this.props

        const headerTitle = []
        const maxWidth = typeof text === 'string' ? '100%' : `${80 / (text.length || 1)}%`
        const primaryTextProps = {
            weight: '700',
            primary: true,
            size: 16,
            numberOfLines: 1,
            fit: false,
            style: {maxWidth: '100%'}
        }
        const secondaryTextProps = {
            weight: '400',
            secondary: true,
            size: 16,
            numberOfLines: 1,
            fit: false,
            height: 16,
            style: {maxWidth: '100%'}
        }

        if (typeof text === 'string') {
            headerTitle.push(<Text key={0} children={text} {...primaryTextProps}/>)
        } else if (typeof text !== 'undefined' && typeof text.map === 'function') {
            text.map((t, i) => {

                if (typeof t === 'string') {
                    headerTitle.push(<Text key={i} children={t} {...primaryTextProps}/>)
                } else if (typeof t !== 'undefined' && typeof t.map === 'function') {
                    const column = []
                    t.map((t2, i2) => {
                        column.push(<Text key={i2}
                                          children={t2} {...(i2 === 0 ? primaryTextProps : secondaryTextProps)}
                                          size={12}/>)
                    })
                    headerTitle.push(<Box key={i} column justifyCenter style={{maxWidth}}>{column}</Box>)
                }

                if (i < text.length - 1)
                    headerTitle.push(
                        <Box paddingSmall key={'divider_' + i}>
                            <Text children={' › '} {...primaryTextProps} flex={false}/>
                        </Box>
                    )
            })
        }

        return (
            <Box alignCenter justifyStart fit>
                <Spacer large/>
                {headerTitle}
            </Box>
        )
    }
}

HeaderTitle.propTypes = {
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string)
        ]))
    ]).isRequired
}

export default withTheme({}, HeaderTitle)