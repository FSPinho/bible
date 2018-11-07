import React, {Component} from 'react'
import FireBase from 'react-native-firebase'
import {Alert} from '../services'
import NameUtils from "../services/NameUtils"

const {Provider, Consumer} = React.createContext({
    data: undefined
});

export {Consumer}

class DataProvider extends Component {
    constructor(props) {
        super(props)

        this.state = {

            /** True if loaded at least once */
            dirty: false,

            daily: undefined,
            dailyLoading: false,
        }

        this.unsubscribers = {}
    }

    async componentDidMount() {
        const dailyRef = FireBase.firestore().collection('daily').orderBy('timestamp', 'desc').limit(1)
        dailyRef.onSnapshot(querySnapshot => {
            querySnapshot.forEach(async snapshot => {
                await this.asyncSetState({
                    daily: snapshot.data()
                })
            })
        })
    }

    componentWillUnmount() {

    }

    asyncSetState = async state =>
        await new Promise(a => this.setState({...this.state, ...state, dirty: true}, a))

    render() {
        return (
            <Provider
                value={{
                    data: this.state
                }}>
                {this.props.children}
            </Provider>
        )
    }
}


export default DataProvider
