import Tts from 'react-native-tts'

let listeners = []

export default {
    initialize: async () => {
        return new Promise((a, r) => {
            console.log('TextToSpeech:initialize - Starting text to speech...')

            Tts.setDefaultLanguage('pt-BR')
            Tts.setDucking(true)

            Tts.getInitStatus().then(async () => {
                console.log('TextToSpeech:initialize - Done!')
                a()
            }, (err) => {
                console.warn('TextToSpeech:initialize - Error:', err)
                if (err.code === 'no_engine') {
                    Tts.requestInstallEngine()
                }
                r(err)
            })
        })
    },

    play: (text) => {
        console.log('TextToSpeech:play - Playing:', text)
        Tts.speak(text)
    },

    playChapter: (chapter, parts = []) => {
        console.log('TextToSpeech:playChapter - Playing chapter:', chapter.title)
        let text = `${chapter.title}. Capítulo ${chapter.index}.`

        console.log('TextToSpeech:playChapter - Playing versicles:', parts.length)
        parts.map(v => text += `Versículo ${v.index}. ${v.title}.`)

        Tts.speak(text)
    },

    stop: () => {
        Tts.stop()
    },

    addEventListener: (type, handler) => {
        listeners.push({type, handler})
        Tts.addEventListener(type, handler)
    },

    removeEventListener: (type, handler) => {
        Tts.removeEventListener(type, handler)
    },

    removeAllListeners: () => {
        listeners.map(l => Tts.removeEventListener(l.type, l.handler))
        listeners = []
    }
}