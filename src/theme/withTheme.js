import React, {Component} from 'react'
import hoistStatics from 'hoist-non-react-statics';
import {Consumer} from './ThemeProvider'

export default (styles, _Component) => {
    const Wrapper = class WithPremium extends Component {
        render() {
            const {...props} = this.props
            return (
                <Consumer>
                    {
                        ({theme, light, doEnableDark, doEnableLight, doToggleTheme}) => {
                            this.styles = typeof styles === 'function' ? styles(theme) : styles

                            return (
                                <_Component
                                    theme={{
                                        ...theme,
										light,
                                        doEnableLight,
                                        doEnableDark,
										doToggleTheme,
                                        styles: this.styles
                                    }}
                                    {...props} />
                            )
                        }
                    }
                </Consumer>
            )
        }
    }

    return hoistStatics(Wrapper, _Component)
}
