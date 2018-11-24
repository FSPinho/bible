import React from 'react'
import {Platform} from 'react-native'
import {withTheme} from "../theme";
import withData from "../api/withData";
import Loading from "../components/Loading";
import Box from "../components/Box";
import FireBase from 'react-native-firebase'
import {Events} from "../constants/Analytics";
import Markdown from 'react-native-markdown-renderer';
import TextToSpeech from "../services/TextToSpeech";
import RemoveMarkdown from 'remove-markdown'
import Text from "../components/Text";
import Button from "../components/Button";
import Spacer from "../components/Spacer";
import LineIcon from "react-native-vector-icons/SimpleLineIcons";
import Line from "../components/Line";

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
        console.log("Home:componentDidMount - Sending current screen to analytics...")

        if (this.props.data.daily) {
            FireBase.analytics().logEvent(Events.OpenDaily, {
                bi_daily_schedule: this.props.data.daily.schedule
            })
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
            FireBase.analytics().logEvent(Events.OpenDaily, {
                bi_daily_schedule: this.props.data.daily.schedule
            })
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

    get cleanData() {
        return RemoveMarkdown(this.props.data.daily.data).replace(/\\n/g, '.')
    }

    render() {
        const {playing, canPlay} = this.state
        const {data, theme} = this.props

        const {daily, lastDaily} = data

        return (
            <Box secondary fit column>
                <Loading active={data.dailyLoading} size={56}>
                    <Box scroll>
                        <Box column fit paddingSmall>

                            <Box primary paper column style={{elevation: 2}} marginSmall>
                                <Box alignCenter justifySpaceBetween marginSmall>
                                    <Box paddingSmall>
                                        <Text>Oração de hoje</Text>
                                    </Box>
                                    {canPlay && (
                                        <Button flat onPress={this._doPlay}>
                                            <Text>{playing ? 'PARAR' : 'OUVIR'}</Text>
                                            <Spacer/>
                                            <LineIcon color={this.props.theme.palette.backgroundPrimaryText}
                                                      name={playing ? 'volume-off' : 'volume-2'} size={24}/>
                                        </Button>
                                    )}
                                </Box>
                                <Line/>
                                {
                                    !!daily && (
                                        <Box fit paddingSmall marginSmall>
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

                            {
                                !!lastDaily && !!lastDaily.length && lastDaily.map(d => (
                                    <Box primary paper column style={{elevation: 2}} marginSmall key={d.schedule}>
                                        <Box alignCenter justifySpaceBetween marginSmall>
                                            <Box paddingSmall>
                                                <Text>Oração do dia {d.schedule.replace(/-/g, '/')}</Text>
                                            </Box>
                                        </Box>
                                        <Line/>
                                        <Box fit paddingSmall marginSmall>
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
                                ))
                            }

                        </Box>
                    </Box>
                </Loading>
            </Box>
        )
    }
}

const mdStyles = {
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
