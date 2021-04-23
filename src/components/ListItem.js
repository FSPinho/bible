import React from 'react';
import Box from "./Box";
import Touchable from "./Touchable";
import Text from "./Text";
import Spacer from "./Spacer";

class ListItem extends React.Component {
    render() {
        const {item: s, onPress} = this.props

        return (
            <Box fit paper primary
                 marginSmall>
                <Touchable onPress={() => onPress(s)} primary>
                    <Box padding centralize
                         column fit>
                        <Text size={14}
                              weight={'700'}
                              center>
                            {s.title}
                        </Text>
                        <Spacer vertical/>
                        <Text size={14}
                              weight={'300'}
                              secondary
                              center>
                            {s.subtitle}
                        </Text>
                    </Box>
                </Touchable>
            </Box>
        )
    }
}

export default ListItem
