import React from 'react'
import {Linking} from "react-native";
import {withTheme} from "../theme";
import withData from "../api/withData";
import Box from "../components/Box";
import FireBase from 'react-native-firebase'
import {Events} from "../constants/Analytics";
import Markdown from 'react-native-simple-markdown'
import Text from "../components/Text";
import Button from "../components/Button";
import Spacer from "../components/Spacer";
import Line from "../components/Line";
import DateFormat from 'dateformat'
import Share from "react-native-share";

class Article extends React.Component {

    async componentDidMount() {
        console.log("Home:componentDidMount - Sending current screen to analytics...")
        FireBase.analytics().logEvent(Events.OpenArticle, {
            bi_daily_schedule: this.article.author
        })
    }

    get article() {
        return this.props.navigation.getParam('article')
    }

    render() {

        const {theme} = this.props
        const article = this.article
        let timestamp = ''
        let author = ''
        let title = ''
        let data = ''

        try {
            title = article.title
            author = article.author
            data = article.data.replace(/\\n/g, '\n\n')
            timestamp = DateFormat(new Date(parseInt(article.timestamp)), 'dd/mm/yyyy')
        } catch (e) {
            console.warn("Article:render - Article:", JSON.stringify(article))
            console.warn("Article:render - Error:", e)
        }

        return (
            <Box secondary fit column>
                <Box scroll>
                    <Box column fit paddingSmall>

                        <Box primary paper column marginSmall>
                            <Box alignCenter justifySpaceBetween marginSmall>
                                <Box paddingSmall column>
                                    <Text size={20} weight={'900'}>{title}</Text>
                                    <Text>Texto enviado por {author}</Text>
                                    <Text secondary>{timestamp}</Text>
                                </Box>
                            </Box>
                            <Line/>
                            {
                                !!article && (
                                    <Box fit paddingSmall marginSmall>
                                        <Markdown
                                            styles={{
                                                ...mdStyles,
                                                text: {
                                                    ...mdStyles.text,
                                                    color: theme.palette.backgroundPrimaryText,
                                                },
                                                paragraph: {
                                                    ...mdStyles.paragraph,
                                                    marginBottom: 16
                                                },
                                                heading: {
                                                    ...mdStyles.heading,
                                                    marginBottom: 16
                                                }
                                            }}>
                                            {data}
                                        </Markdown>
                                    </Box>
                                )
                            }
                        </Box>

                        <Box primary paper column marginSmall>
                            <Box column padding>
                                <Text weight={'700'}>Conte a sua história!</Text>
                                <Spacer vertical/>
                                <Text secondary>
                                    Muitas pessoas mudaram suas vidas após ouvir uma história, mas nem todas percebem como
                                    as palavras são poderosas. Conte como Deus mudou sua vida e mostre o caminho da felicidade para milhares de
                                    pessoas!
                                </Text>
                            </Box>
                            <Line/>
                            <Box justifyEnd>
                                <Button flat primary
                                        onPress={() => Linking.openURL('mailto:cytechcontato@gmail.com,felipe76857685@gmail.com?subject=Contato&body=Olá, quero contar minha história!')}>
                                    ENVIAR MINHA HISTÓRIA</Button>
                            </Box>
                        </Box>

                        <Box primary paper column marginSmall>
                            <Box column padding>
                                <Text weight={'700'}>Gostou dessa história?</Text>
                                <Spacer vertical/>
                                <Text secondary>
                                    Compartilhe este aplicativo com mais pessoas, e compartilhe a palavra de Deus!
                                </Text>
                            </Box>
                            <Line/>
                            <Box justifyEnd>
                                <Button flat primary
                                        onPress={() => {
                                            FireBase.analytics().logEvent(Events.OpenShare)
                                            Share.open({
                                                url: 'https://play.google.com/store/apps/details?id=com.cytech.bible',
                                                title: 'Receba mensagens e orações diárias, e acesse a Bíblia Sagrada em áudio e texto'
                                            })
                                        }}>
                                    COMPARTILHAR APP</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }
}

const mdStyles = {
    blockQuoteSection: {
        flexDirection: 'row',
    },
    blockQuoteSectionBar: {
        width: 3,
        height: null,
        backgroundColor: '#DDDDDD',
        marginRight: 15,
    },
    codeBlock: {
        fontFamily: 'Courier',
        fontWeight: '500',
    },
    del: {
        textDecorationLine: 'line-through',
    },
    em: {
        fontStyle: 'italic',
    },
    heading: {
        fontWeight: '200',
    },
    heading1: {
        fontSize: 32,
    },
    heading2: {
        fontSize: 24,
    },
    heading3: {
        fontSize: 18,
    },
    heading4: {
        fontSize: 16,
    },
    heading5: {
        fontSize: 13,
    },
    heading6: {
        fontSize: 11,
    },
    hr: {
        backgroundColor: '#cccccc',
        height: 1,
    },
    image: {
        width: 320,
        height: 320,
    },
    inlineCode: {
        backgroundColor: '#eeeeee',
        borderColor: '#dddddd',
        borderRadius: 3,
        borderWidth: 1,
        fontFamily: 'Courier',
        fontWeight: 'bold',
    },
    link: {
        textDecorationLine: 'underline',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    listItemNumber: {
        fontWeight: 'bold',
    },
    mailTo: {
        textDecorationLine: 'underline',
    },
    paragraph: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    listItemText: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        color: '#222222',
    },
    strong: {
        fontWeight: 'bold',
    },
    table: {
        borderWidth: 1,
        borderColor: '#222222',
        borderRadius: 3,
    },
    tableHeader: {
        backgroundColor: '#222222',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    tableHeaderCell: {
        color: '#ffffff',
        fontWeight: 'bold',
        padding: 5,
    },
    tableRow: {
        borderBottomWidth: 1,
        borderColor: '#222222',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    tableRowLast: {
        borderColor: 'transparent',
    },
    tableRowCell: {
        padding: 5,
    },
    text: {
        color: '#222222',
    },
    u: {
        textDecorationLine: 'underline'
    },
    video: {
        width: 300,
        height: 300,
    }
}

export default withData(withTheme({}, Article))
