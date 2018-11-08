import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {withTheme} from "../theme";
import withData from "../api/withData";
import Loading from "../components/Loading";
import Box from "../components/Box";
import FireBase from 'react-native-firebase'
import {Events} from "../constants/Analytics";
import Markdown from 'react-native-simple-markdown'
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
                                                styles={{
                                                    text: {
                                                        color: theme.palette.backgroundPrimaryText,
                                                        // fontFamily: 'NotoSerif-Regular'
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
                                                styles={{
                                                    text: {
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

const styles = theme => StyleSheet.create({})

export default withData(withTheme(styles, Daily))
