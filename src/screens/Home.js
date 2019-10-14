import React from 'react'
import {Linking, StyleSheet} from 'react-native'
import {withTheme} from "../theme";
import withData from "../api/withData";
import Loading from "../components/Loading";
import Box from "../components/Box";
import FireBase from 'react-native-firebase'
import {Events, Screens} from "../constants/Analytics";
import Text from "../components/Text";
import {Routes} from "../navigation/RootNavigation";
import LineIcon from 'react-native-vector-icons/SimpleLineIcons'
import Touchable from "../components/Touchable";
import Spacer from "../components/Spacer";
import {Daily} from "../screens";
import Phrases from "../constants/Phrases";
import Share from 'react-native-share'
import IconButton from "../components/IconButton";
import Button from "../components/Button";

class Home extends React.Component {

    async componentDidMount() {
        console.log("Home:componentDidMount - Sending current screen to analytics...");
        FireBase.analytics().setCurrentScreen(Screens.ScreenHome);
        FireBase.analytics().logEvent(Events.SessionStart);
        FireBase.analytics().logEvent(Events.OpenHome);

        // __DEV__ && this.props.navigation.navigate(Routes.Daily)

        const notificationOpen = await FireBase.notifications().getInitialNotification();
        if (notificationOpen) {
            const {notification} = notificationOpen;
            console.log("App opened by notification!");
            await this._doAnalyseNotification(notification);
        }

        this.notificationOpenedListener = FireBase.notifications()
            .onNotificationOpened(async ({notification}) => {
                await this._doAnalyseNotification(notification)
            });
    }

    _doSendTestNotify = async () => {
        const notification = new FireBase.notifications.Notification()
            .setNotificationId('Article')
            .setTitle('História do dia!')
            .setBody("Notification body")
            .setData({article: 'R3eQ9k4gGIQpro0XCFVQ_'});
        notification
            .android.setChannelId('article')
            .android.setSmallIcon('ic_launcher');
        FireBase.notifications().displayNotification(notification);
    };

    _doAnalyseNotification = async (notification) => {
        console.log("Home:notificationOpenedListener - ****************************************");
        console.log("Home:notificationOpenedListener - Notification opened...");
        const {data} = notification;
        if (data.daily) {
            this._doOpenDaily();
        }
        else if (data.article) {
            this._doOpenArticle(data.article);
        }
        FireBase.notifications().removeAllDeliveredNotifications();
    };

    _doOpenArticles = () => {
        this.props.navigation.navigate(Routes.Articles);
    };

    _doOpenArticle = async (article) => {
        const aRef = FireBase.firestore().collection('articles').doc(article);
        const doc = await aRef.get();

        if(doc.exists)
            this.props.navigation.navigate(Routes.Article, {article: doc.data()});
    };

    _doOpenDaily = () => {
        this.props.navigation.navigate(Routes.Daily);
    };

    _doOpenBible = () => {
        this.props.navigation.navigate(Routes.Bible);
    };

    _doOpenStories = () => {
        this.props.navigation.navigate(Routes.Stories);
    };

    _doOpenParables = () => {
        this.props.navigation.navigate(Routes.Parables);
    };

    _doOpenImageMaker = (text) => {
        this.props.navigation.navigate(Routes.ImageMaker, {text});
    };

    _doOpenQuiz = () => {
        console.log('Opening Quiz...');
        this.props.navigation.navigate(Routes.Quiz);
    };

    _doRenderCard = (_card) => (
        <Box fit marginSmall paddingSmall alignStretch column paper
             key={_card.title}
             color={_card.color || this.props.theme.palette.primary}>

            <Box fit paddingSmall centralize>
                <Text size={16}
                      color={this.props.theme.palette.primaryText}
                      center>
                    {_card.title}
                </Text>
            </Box>

            <Box fit paddingSmall centralize>
                <Text size={18}
                      color={this.props.theme.palette.primaryText}
                      center>
                    {_card.text}
                </Text>
            </Box>

            {
                !!_card.link && (
                    <Box fit justifyEnd>
                        {
                            !!_card.share && (
                                <IconButton flat
                                            onPress={() => {
                                                FireBase.analytics().logEvent(Events.OpenCardToShare);
                                                Share.open({
                                                    url: _card.link,
                                                    title: 'Receba mensagens e orações diárias, e acesse a Bíblia Sagrada em áudio e texto'
                                                });
                                            }}>
                                    <LineIcon
                                        color={this.props.theme.palette.primaryText}
                                        name={'share'}
                                        size={24}/>
                                </IconButton>
                            )
                        }

                        {
                            !!_card.linkText && (
                                <Button flat
                                        textColor={this.props.theme.palette.primaryText}
                                        onPress={() => {
                                            FireBase.analytics().logEvent(Events.OpenCardToLink);
                                            Linking.openURL(_card.link);
                                        }}>
                                    {_card.linkText}
                                </Button>
                            )
                        }
                    </Box>
                )
            }

        </Box>
    );

