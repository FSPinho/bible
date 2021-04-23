import PropTypes from 'prop-types';
import React from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
// import ViewOverflow from 'react-native-view-overflow';
import {withTheme} from '../theme';

const { Provider, Consumer } = React.createContext(undefined);
const AnimatedViewOverflow = Animated.View // Animated.createAnimatedComponent(ViewOverflow);
const ViewOverflow = View

class FoldView extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            foldProgress: new Animated.Value(props.expanded ? 1 : 0),
            expanded: this.props.expanded,
            backLayout: {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            },
        }

        this.doUpdateSpacing(props.expanded ? 1 : 0)
        this.state.foldProgress.addListener(({ value }) => {
            this.doUpdateSpacing(value)
        })
    }

    componentWillReceiveProps({ expanded, isLast }) {
        if (expanded) {
            this.doExpand()
        } else {
            if (isLast) {
                if (this.state.expanded)
                    this.doCollapse()
            } else {
                this.setState({ expanded: false })
            }
        }
    }

    doExpand = async () => {
        Animated.timing(
            this.state.foldProgress,
            {
                toValue: 1,
                easing: Easing.bezier(.8, .2, .2, .8),
                duration: this.props.flipDuration
            }
        ).start(this.handleAnimationEnd)
    }

    doCollapse = async () => {
        this.setState({
            expanded: false
        }, () => {
            Animated.timing(
                this.state.foldProgress,
                {
                    toValue: 0,
                    easing: Easing.bezier(.8, .2, .2, .8),
                    duration: this.props.flipDuration
                }
            ).start(() => {
                console.log("Do collapse parent")
                this.props.doCollapseParent()
            })
        })
    }

    handleAnimationEnd = async () => {
        this.setState({
            ...this.state,
            expanded: true
        })
    }

    onBaseLayoutChange = async ({ nativeEvent: { layout } }) => {
        this.base = layout
        this.setState({
            ...this.state,
            baseLayout: layout
        })
    }

    onFrontLayoutChange = async ({ nativeEvent: { layout } }) => {
        const front = this.refs.front
        this.front = layout
        if (front) {
            front.setNativeProps({
                top: 0,
                height: layout.height * 2
            })
        }
    }

    onBackLayoutChange = async ({ nativeEvent: { layout } }) => {
        const back = this.refs.back
        this.back = layout

        if (back) {
            back.setNativeProps({
                height: layout.height * 2
            })
        }
    }

    onBackWrapperLayoutChange = async ({ nativeEvent: { layout } }) => {
        const backWrapper = this.refs.backWrapper
        const spacing = this.refs.spacing

        if (backWrapper && this.back && this.front && this.base) {
            backWrapper.setNativeProps({
                top: this.base.height - this.back.height
            })

            this.setState({
                ...this.state,
                backLayout: {...layout, height: layout.height / 2 }
            })
        }
    }

    doUpdateSpacing = async (value) => {
        // const spacing = this.refs.spacing
        // const back = this.back
        // if (spacing && back) {
        //     spacing.setNativeProps({
        //         height: back.height * value
        //     })
        // }
    }

    render() {

        const { children, front, back, styles, hasParent, ...props } = this.props
        const { expanded, backLayout } = this.state

        return (
            <Provider value={{ expanded, doCollapseParent: this.doCollapse }}>
                <ViewOverflow>
                    <ViewOverflow {...props} style={[styles.root, props.style]}>
                        <ViewOverflow onLayout={this.onBaseLayoutChange}>
                            {children}
                        </ViewOverflow>

                        <ViewOverflow style={styles.front}>
                            <AnimatedViewOverflow
                                style={[{
                                    opacity: this.state.foldProgress.interpolate({ inputRange: [0.499999, 0.5], outputRange: [1, 0] }),
                                    transform: [
                                        { perspective: 1000 },
                                        { rotateX: this.state.foldProgress.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-180deg'] }) },
                                    ]
                                }]}>

                                <View ref="front">
                                    <ViewOverflow onLayout={this.onFrontLayoutChange}>
                                        {front}
                                    </ViewOverflow>
                                </View>

                            </AnimatedViewOverflow>
                        </ViewOverflow>

                        <View
                            style={styles.back}
                            ref="backWrapper"
                            onLayout={this.onBackWrapperLayoutChange}>
                            <AnimatedViewOverflow
                                style={[{
                                    opacity: this.state.foldProgress.interpolate({ inputRange: [0.499999, 0.5], outputRange: [0, 1] }),
                                    transform: [
                                        { perspective: 1000 },
                                        { rotateX: this.state.foldProgress.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-180deg'] }) },
                                    ]
                                }]}>

                                <View ref="back">
                                    <ViewOverflow style={styles.backInner}
                                                  onLayout={this.onBackLayoutChange}>
                                        {back}
                                    </ViewOverflow>
                                </View>

                            </AnimatedViewOverflow>
                        </View>

                        <Animated.View
                            style={[{
                                height:
                                    hasParent ? backLayout.height
                                        : this.state.foldProgress.interpolate({ inputRange: [0, 1], outputRange: [0, backLayout.height ] })
                            }]} />

                        {/* <View ref="spacing" /> */}

                    </ViewOverflow>
                </ViewOverflow>
            </Provider>
        )
    }
}

FoldView.propTypes = {
    front: PropTypes.any,
    back: PropTypes.any,
    expanded: PropTypes.bool,
    flipDuration: PropTypes.number,
    isLast: PropTypes.bool,
    hasParent: PropTypes.bool
}

FoldView.defaultProps = {
    front: undefined,
    back: undefined,
    expanded: false,
    flipDuration: 350,
    isLast: false,
    hasParent: false
}

const styles = (theme) => StyleSheet.create({
    root: {
    },
    base: {

    },
    front: {
        position: 'absolute',
        top: 0
    },
    back: {
        position: 'absolute',
    },
    backInner: {
        transform: [{ rotateX: '180deg' }],
    }
})

const FoldViewWrapper = ({ expanded, ...props }) => (
    <Consumer>
        {
            value =>
                <FoldView {...props}
                          expanded={value ? value.expanded : expanded}
                          hasParent={!!value}
                          doCollapseParent={value ? value.doCollapseParent : () => undefined} />
        }
    </Consumer>
)

export default withTheme(styles, FoldViewWrapper)