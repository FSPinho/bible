import React from 'react'
import {StyleSheet, ScrollView} from 'react-native'
import {withTheme} from "../theme";
import Loading from "../components/Loading";
import {Box, Text} from "../components";
import PropTypes from 'prop-types'
import Spacer from "./Spacer";
import Palette from "../theme/Palette";
import Touchable from "./Touchable";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Button from "./Button";

const QUESTION_LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

class QuestionItem extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            answer: -1,
            answered: false,
            correct: -1
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.text) !== JSON.stringify(nextProps.text))
            this.setState({
                answer: -1,
                answered: false,
                correct: -1
            })
    }

    doSelectAnswer = i =>
        this.setState({
            ...this.state,
            answer: this.state.answer === i ? -1 : i,
        })

    doSubmit = () => {
        let correct = -1
        this.props.answers.map((a, i) => a.correct && (correct = i))
        this.setState({
            answered: true,
            correct,
        }, () => {
            setTimeout(() => {
                if (this.refs.scroll)
                    this.refs.scroll.scrollToEnd({animated: true})
            }, 500)
        })
        this.props.onAnswered && this.props.onAnswered(this.state.answer === correct)
    }

    doRequireNext = () => {
        this.props.onNextQuestionRequired && this.props.onNextQuestionRequired()
        if (this.refs.scroll)
            this.refs.scroll.scrollTo({y: 0, x: 0, animated: true})
    }

    render() {
        const {
            theme,
            text,
            answers,
            alreadyAccepted,
            alreadyAnswered,
            messageIfAccepted,
            messageIfRejected,
        } = this.props
        const {styles} = theme

        const {answer, answered, correct} = this.state

        return (
            <ScrollView style={{flex: 1}} ref="scroll">
                <Box secondary fit padding column>
                    <Loading active={false} size={56}>
                        <Box paper fit column primary paddingSmall>
                            <Box marginSmall column>
                                {
                                    typeof text === 'string' ? (
                                        <Text fit weight={'300'}>{text}</Text>
                                    ) : (
                                        text.map(t => (<Text key={t} fit weight={'300'}>{t}</Text>))
                                    )
                                }
                            </Box>

                            <Box column paddingSmall secondary marginSmall rounded
                                 pointerEvents={answered ? 'none' : 'auto'}>
                                {
                                    answers.map((a, i) => (
                                        <Box key={i}
                                             paper
                                             primary
                                             style={{elevation: answer === i ? 8 : 0, marginBottom: 1}}>
                                            <Touchable primary onPress={() => this.doSelectAnswer(i)}>
                                                <Box alignCenter paddingSmall fit>
                                                    <Box paddingSmall fit>
                                                        <Text
                                                            weight={'900'}>{QUESTION_LETTERS[i]}.</Text>
                                                        <Spacer/>
                                                        <Text fit weight={'300'}>{(a.correct && __DEV__) ? '*' : ''}{a.text}</Text>
                                                    </Box>
                                                    <Box paddingSmall
                                                         style={{borderRadius: 192}}>
                                                        <Icon
                                                            name={'check'}
                                                            size={36}
                                                            color={answer === i ? Palette.Green : theme.palette.backgroundPrimaryTextDisabled}
                                                            weight={'900'}
                                                            style={{opacity: answer === i ? 1 : 0.3}}/>
                                                    </Box>
                                                </Box>
                                            </Touchable>
                                        </Box>
                                    ))
                                }
                            </Box>
                            <Box centralize paddingSmall>
                                {
                                    !!answered ? (
                                        <Box fit centralize column>
                                            <Icon
                                                name={correct === answer ? 'emoticon' : 'emoticon-dead'}
                                                size={56}
                                                color={correct === answer ? Palette.Green : Palette.Red}/>
                                            <Spacer vertical/>
                                            <Text>
                                                {correct === answer ? 'Você acertou!!!' : 'Você errou!'}
                                            </Text>
                                            <Box centralize>
                                                <Text>
                                                    Alternativa correta:
                                                </Text>
                                                <Spacer small/>
                                                <Text children={QUESTION_LETTERS[correct].toUpperCase()} size={20}
                                                      weight={'900'}
                                                      color={correct === answer ? Palette.Green : Palette.Red}/>
                                            </Box>
                                            <Spacer vertical/>
                                            <Box fit centralize>
                                                <Button onPress={this.doRequireNext} primary>PRÓXIMA</Button>
                                            </Box>
                                        </Box>
                                    ) : (
                                        <Box>
                                            <Button disabled={answer === -1} onPress={this.doSubmit}
                                                    primary>SUBMETER</Button>
                                        </Box>
                                    )
                                }
                            </Box>
                        </Box>
                    </Loading>
                </Box>
            </ScrollView>
        )
    }
}

QuestionItem.propTypes = {
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]).isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        correct: PropTypes.bool
    })).isRequired,
    alreadyAnswered: PropTypes.bool,
    alreadyAccepted: PropTypes.bool,
    messageIfAccepted: PropTypes.string,
    messageIfRejected: PropTypes.string,
    onAnswered: PropTypes.func,
    onNextQuestionRequired: PropTypes.func
}

const styles = StyleSheet.create({})

export default withTheme(styles, QuestionItem)
