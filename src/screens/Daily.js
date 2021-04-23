import React from 'react'
import {Clipboard, Dimensions, ImageBackground, PixelRatio, Platform, StyleSheet} from 'react-native'
import {withTheme} from "../theme";
import withData from "../api/withData";
import Loading from "../components/Loading";
import Box from "../components/Box";
import FireBase from 'react-native-firebase'
import {Events, Screens} from "../constants/Analytics";
import Markdown from 'react-native-markdown-renderer';
import TextToSpeech from "../services/TextToSpeech";
import RemoveMarkdown from 'remove-markdown'
import Text from "../components/Text";
import LineIcon from "react-native-vector-icons/SimpleLineIcons";
import Line from "../components/Line";
import IconButton from "../components/IconButton";
import Alert from "../services/Alert";
import {Routes} from "../navigation/RootNavigation";
import DateFormat from 'dateformat';

class Daily extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            canPlay: false,
            playing: false,
        }
    }

    asyncSetState = async state =>
        await new Promise(a => this.setState({...this.state, ...state, dirty: true}, a))

    async componentDidMount() {
        console.log("Home:componentDidMount - Sending current screen to analytics...");

        if (!this.props.showSingleDaily) {
            FireBase.analytics().setCurrentScreen(Screens.ScreenDaily);
            FireBase.analytics().logEvent(Events.OpenDaily, { bi_daily_schedule: DateFormat(new Date(), 'yyyy-mm-dd') });
        }

        if (this.props.data.daily) {
            try {
                await TextToSpeech.initialize()
                this.setState({
                    canPlay: this.cleanData.length <= 2048,
                })
            } catch (e) {

            }
        }
    }

    componentWillUnmount() {
        TextToSpeech.stop()
    }

    async componentWillReceiveProps(props) {
        if (this.props.data.daily) {
            try {
                await TextToSpeech.initialize()
                this.setState({
                    canPlay: this.cleanData.length <= 2048,
                })
            } catch (e) {

            }
        }
    }

    _doPlay = async () => {
        if (!this.state.playing) {
            await this.asyncSetState({playing: false})
            TextToSpeech.removeAllListeners()
            TextToSpeech.stop()
            TextToSpeech.addEventListener('tts-start', () => this.asyncSetState({playing: true}))
            TextToSpeech.addEventListener('tts-cancel', () => this.asyncSetState({playing: false}))
            TextToSpeech.addEventListener('tts-finish', () => this.asyncSetState({playing: false}))
            TextToSpeech.play(this.cleanData)

            FireBase.analytics().logEvent(Events.PlayDaily, {
                bi_daily_schedule: this.props.data.daily.schedule
            })

        } else {
            TextToSpeech.stop()
        }
    }

    _doCopyToClipBoard = (daily) => {
        Clipboard.setString("Oração do dia:\n" + RemoveMarkdown(daily.data).replace(/\\n/g, ' '))
        Alert.showText("Oração copiada!")
    }

    _doOpenImageMaker = (daily) => {
        const text = daily.data
        this.props.navigation.navigate(Routes.ImageMaker, {text})
    }

    get cleanData() {
        return RemoveMarkdown(this.props.data.daily.data).replace(/\\n/g, '.')
    }


    _getDailyAspectRatio = (daily) => {
        const imageAspectTXT = daily.imageAspectRatio || daily.imageAspect|| daily.imageRatio || '16x9'
        return {
            width: parseFloat(imageAspectTXT.split('x')[0]) || 16,
            height: parseFloat(imageAspectTXT.split('x')[1]) || 9,
        }
    }

    _getDailyImageSize = (daily) => {
        const {width} = Dimensions.get('screen');
        const imageAspect = this._getDailyAspectRatio(daily);
        return {
            width: width ,
            height: width * imageAspect.height / imageAspect.width,
        }
    }

    _getDailyImageURI = (daily) => {
        const size = this._getDailyImageSize(daily);
        return daily.image.replace(
            '/upload/',
            `/upload/c_thumb,g_face,w_${PixelRatio.getPixelSizeForLayoutSize(parseInt(size.width))},h_${PixelRatio.getPixelSizeForLayoutSize(parseInt(size.height))}/`
        )
    }

    render() {
        const {playing, canPlay} = this.state
        const {data, theme, showSingleDaily} = this.props

        const {daily, lastDaily} = data

        return (
            <Box fit column primary>
                <Loading active={data.dailyLoading} size={56}>
                    <Box scroll>
                        <Box column fit>

                            {
                                !!daily && (
                                    <Box column>
                                        {
                                            daily.image &&
                                            <Box style={{...this._getDailyImageSize(daily)}}>
                                                <Box fitAbsolute centralize secondary>
                                                    <Text>Carregando Imagem...</Text>
                                                </Box>
                                                <ImageBackground
                                                    style={{...StyleSheet.absoluteFillObject}}
                                                    source={{
                                                        uri: this._getDailyImageURI(daily)
                                                    }}/>
                                            </Box>
                                        }

                                        <Box column alignStretch paddingSmall>
                                            <Box alignCenter justifySpaceBetween>
                                                <Box paddingSmall>
                                                    <Text bold size={18}>Oração de hoje</Text>
                                                </Box>

                                                <Box>
                                                    <IconButton flat onPress={() => this._doOpenImageMaker(daily)}>
                                                        <LineIcon
                                                            color={theme.palette.backgroundPrimaryText}
                                                            name={'share'}
                                                            size={24}/>
                                                    </IconButton>
                                                    <IconButton flat onPress={() => this._doCopyToClipBoard(daily)}>
                                                        <LineIcon
                                                            color={theme.palette.backgroundPrimaryText}
                                                            name={'docs'}
                                                            size={24}/>
                                                    </IconButton>
                                                    {canPlay && (
                                                        <IconButton flat onPress={this._doPlay}>
                                                            <LineIcon color={this.props.theme.palette.backgroundPrimaryText}
                                                                      name={playing ? 'volume-off' : 'volume-2'} size={24}/>
                                                        </IconButton>
                                                    )}
                                                </Box>
                                            </Box>

                                            {
                                                !!daily && (
                                                    <Box fit paddingSmall>
                                                        <Markdown
                                                            style={{
                                                                text: {
                                                                    color: theme.palette.backgroundPrimaryText,
                                                                }
                                                            }}>
                                                            {daily.data.replace(/\\n/g, '\n\n')}
                                                        </Markdown>
                                                    </Box>
                                                )
                                            }
                                        </Box>
                                    </Box>
                                )
                            }

                            {
                                !showSingleDaily && !!lastDaily && !!lastDaily.length && lastDaily.map(d => (
                                    <>
                                        <Box primary column style={{elevation: 2}} key={d.schedule}>
                                            {
                                                d.image &&
                                                <Box style={{...this._getDailyImageSize(d)}}>
                                                    <Box fitAbsolute centralize secondary>
                                                        <Text>Carregando Imagem...</Text>
                                                    </Box>
                                                    <ImageBackground
                                                        style={{...StyleSheet.absoluteFillObject}}
                                                        source={{
                                                            uri: this._getDailyImageURI(d)
                                                        }}/>
                                                </Box>
                                            }

                                            <Box column alignStretch paddingSmall>
                                                <Box alignCenter justifySpaceBetween>
                                                    <Box paddingSmall>
                                                        <Text>Oração do dia {d.schedule.replace(/-/g, '/')}</Text>
                                                    </Box>

                                                    <Box>
                                                        <IconButton flat onPress={() => this._doOpenImageMaker(d)}>
                                                            <LineIcon
                                                                color={theme.palette.backgroundPrimaryText}
                                                                name={'share'}
                                                                size={24}/>
                                                        </IconButton>
                                                        <IconButton flat onPress={() => this._doCopyToClipBoard(d)}>
                                                            <LineIcon
                                                                color={theme.palette.backgroundPrimaryText}
                                                                name={'docs'}
                                                                size={24}/>
                                                        </IconButton>
                                                    </Box>
                                                </Box>

                                                <Box fit paddingSmall>
                                                    <Markdown
                                                        style={{
                                                            ...mdStyles,
                                                            text: {
                                                                ...mdStyles.text,
                                                                color: theme.palette.backgroundPrimaryText,
                                                            }
                                                        }}>
                                                        {d.data.replace(/\\n/g, '\n\n')}
                                                    </Markdown>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Line/>
                                    </>
                                ))
                            }

                        </Box>
                    </Box>
                </Loading>
            </Box>
        )
    }
}

