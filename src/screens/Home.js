import React from 'react'
import {StyleSheet, Linking} from 'react-native'
import {withTheme} from "../theme";
import withData from "../api/withData";
import Loading from "../components/Loading";
import Box from "../components/Box";
import FireBase from 'react-native-firebase'
import {Events} from "../constants/Analytics";
import Text from "../components/Text";
import {Routes} from "../navigation/RootNavigation";
import LineIcon from 'react-native-vector-icons/SimpleLineIcons'
import Touchable from "../components/Touchable";
import Spacer from "../components/Spacer";
import Share from 'react-native-share'

class Home extends React.Component {

    async componentDidMount() {
        console.log("Home:componentDidMount - Sending current screen to analytics...")
        FireBase.analytics().logEvent(Events.SessionStart)
        FireBase.analytics().logEvent(Events.OpenHome)

        __DEV__ && this.props.navigation.navigate(Routes.Daily)

        const notificationOpen = await FireBase.notifications().getInitialNotification()
        if (notificationOpen) {
            const {notification} = notificationOpen
            console.log("App opened by notification!")
            await this._doAnalyseNotification(notification)
        }

        this.notificationOpenedListener = FireBase.notifications().onNotificationOpened(async ({notification}) => {
            await this._doAnalyseNotification(notification)
        });
    }

    _doSendTestNotify = async () => {
        const notification = new FireBase.notifications.Notification()
            .setNotificationId('Article')
            .setTitle('História do dia!')
            .setBody("Notification body")
            .setData({article: 'R3eQ9k4gGIQpro0XCFVQ_'})
        notification
            .android.setChannelId('article')
            .android.setSmallIcon('ic_launcher');
        FireBase.notifications().displayNotification(notification)
    }

    _doAnalyseNotification = async (notification) => {
        console.log("Home:notificationOpenedListener - ****************************************")
        console.log("Home:notificationOpenedListener - Notification opened...")
        const {data} = notification
        if (data.daily) {
            this._doOpenDaily()
        }
        else if (data.article) {
            this._doOpenArticle(data.article)
        }
        FireBase.notifications().removeAllDeliveredNotifications()
    }

    _doOpenArticles = () => {
        this.props.navigation.navigate(Routes.Articles)
    }

    _doOpenArticle = async (article) => {
        const aRef = FireBase.firestore().collection('articles').doc(article)
        const doc = await aRef.get()

        if(doc.exists)
            this.props.navigation.navigate(Routes.Article, {article: doc.data()})
    }

    _doOpenDaily = () => {
        this.props.navigation.navigate(Routes.Daily)
    }

    _doOpenBible = () => {
        this.props.navigation.navigate(Routes.Bible)
    }

    _doOpenStories = () => {
        this.props.navigation.navigate(Routes.Stories)
    }

    _doOpenParables = () => {
        this.props.navigation.navigate(Routes.Parables)
    }

    componentWillUnmount() {
        FireBase.analytics().logEvent(Events.SessionEnd)
        this.notificationOpenedListener()
    }

