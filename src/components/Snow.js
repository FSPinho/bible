import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, Animated, Easing, Dimensions, Image} from 'react-native';
import {withTheme} from '../theme';
import Box from "./Box";
import FireBase from "react-native-firebase";
import {Events} from "../constants/Analytics";
import Text from "./Text";
import withData from "../api/withData";

const Banner = FireBase.admob.Banner;

class SnowFlake extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            x: -100,
            y: -100,
            size: 128,
        }
    }

    async componentDidMount() {
        await this._doStart()
    }

    asyncSetState = async state =>
        await new Promise(a => this.setState({...this.state, ...state}, a))

    _doStart = async () => {
        await this.asyncSetState({
            x: new Animated.Value(Math.random() * Dimensions.get('screen').width * 2 - Dimensions.get('screen').width / 2),
            y: new Animated.Value(-100),
            size: (Math.random()) * 42 + 4,
        })

        const duration = Math.random() * 4000 + 4000

        Animated.parallel([
            Animated.timing(this.state.x, {
                toValue: Math.random() * Dimensions.get('screen').width * 2 - Dimensions.get('screen').width / 2,
                useNativeDrive: true,
                duration,
                easing: Easing.bezier(.8, .2, .2, .8),
                delay: 8000 / (this.props.index || 1)
            }),
            Animated.timing(this.state.y, {
                toValue: Dimensions.get('screen').height + 100,
                useNativeDrive: true,
                duration,
                easing: Easing.bezier(.8, .2, .2, .8),
                delay: 8000 / (this.props.index || 1)
            })
        ]).start(this._doStart)
    }

    render() {

        const {size, x, y} = this.state

        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    top: y,
                    left: x
                }}>

                <Box>
                </Box>

            </Animated.View>
        )
    }
}


class Snow extends React.Component {
    render() {
        const {
            children,
            data,
        } = this.props

        const snows = []
        for (let i = 0; i < 0; i++)
            snows.push(i)

        return (
            <Box fit column>
                {children}

                {true && <Box paddingSmall primary centralize style={{borderRadius: 0, elevation: 8}}>
                    <Box fitAbsolute centralize>
                        <Text>Carregando...</Text>
                    </Box>
                    <TouchableWithoutFeedback
                        onPress={() => FireBase.analytics().logEvent(Events.GeneralBannerClicked)}>
                        <Banner
                            size={"BANNER"}
                            onAdFailedToLoad={() => FireBase.analytics().logEvent(Events.GeneralBannerError)}
                            onAdLoaded={() => FireBase.analytics().logEvent(Events.GeneralBannerLoaded)}
                            unitId={__DEV__ ? 'ca-app-pub-3940256099942544/6300978111' : 'ca-app-pub-5594222713152935/4232515673'}
                        />
                    </TouchableWithoutFeedback>
                </Box>}

                <Box fitAbsolute pointerEvents={'none'}>
                    {snows.map(s => <SnowFlake key={s} index={s}/>)}
                </Box>
            </Box>
        )
    }
}

const styles = theme => StyleSheet.create({})

export default withData(withTheme({}, Snow))