export const mdStyles = {
    root: {},
    view: {},
    codeBlock: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 4,
    },
    codeInline: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 4,
    },
    del: {
        backgroundColor: '#000000',
    },
    em: {
        fontStyle: 'italic',
    },
    headingContainer: {
        flexDirection: 'row',
    },
    heading: {},
    heading1: {
        fontSize: 32,
    },
    heading2: {
        fontSize: 24,
    },
    heading3: {
        fontSize: 18,
    },
    heading4: {
        fontSize: 16,
    },
    heading5: {
        fontSize: 13,
    },
    heading6: {
        fontSize: 11,
    },
    hr: {
        backgroundColor: '#000000',
        height: 1,
    },
    blockquote: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        margin: 20,
        backgroundColor: '#CCCCCC',
    },
    inlineCode: {
        borderRadius: 3,
        borderWidth: 1,
        fontFamily: 'Courier',
        fontWeight: 'bold',
    },
    list: {},
    listItem: {
        flex: 1,
        flexWrap: 'wrap',
        // backgroundColor: 'green',
    },
    listUnordered: {},

    listUnorderedItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    listUnorderedItemIcon: {
        marginLeft: 10,
        marginRight: 10,
        ...Platform.select({
            ['ios']: {
                lineHeight: 36,
            },
            ['android']: {
                lineHeight: 30,
            },
        }),
    },
    listUnorderedItemText: {
        fontSize: 20,
        lineHeight: 20,
    },

    listOrdered: {},
    listOrderedItem: {
        flexDirection: 'row',
    },
    listOrderedItemIcon: {
        marginLeft: 10,
        marginRight: 10,
        ...Platform.select({
            ['ios']: {
                lineHeight: 36,
            },
            ['android']: {
                lineHeight: 30,
            },
        }),
    },
    listOrderedItemText: {
        fontWeight: 'bold',
        lineHeight: 20,
    },
    paragraph: {
        marginTop: 10,
        marginBottom: 10,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    hardbreak: {
        width: '100%',
        height: 1,
    },
    strong: {
        fontWeight: 'bold',
    },
    table: {
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 3,
    },
    tableHeader: {},
    tableHeaderCell: {
        flex: 1,
        // color: '#000000',
        padding: 5,
        // backgroundColor: 'green',
    },
    tableRow: {
        borderBottomWidth: 1,
        borderColor: '#000000',
        flexDirection: 'row',
    },
    tableRowCell: {
        flex: 1,
        padding: 5,
    },
    text: {},
    strikethrough: {
        textDecorationLine: 'line-through',
    },
    link: {
        textDecorationLine: 'underline',
    },
    blocklink: {
        flex: 1,
        borderColor: '#000000',
        borderBottomWidth: 1,

    },
    u: {
        borderColor: '#000000',
        borderBottomWidth: 1,
    },
    image: {
        flex: 1,
    },
}

export default withData(withTheme({}, Daily))
