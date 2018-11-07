import React from 'react';
import {StyleSheet} from 'react-native';
import {withTheme, Palette} from '../theme';
import PropTypes from "prop-types";
import Box from "./Box";
import Text from "./Text";
import Spacer from "./Spacer";
import IconButton from "./IconButton";
import Touchable from "./Touchable";
import {withData} from '../api'

class ListItem extends React.Component {

	shouldComponentUpdate(props) {
		const {theme: _, ...currentProps} = this.props
		const {theme: __, ...nextProps} = props
		return JSON.stringify(currentProps) !== JSON.stringify(nextProps)
	}

	toggleLoved = async () => {
		await this.props.data.doUpdateLoveds({[this.props.lovedKey]: !this.props.data.loveds[this.props.lovedKey]})
	}

	render() {
		const {lovedKey, title, subtitle, text, theme, index, onPress, subjectMeta, data, ...props} = this.props
		const {styles} = theme

		const favorite = data.loveds[lovedKey]

		// index === 0 && console.log('ListItem:render - Rendering:', title, lovedKey, data.loveds)

		return (
			<Box paper primary style={styles.root} {...props}>
				<Touchable primary onPress={onPress}>
					<Box fit centralize>
						<Box column fit padding>
							<Text children={title} bold/>
							{!!subtitle && <Text children={subtitle} secondary/>}
							{!!subjectMeta && <Text secondary>Você realizou {subjectMeta.proofsCount} {subjectMeta.proofsCount === 1 ? 'simulado' : 'simulados'}</Text>}
							{!!text && <Text children={text}/>}
						</Box>

						{
							!!subjectMeta && (
								<Box column centralize padding>
									<Text children={'Média'} secondary/>
									<Text children={(subjectMeta.grade/subjectMeta.proofsCount).toFixed(2)} size={20}
										weight={'900'}
										color={subjectMeta.grade > 6 ? Palette.Green : Palette.Red}/>
								</Box>
							)
						}

						{(typeof lovedKey !== 'undefined') && (
							<Box padding>
								<IconButton icon={'heart'} iconComponent={'material-community'}
									onPress={this.toggleLoved}
									style={{opacity: favorite ? 1 : .2}}
									textColor={favorite ? theme.palette.primary : theme.palette.backgroundPrimaryTextDisabled}/>
							</Box>
						)}
					</Box>
				</Touchable>
			</Box>
		)
	}
}

ListItem.propTypes = {
    subjectMeta: PropTypes.any,
	lovedKey: PropTypes.string,
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	text: PropTypes.string,
	index: PropTypes.number,
	onPress: PropTypes.func
}

const styles = theme => StyleSheet.create({
	root: {
		marginLeft: theme.metrics.spacing,
		marginRight: theme.metrics.spacing,
		marginTop: theme.metrics.spacing / 2,
		marginBottom: theme.metrics.spacing / 2,
		overflow: 'hidden'
	}
})

export default withData(withTheme(styles, ListItem))
