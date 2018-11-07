import React, {Component} from 'react'
import hoistStatics from 'hoist-non-react-statics';
import {Consumer} from './DataProvider'

export default (_Component) => {
    const Wrapper = class WithData extends Component {
        render() {
            const {...props} = this.props
            return (
                <Consumer>
                    {
                        ({data}) => (
                            <_Component
                                data={data}
                                {...props} />
                        )
                    }
                </Consumer>
            )
        }
    }

    return hoistStatics(Wrapper, _Component)
}