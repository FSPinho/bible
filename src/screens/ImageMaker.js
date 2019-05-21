import React from 'react';
import {ScrollView, StyleSheet, Image, ImageBackground} from 'react-native';
import {Box, Button} from '../components';
import {Alert} from '../services';
import {withTheme} from '../theme';
import Touchable from "../components/Touchable";
import Markdown from 'react-native-markdown-renderer';
import ViewShot, { captureRef } from "react-native-view-shot";
import Share from "react-native-share";

const BG_IMAGES = [
    require('../resources/images/ls-001.jpg'),
    require('../resources/images/ls-002.jpg'),
    require('../resources/images/ls-003.jpg'),
    require('../resources/images/ls-004.jpg'),
    require('../resources/images/ls-005.jpg'),
    require('../resources/images/ls-006.jpg'),
    require('../resources/images/ls-007.jpg'),
]

class ImageMaker extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            text: null,
            background: BG_IMAGES[0],
        }
    }

    componentDidMount = () => {
        const text = this.props.navigation.getParam('text')
        this.setState({...this.state, text})
    }
    componentWillReceiveProps = (props) => {
        const text = props.navigation.getParam('text')
        if (this.state.text !== text) {
            this.setState({...this.state, text})
        }
    }

    _doSetBackground = background => {
        this.setState({...this.state, background})
    }

    _doShare = () => {
        captureRef(this.refs.viewToShare, {
            format: "jpg",
            quality: 0.8,
            result: "data-uri"
        })
            .then(
                uri => {
                    Share.open({url: uri})
                        .then(() => {
                            /** ... */
                        })
                        .catch(error => {
                            console.log(error)
                        });
                },
                error => {
                    Alert.showLongText("Não foi possível compartilhar esta imagem!")
                    console.log(error)
                }
            );
    }

    render() {

        const {theme} = this.props
        const {styles} = theme
        const {text, background} = this.state
        
        return (
            <Box secondary>

                <ScrollView>
                    <Box column alignStretch paddingSmall>
                        <Box paddingSmall justifyCenter>
                            <Button primary onPress={this._doShare}>COMPARTILHAR</Button>
                        </Box>
                        <Box
                            style={{
                                marginLeft: -8,
                                marginRight: -8,
                            }}>
                            <ScrollView horizontal>
                                <Box
                                    style={{
                                        paddingLeft: 8,
                                        paddingRight: 8,
                                    }}>
                                    {
                                        BG_IMAGES.map((_background, i) =>
                                            <Touchable onPress={() => this._doSetBackground(_background)}
                                                       key={i}
                                                       primary>
                                                <Image source={_background}
                                                       style={[
                                                           styles.background,
                                                           (background === _background) ? styles.backgroundActive : null
                                                       ]}/>
                                            </Touchable>
                                        )
                                    }
                                </Box>
                            </ScrollView>
                        </Box>

                        <Box column alignStretch>

                            <Box marginSmall>
                                <ViewShot ref="viewToShare">
                                    <ImageBackground
                                        source={background} style={styles.imageBackground}>
                                        <Box margin fitAbsolute rounded color={theme.palette.primaryText}
                                             style={{opacity: .7}}/>
                                        <Box padding margin column alignStretch>
                                            <Markdown
                                                style={{
                                                    text: {
                                                        color: theme.palette.backgroundPrimaryText,
                                                    }
                                                }}>
                                                {(text || '').replace(/\\n/g, '\n\n')}
                                            </Markdown>
                                        </Box>
                                    </ImageBackground>
                                </ViewShot>
                            </Box>
                        </Box>

                    </Box>
                </ScrollView>
            </Box>
        )
    }
}

const styles = (theme) => StyleSheet.create({
    background: {
        width: 56,
        height: 56,
        borderRadius: 6,
        overflow: 'hidden',
        margin: 8,
    },
    backgroundActive: {
        borderColor: theme.palette.primary,
        borderWidth: 4,
        borderStyle: 'solid',
    },
    imageBackground: {
        width: '100%',
        borderRadius: 6,
    }
})

export default withTheme(styles, ImageMaker)