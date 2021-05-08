import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {withTheme} from '../theme';
import Box from "./Box";
import FireBase from "react-native-firebase";
import {Events} from "../constants/Analytics";
import Text from "./Text";
import withData from "../api/withData";

const Banner = FireBase.admob.Banner;

class Snow extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            adError: false
        }
    }

    componentDidMount() {
        setInterval(this.doShowAd, 5 * 60 * 1000);
        setTimeout(this.doShowAd, 30);
    }

    doShowAd = () => {
        this.ad = FireBase.admob().interstitial(__DEV__ ? "ca-app-pub-3940256099942544/1033173712" : "ca-app-pub-5594222713152935/1306502108");
        this.ad.loadAd();

        this.ad.on('onAdLoaded', () => {
            console.log(' ---------------- Interstitial ready to show.');
            this.ad.show()
        });

        this.ad.on('onAdFailedToLoad', () => {
            console.log(' ---------------- Interstitial FAIL.');
        });
    }

    onAdError = () => {
        FireBase.analytics().logEvent(Events.GeneralBannerError)
        this.setState({ adError: true })
    }

    render() {
        const {data, children} = this.props
        const {settings} = data

        return (
            <Box fit column>
                {children}

                {settings.canShowAds && !this.state.adError &&
                    <Box paddingSmall primary centralize style={{borderRadius: 0, elevation: 8}}>
                        <Box fitAbsolute centralize>
                            <Text>Carregando...</Text>
                        </Box>
                        <TouchableWithoutFeedback
                            onPress={() => FireBase.analytics().logEvent(Events.GeneralBannerClicked)}>
                            <Banner
                                size={"LARGE_BANNER"}
                                onAdFailedToLoad={() => this.onAdError()}
                                onAdLoaded={() => FireBase.analytics().logEvent(Events.GeneralBannerLoaded)}
                                unitId={__DEV__ ? 'ca-app-pub-3940256099942544/6300978111' : 'ca-app-pub-5594222713152935/4232515673'}
                            />
                        </TouchableWithoutFeedback>
                    </Box>
                }
            </Box>
        )
    }
}

export default withData(withTheme({}, Snow))