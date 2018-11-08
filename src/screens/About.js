import React from 'react';
import {Image, Linking, StyleSheet, Text, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Box} from '../components';
import Button from '../components/Button';
import {withTheme} from '../theme';

class About extends React.Component {

    render() {

        const {t, theme} = this.props
        const {styles} = theme
        
        return (
            <Box secondary>

                <ScrollView>
                    <Box column fit centralize style={styles.scrollContent}
                         alignItems="stretch">

                        <Box paper column primary>
                            <Box fit centralize column padding>
                                <Text style={[theme.paperTextPrimary, styles.title2]}>
                                    Olá, somos a
                                </Text>
                                <Text style={[theme.paperTextPrimary, styles.title1]}>
                                    Cytech Informática!
                                </Text>
                                <Text style={[theme.paperTextSecondary, styles.text]}>
                                    Desenvolvemos sites responsivos e aplicativos para Android e iOS, com interfaces
                                    leves e modernas. Este app é um ótimo exemplo do que podemos fazer.
                                </Text>

                                <Text style={[theme.paperTextSecondary, styles.text]}>
                                    Entre em contato e encontraremos a melhor solução para você no mundo digital!
                                </Text>

                                <Box column centralize>
                                    <Button
                                        primary
                                        style={{marginBottom: 16}}
                                        onPress={() => Linking.openURL('mailto:cytechcontato@gmail.com,felipe76857685@gmail.com?subject=Contato&body=Olá, pessoal da Cytech!')}>

                                        <Box centralize>
                                            <Text style={{color: theme.palette.primaryText}}>
                                                ENVIE-NOS UM EMAIL
                                            </Text>

                                            <Icon name={'email'} size={24}
                                                  style={{marginLeft: 16}}
                                                  color={theme.palette.primaryText}/>
                                        </Box>

                                    </Button>
                                    <Button
                                        primary
                                        onPress={() => Linking.openURL('whatsapp://send?text=Olá, pessoal da Cytech!&phone=+5588994263541')}>

                                        <Box centralize>
                                            <Text style={{color: theme.palette.primaryText}}>
                                                ENVIE-NOS UMA MENSAGEM
                                            </Text>

                                            <Icon name={'whatsapp'} size={24}
                                                  style={{marginLeft: 16}}
                                                  color={theme.palette.primaryText}/>
                                        </Box>

                                    </Button>
                                </Box>

                                <Button
                                    primary
                                    style={{marginTop: 16}}
                                    onPress={() => Linking.openURL('https://cytech.com.br')}>

                                    <Box centralize>
                                        <Text style={{color: theme.palette.primaryText}}>
                                            VEJA NOSSO SITE
                                        </Text>

                                        <Icon name={'earth'} size={24}
                                              style={{marginLeft: 16}}
                                              color={theme.palette.primaryText}/>
                                    </Box>

                                </Button>
                            </Box>

                            <Box centralize fit>
                                <Image
                                    source={require('../resources/images/coffee.png')}
                                    style={{width: 300, height: 300 * 454 / 643}}
                                    resizeMode={'contain'}/>
                            </Box>
                        </Box>
                    </Box>
                </ScrollView>
            </Box>
        )
    }
}

const styles = (theme) => StyleSheet.create({
    scrollContent: {
        padding: 16
    },
    card: {
        margin: 8,
    },
    title1: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 16,
        flex: 1,
        color: theme.palette.primary,
        textAlign: 'center'
    },
    title2: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 16,
        flex: 1,
        textAlign: 'center'
    },
    text: {
        marginBottom: 16,
        textAlign: 'center'
    }
})

export default withTheme(styles, About)