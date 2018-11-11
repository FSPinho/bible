import React from 'react'
import {Animated, ScrollView, StyleSheet} from 'react-native'
import {withTheme} from "../theme";
import withData from "../api/withData";
import Box from "../components/Box";
import FireBase from 'react-native-firebase'
import {Events} from "../constants/Analytics";
import Text from "../components/Text";
import Line from "../components/Line";
import Spacer from "../components/Spacer";
import TextToSpeech from "../services/TextToSpeech";
import Button from "../components/Button";
import LineIcon from 'react-native-vector-icons/SimpleLineIcons'
import Loading from "../components/Loading";

class BibleBookChapterInner extends React.PureComponent {

    _renderVersicles = () => {
        const {chapter: c, canPlay, onPlayPress, playing, playingPartIndex} = this.props

        let partsIndex = 0
        let partsLength = 0
        let parts = [[]]
        c.versicles.map((v, i) => {
            partsLength += v.title.length

            if (partsLength >= 2048) {
                partsLength = 0
                partsIndex += 1
                parts.push([])
            }

            parts[partsIndex].push({
                element:
                    <Box fit key={i} primary column>
                        {i !== 0 && <Spacer vertical large/>}
                        <Box alignStart>
                            <Text family={'NotoSerif-Regular'} size={14} secondary>{v.index}</Text>
                            <Spacer large/>
                            <Text family={'NotoSerif-Regular'} fit size={18}>{v.title}</Text>
                        </Box>
                    </Box>,
                versicle: v
            })
        })
        return parts.filter(p => !!p.length).map((p, i) => (
            <Box column key={i}>
                <Line/>
                <Box justifySpaceBetween alignCenter paddingSmall>
                    <Box paddingSmall fit column>
                        <Text>Parte {i + 1}</Text>
                    </Box>
                    {!!canPlay && (
                        <Button flat onPress={() => onPlayPress(i, p.map(({versicle}) => versicle))}>
                            <Text>{(playing && playingPartIndex === i) ? 'PARAR' : 'OUVIR'}</Text>
                            <Spacer/>
                            <LineIcon
                                color={this.props.theme.palette.backgroundPrimaryText}
                                name={(playing && playingPartIndex === i) ? 'volume-off' : 'volume-2'} size={24}/>
                        </Button>
                    )}
                </Box>
                <Box column padding>
                    {p.map(({element}) => element)}
                </Box>
            </Box>
        ))
    }

    render() {
        const {chapter: c, canPlay, playing} = this.props
        return (
            <Box column>
                <Box fit paper primary column>
                    <Box paddingSmall alignCenter justifySpaceBetween>
                        <Box paddingSmall fit column>
                            <Text
                                fit
                                numberOfLines={1}>{c.title}</Text>
                            <Text
                                fit
                                numberOfLines={1}
                                secondary>Capítulo {c.index}</Text>
                        </Box>
                    </Box>
                    <Box fit column>
                        {this._renderVersicles()}
                    </Box>
                </Box>
            </Box>
        )
    }
}

const BibleBookChapter = withTheme({}, BibleBookChapterInner)

class BibleBook extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            canPlay: false,
            playing: false,
            playingIndex: -1,
            playingPartIndex: -1,
            currentChapter: 0,
        }
    }

    asyncSetState = async state =>
        await new Promise(a => this.setState({...this.state, ...state}, a))

    _doSelectChapter = async (currentChapter) => {
        await this.asyncSetState({currentChapter})
        // TextToSpeech.stop()
    }

    _doPlay = async (chapter, index, partIndex, parts) => {
        if (this.state.playingIndex !== index || this.state.playingPartIndex !== partIndex) {
            await this.asyncSetState({playing: false, playingIndex: -1, playingPartIndex: -1})
            TextToSpeech.removeAllListeners()
            TextToSpeech.stop()
            TextToSpeech.addEventListener('tts-start', () => this.asyncSetState({
                playing: true,
                playingIndex: index,
                playingPartIndex: partIndex
            }))
            TextToSpeech.addEventListener('tts-cancel', () => this.asyncSetState({
                playing: false,
                playingIndex: -1,
                playingPartIndex: -1
            }))
            TextToSpeech.addEventListener('tts-finish', () => this.asyncSetState({
                playing: false,
                playingIndex: -1,
                playingPartIndex: -1
            }))
            TextToSpeech.playChapter(chapter, parts)

            FireBase.analytics().logEvent(Events.PlayChapter, {
                bi_chapter_title: chapter.title,
            })

        } else {
            TextToSpeech.stop()
        }
    }

    async componentDidMount() {
        console.log("Home:componentDidMount - Sending current screen to analytics...")
        FireBase.analytics().logEvent(Events.OpenBibleBook)

        try {
            await TextToSpeech.initialize()
            this.setState({
                canPlay: true,
            })
        } catch (e) {

        }

        try {

            this.refs.scroll.scrollTo({x: 240, animated: false})
            await this.asyncSetState({loading: false})

            const x = new Animated.Value(240)
            x.addListener(({value}) => {
                if (this.refs.scroll) {
                    this.refs.scroll.scrollTo({x: value, y: 0, animated: false})
                }
            })
            Animated.timing(x, {
                toValue: 0,
                duration: 1800
            }).start()
        } catch (e) {

        }
    }

    componentWillUnmount() {
        TextToSpeech.stop()
    }

    get book() {
        return this.props.navigation.getParam('book')
    }

    render() {
        const {canPlay, playingIndex, playingPartIndex, currentChapter, loading} = this.state

        const c = this.book.chapters[currentChapter]

        console.log('Rendering BibleBook!!!')

        return (
            <Box secondary fit column>
                <Loading active={loading} size={56}>
                    <Box fit column>
                        <Box primary column style={{elevation: 2}}>
                            <ScrollView ref="scroll" horizontal showsHorizontalScrollIndicator={false}>
                                <Box paddingSmall>
                                    <Box paddingSmall centralize>
                                        <Text>Capítulos</Text>
                                    </Box>
                                    <Spacer large/>
                                    {this.book.chapters.map((c, i) =>
										<Box>
	                                        <Button key={i}
	                                                onPress={() => this._doSelectChapter(i)}
	                                                primary={currentChapter === i}>{c.index}</Button>
										</Box>
                                    )}
                                    <Spacer/>
                                </Box>
                            </ScrollView>
                        </Box>
                        <Box scroll>
                            <Box fit padding column>
                                <BibleBookChapter canPlay={canPlay} chapter={c}
                                                  onPlayPress={(i, ps) => this._doPlay(c, currentChapter, i, ps)}
                                                  playing={playingIndex === currentChapter}
                                                  playingPartIndex={playingPartIndex}/>
                            </Box>
                        </Box>
                    </Box>
                </Loading>

                {(!!canPlay && playingIndex !== -1) && (
                    <Box
                        primary
                        paper
                        style={{
                            position: 'absolute',
                            bottom: 16,
                            right: 16,
                            borderRadius: 192,
                        }}>
                        <Button primary onPress={() => TextToSpeech.stop()}>
                            <Text color={this.props.theme.palette.primaryText}>PARAR</Text>
                            <Spacer/>
                            <LineIcon color={this.props.theme.palette.primaryText}
                                      name={'volume-off'} size={24}/>
                        </Button>
                    </Box>
                )}
            </Box>
        )
    }
}

const styles = theme => StyleSheet.create({})

export default withData(withTheme(styles, BibleBook))
