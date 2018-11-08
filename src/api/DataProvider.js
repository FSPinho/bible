import React, {Component} from 'react'
import FireBase from 'react-native-firebase'
import DateFormat from 'dateformat'

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

            lastDaily: [],
        }

        this.unsubscribers = {}
    }

    async componentDidMount() {
        await this.asyncSetState({dailyLoading: true})

        const date = DateFormat(new Date(), 'dd-mm-yyyy')
        console.log('DateProvider:componentDidMount - Getting daily for:', date)
        const dailyRef = FireBase.firestore().collection('daily').orderBy('schedule', 'desc').limit(8)

        await this.asyncSetState({daily: undefined})

        this.unsubscribers.daily = dailyRef.onSnapshot(async querySnapshot => {
            const daily = []

            querySnapshot.forEach(snapshot => {
                console.log('DateProvider:componentDidMount - Got daily:', snapshot.data().schedule)
                daily.push(snapshot.data())
            })

            if (daily.length)
                await this.asyncSetState({
                    daily: daily[0],
                    lastDaily: daily.slice(1),
                    dailyLoading: false
                })
        })
    }

    componentWillUnmount() {
        Object.map(this.unsubscribers).map(k => this.unsubscribers[k]())
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
