import React from 'react'
import {withTheme} from "../theme";
import withData from "../api/withData";
import Box from "../components/Box";
import FireBase from 'react-native-firebase'
import {Events, Screens} from "../constants/Analytics";
import Button from "../components/Button";
import QuizData from "../constants/Quiz";
import {FadeFromDown, Text} from "../components";
import Touchable from "../components/Touchable";

const DEF_QUIZ_SIZE = __DEV__ ? 8 : 10;

class Quiz extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            questions: QuizData.getQuestionsSet(DEF_QUIZ_SIZE),
            currentQuestion: 0,
            currentQuestionVisible: true,
            currentAnswer: null,
            pointsTotal: 0,
            pointsEarned: 0
        }
    }

    async componentDidMount() {
        console.log("Home:componentDidMount - Sending current screen to analytics...")
        FireBase.analytics().setCurrentScreen(Screens.ScreenQuiz)
        FireBase.analytics().logEvent(Events.StartQuiz)
    }

    _doNext = () => {
        this.setState({...this.state, currentQuestionVisible: false, currentAnswer: null});
        setTimeout(() => {
            this.setState({...this.state, currentQuestion: this.state.currentQuestion + 1,
                currentQuestionVisible: true});
        }, 600);
    };

    _markAnswer = (_op, question) => {
        this.setState({
            ...this.state,
            pointsTotal: this.state.pointsTotal + 1,
            pointsEarned: (_op === question.answer) ? (this.state.pointsEarned + 1) : this.state.pointsEarned,
            currentAnswer: _op,
        })
    }

    _doRestart = () => {
        this.setState({
            questions: QuizData.getQuestionsSet(DEF_QUIZ_SIZE),
            currentQuestion: 0,
            currentQuestionVisible: true,
            currentAnswer: null,
            pointsTotal: 0,
            pointsEarned: 0
        });
    }

    render() {

        const {theme} = this.props

        const currentQuestion = this.state.questions[this.state.currentQuestion]

        const currentEarned = ((this.state.pointsEarned / this.state.pointsTotal) * 10).toFixed(2);

        let optionIndex = 0;

        return (
            <Box secondary fit column>
                <Box scroll>
                    <Box column fit paddingSmall>
                        {this.state.currentQuestion > 0 && <Box fit paddingSmall>
                            <Box marginSmall>
                                <Text>{this.state.currentQuestion}/{this.state.questions.length}</Text>
                            </Box>
                            <Box rounded fit marginSmall paper primary>
                                <Box rounded color={theme.palette.primary}
                                     paper
                                     style={{ width: Math.min(this.state.currentQuestion / this.state.questions.length, 1) * 100 + '%' }}>
                                </Box>
                            </Box>
                        </Box>}

                        {!currentQuestion && <FadeFromDown visible={!currentQuestion}>
                            <Box paper primary marginSmall alignStretch column>
                                <Box column paddingSmall alignStretch>
                                    <Box paddingSmall centralize>
                                        <Text size={24}
                                              color={currentEarned < 4 ? theme.palette.error
                                                  : currentEarned < 7 ? theme.palette.warn
                                                      : theme.palette.primary}
                                              center>Sua nota foi {currentEarned}!</Text>
                                    </Box>
                                    <Box alignCenter justifyEnd marginSmall>
                                        <Button onPress={this._doRestart} primary>
                                            Fazer Quiz Novamente
                                        </Button>

                                        <Box paddingSmall>

                                        </Box>

                                        <Button onPress={() => this.props.navigation.goBack()} primary>
                                            Voltar
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </FadeFromDown>}

                        {!!currentQuestion && <FadeFromDown visible={!!this.state.currentQuestionVisible && currentQuestion}>
                            <Box paper primary marginSmall alignStretch column>
                                <Box column paddingSmall alignStretch>

                                    <Box paddingSmall centralize>
                                        <Text size={20} center>{currentQuestion.text}</Text>
                                    </Box>

                                    {!currentQuestion.is_greeting && <Box column alignStretch>
                                        {currentQuestion.options.map((_op, _i) => (
                                            _op ?
                                            <Box key={_i} paper column marginSmall alignStretch
                                                 color={(_i + 1) === this.state.currentAnswer ? theme.palette.primary : (this.state.currentAnswer && (_i + 1) === currentQuestion.answer) ? theme.palette.success : null}>
                                                <Touchable disabled={this.state.currentAnswer} primary onPress={() => this._markAnswer(_i + 1, currentQuestion)}>
                                                    <Box padding centralize>
                                                        <Text
                                                            color={(_i + 1) === this.state.currentAnswer ? theme.palette.primaryText : (this.state.currentAnswer && (_i + 1) === currentQuestion.answer) ? theme.palette.primaryText : theme.palette.backgroundPrimaryText}
                                                            center>{['A', 'B', 'C', 'D', 'E'][optionIndex++] + '. ' + _op}</Text>
                                                    </Box>
                                                </Touchable>
                                            </Box> : null
                                        ))}
                                    </Box>}

                                    {(this.state.currentAnswer === currentQuestion.answer && !currentQuestion.is_greeting) && (
                                        <Box padding>
                                            <Text color={theme.palette.accent}>
                                                Você acertou!
                                            </Text>
                                        </Box>
                                    )}

                                    {(this.state.currentAnswer !== null &&
                                        this.state.currentAnswer !== currentQuestion.answer &&
                                        !currentQuestion.is_greeting) && (
                                        <Box padding>
                                            <Text color={theme.palette.error}>
                                                Você errou! A resposta correta é a letra {currentQuestion.answerLetter}!
                                            </Text>
                                        </Box>
                                    )}

                                    <Box alignCenter justifyEnd marginSmall>
                                        {currentQuestion.is_starting &&
                                        <Button disabled={!this.state.currentAnswer && !currentQuestion.is_greeting} onPress={this._doNext} primary> Começar </Button>}

                                        {!currentQuestion.is_final && !currentQuestion.is_starting
                                        && <Button disabled={!this.state.currentAnswer && !currentQuestion.is_greeting} onPress={this._doNext} primary> Próximo </Button>}

                                        {currentQuestion.is_final &&
                                        <Button disabled={!this.state.currentAnswer && !currentQuestion.is_greeting} onPress={this._doNext} primary> Finalizar </Button>}
                                    </Box>
                                </Box>
                            </Box>
                        </FadeFromDown>}
                    </Box>
                </Box>
            </Box>
        )
    }
}

export default withData(withTheme({}, Quiz))