    render() {
        const {data, theme} = this.props
        const {styles} = theme

        return (
            <Box secondary fit column>
                <Loading active={data.dailyLoading || data.settingsLoading || data.articlesLoading} size={56}>
                    <Box scroll>
                        <Box column fit paddingSmall>

                            {
                                !!__DEV__ && (
                                    <Box fit paper primary marginSmall>
                                        <Touchable onPress={this._doSendTestNotify} primary>
                                            <Box padding centralize
                                                 column fit
                                                 style={styles.cardMedia}>
                                                <Spacer vertical large/>
                                                <LineIcon size={72} color={theme.palette.primary}
                                                          name={'bell'}/>
                                                <Spacer vertical/>
                                                <Text size={20} color={theme.palette.primary} center>
                                                    Test notify
                                                </Text>
                                                <Spacer vertical large/>
                                            </Box>
                                        </Touchable>
                                    </Box>
                                )
                            }

                            {
                                !!data.articles.length && (
                                    <Box fit paper primary marginSmall>
                                        <Touchable onPress={this._doOpenArticles} primary>
                                            <Box padding centralize
                                                 column fit
                                                 style={styles.cardMedia}>
                                                <Spacer vertical large/>
                                                <LineIcon size={72} color={theme.palette.primary}
                                                          name={'people'}/>
                                                <Spacer vertical/>
                                                <Text size={20} color={theme.palette.primary} center>
                                                    Histórias Reais
                                                </Text>
                                                <Spacer vertical large/>
                                            </Box>
                                        </Touchable>
                                    </Box>
                                )
                            }

                            <Box>
                                <Box fit paper primary marginSmall>
                                    <Touchable onPress={this._doOpenDaily} primary>
                                        <Box padding centralize
                                             column fit
                                             style={styles.cardMedia}>
                                            <Spacer vertical large/>
                                            <LineIcon size={72} color={theme.palette.primary}
                                                      name={'eyeglass'}/>
                                            <Spacer vertical/>
                                            <Text size={20} color={theme.palette.primary} center>
                                                Oração diária
                                            </Text>
                                            <Spacer vertical large/>
                                        </Box>
                                    </Touchable>
                                </Box>

                                <Box fit paper primary marginSmall>
                                    <Touchable onPress={this._doOpenBible} primary>
                                        <Box padding centralize
                                             column fit
                                             style={styles.cardMedia}>
                                            <Spacer vertical large/>
                                            <LineIcon size={72} color={theme.palette.primary}
                                                      name={'book-open'}/>
                                            <Spacer vertical/>
                                            <Text size={20} color={theme.palette.primary} center>
                                                Bíblia Sagrada
                                            </Text>
                                            <Spacer vertical large/>
                                        </Box>
                                    </Touchable>
                                </Box>
                            </Box>

                            <Box>
                                <Box fit paper primary marginSmall>
                                    <Touchable onPress={this._doOpenStories} primary>
                                        <Box padding centralize
                                             column fit
                                             style={styles.cardMedia}>
                                            <Spacer vertical large/>
                                            <LineIcon size={72} color={theme.palette.primary}
                                                      name={'layers'}/>
                                            <Spacer vertical/>
                                            <Text size={20} color={theme.palette.primary} center>
                                                Histórias Bíblicas
                                            </Text>
                                            <Spacer vertical/>
                                        </Box>
                                    </Touchable>
                                </Box>

                                <Box fit paper primary marginSmall>
                                    <Touchable onPress={this._doOpenParables} primary>
                                        <Box padding centralize
                                             column fit
                                             style={styles.cardMedia}>
                                            <Spacer vertical large/>
                                            <LineIcon size={72} color={theme.palette.primary}
                                                      name={'layers'}/>
                                            <Spacer vertical/>
                                            <Text size={20} color={theme.palette.primary} center>
                                                Parábolas
                                            </Text>
                                            <Spacer vertical/>
                                        </Box>
                                    </Touchable>
                                </Box>
                            </Box>

                            <Box>
                                <Box fit paper primary marginSmall>
                                    <Touchable
                                        onPress={() => {
                                            FireBase.analytics().logEvent(Events.OpenEvaluate)
                                            Linking.openURL('https://play.google.com/store/apps/details?id=com.cytech.bible')
                                        }}
                                        primary>
                                        <Box padding centralize
                                             column fit
                                             style={styles.cardMedia}>
                                            <Spacer vertical large/>
                                            <LineIcon size={72} color={theme.palette.primary}
                                                      name={'star'}/>
                                            <Spacer vertical/>
                                            <Text size={20} color={theme.palette.primary} center>
                                                Avalie Nosso App
                                            </Text>
                                            <Spacer vertical/>
                                        </Box>
                                    </Touchable>
                                </Box>

                                <Box fit paper primary marginSmall>
                                    <Touchable onPress={() => {
                                        FireBase.analytics().logEvent(Events.OpenShare)
                                        Share.open({
                                            url: 'https://play.google.com/store/apps/details?id=com.cytech.bible',
                                            title: 'Receba mensagens e orações diárias, e acesse a Bíblia Sagrada em áudio e texto'
                                        })
                                    }} primary>
                                        <Box padding centralize
                                             column fit
                                             style={styles.cardMedia}>
                                            <Spacer vertical/>
                                            <LineIcon size={72} color={theme.palette.primary}
                                                      name={'share'}/>
                                            <Spacer vertical/>
                                            <Text size={20} color={theme.palette.primary} center>
                                                Compartilhe
                                            </Text>
                                            <Spacer vertical large/>
                                        </Box>
                                    </Touchable>
                                </Box>
                            </Box>

                        </Box>
                    </Box>
                </Loading>
            </Box>
        )
    }
}

const styles = theme => StyleSheet.create({
    cardMedia: {
        borderRadius: theme.metrics.borderRadius,
        borderTopLeftRadius: theme.metrics.borderRadius,
        borderTopRightRadius: theme.metrics.borderRadius,
    }
})

export default withData(withTheme(styles, Home))
