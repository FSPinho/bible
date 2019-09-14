import React from 'react';
import { Animated, Easing } from 'react-native';

class FadeFromDown extends React.Component {
    state = {
        progress: new Animated.Value(0)
    }

    componentDidMount() {
        this.checkProps(this.props)
    }

    componentWillReceiveProps(props) {
        if (this.props.visible !== props.visible)
            this.checkProps(props)
    }

    checkProps = ({ visible, delay, duration }) => {
        let toValue = 0
        if (visible)
            toValue = 1
        else
            toValue = 0

        Animated.timing(this.state.progress, {
            toValue,
            easing: Easing.bezier(.8, .2, .2, .8),
            duration: duration || 800
        }).start()
    }

    render() {

        const { visible, style, ...props } = this.props

        return (<Animated.View pointerEvents={visible ? 'auto' : 'none'} style={[
            {
                flex: 1,
                transform: [{
                    translateY: this.state.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [32, 0]
                    })
                }],
                opacity: this.state.progress
            },
            style,
        ]} {...props} />)
    }
}

export default FadeFromDown
