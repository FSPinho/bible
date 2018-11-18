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

            articles: [],
            articlesLoading: false,


            settings: {
                canShowAds: false,
            },
            settingsLoading: false,
        }

        this.unsubscribers = {}
    }

    async componentDidMount() {
        await this.asyncSetState({
            dailyLoading: true,
            articlesLoading: true,
            settingsLoading: true
        })

        /**
         * Getting available daily
         * */
        const dailyRef = FireBase.firestore().collection('daily').orderBy('schedule', 'desc').limit(8)
        let initialData = await dailyRef.get()
        if (initialData.empty) {
            console.log('DateProvider:componentDidMount - No daily found!')
            await this.asyncSetState({
                dailyLoading: false
            })
        }
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
            else
                await this.asyncSetState({
                    dailyLoading: false
                })
        })

        /**
         * Getting available articles
         * */
        const articlesRef = FireBase.firestore().collection('articles').orderBy('timestamp', 'desc').limit(32)
        initialData = await articlesRef.get()
        if (initialData.empty) {
            console.log('DateProvider:componentDidMount - No articles found!')
            await this.asyncSetState({
                articlesLoading: false
            })
        }
        this.unsubscribers.articles = articlesRef.onSnapshot(async querySnapshot => {
            const articles = []

            querySnapshot.forEach(snapshot => {
                console.log('DateProvider:componentDidMount - Got article:', snapshot.data().author)
                articles.push(snapshot.data())
            })

            await this.asyncSetState({
                articles,
                articlesLoading: false
            })
        })

        /**
         * Getting available settings
         * */
        const settingsRef = FireBase.firestore().collection('settings').limit(32)
        initialData = await settingsRef.get()
        if (initialData.empty) {
            console.log('DateProvider:componentDidMount - No settings found!')
            await this.asyncSetState({
                settingsLoading: false
            })
        }
        this.unsubscribers.settings = settingsRef.onSnapshot(async querySnapshot => {
            let settings = this.state.settings

            querySnapshot.forEach(snapshot => {
                settings = {...settings, ...snapshot.data()}
            })

            console.log('DateProvider:componentDidMount - Got setting:', JSON.stringify(settings))

            await this.asyncSetState({
                settings,
                settingsLoading: false
            })
        })
    }

    componentWillUnmount() {
        Object.keys(this.unsubscribers).map(k => this.unsubscribers[k]())
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