    componentWillUnmount() {
        FireBase.analytics().logEvent(Events.SessionEnd);
        this.notificationOpenedListener();
    }

    render() {
        const {data, theme} = this.props;
        const {styles} = theme;

        return (
            <Box secondary fit column>
                <Loading active={data.dailyLoading || data.settingsLoading || data.articlesLoading} size={56}>
                    <Box scroll>
                        <Box column fit paddingSmall>

                            <Box fit marginSmall paddingSmall alignStretch column paper primary>

                                <Box fit paddingSmall centralize>
                                    <Text size={16}
                                          color={theme.palette.backgroundPrimaryTextDisabled}
                                          center>
                                        Frase do dia
                                    </Text>
                                </Box>

                                <Box fit paddingSmall centralize>
                                    <Text size={18}
                                          color={theme.palette.primary}
                                          center>
                                        "{Phrases.getTodaySPhrase()}"
                                    </Text>
                                </Box>

                                <Box fit justifyEnd>
                                    <IconButton flat onPress={() => this._doOpenImageMaker(Phrases.getTodaySPhrase())}>
                                        <LineIcon
                                            color={theme.palette.backgroundPrimaryText}
                                            name={'share'}
                                            size={24}/>
                                    </IconButton>
                                </Box>

                            </Box>

                            {
                                data.cards.filter(c => c.pro).map((_card, _i) => (
                                    _card.link ? (
                                        <Touchable key={_i} onPress={() => {
                                            if (_card.share) {
                                                FireBase.analytics().logEvent(Events.OpenCardToShare);
                                                Share.open({
                                                    url: _card.link,
                                                    title: 'Receba mensagens e orações diárias, e acesse a Bíblia Sagrada em áudio e texto'
                                                });
                                            } else {
                                                FireBase.analytics().logEvent(Events.OpenCardToLink);
                                                Linking.openURL(_card.link);
                                            }
                                        }}>
                                            {this._doRenderCard(_card)}
                                        </Touchable>
                                    ) : (
                                        this._doRenderCard(_card)
                                    )
                                ))
                            }

                            {
                                !!__DEV__ && false && (
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

                            <Box>
                                <Box fit paper primary marginSmall>
                                    <Touchable onPress={this._doOpenQuiz} primary>
                                        <Box padding centralize
                                             column fit
                                             style={styles.cardMedia}>
                                            <Spacer vertical large/>
                                            <LineIcon size={72} color={theme.palette.primary}
                                                      name={'bubbles'}/>
                                            <Spacer vertical/>
                                            <Text size={20} color={theme.palette.primary} center>
                                                Quiz Bíblico
                                            </Text>
                                            <Spacer vertical large/>
                                        </Box>
                                    </Touchable>
                                </Box>
                            </Box>

                            <Daily showSingleDaily navigation={this.props.navigation}/>

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
                                                Mais Orações
                                            </Text>
                                            <Spacer vertical large/>
                                        </Box>
                                    </Touchable>
                                </Box>
                            </Box>

                            <Box>
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
                                            FireBase.analytics().logEvent(Events.OpenEvaluate);
                                            Linking.openURL('https://play.google.com/store/apps/details?id=com.cytech.bible');
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
                                        FireBase.analytics().logEvent(Events.OpenShare);
                                        Share.open({
                                            url: 'https://play.google.com/store/apps/details?id=com.cytech.bible',
                                            title: 'Receba mensagens e orações diárias, e acesse a Bíblia Sagrada em áudio e texto'
                                        });
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
