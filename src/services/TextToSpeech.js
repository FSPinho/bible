import Tts from 'react-native-tts'

let listeners = []

export default {
	initialize: async () => {
		return new Promise(async (a, r) => {
			console.log('TextToSpeech:initialize - Starting text to speech...')

			Tts.setDefaultLanguage('pt-BR')
			Tts.setDucking(true)

			const voices = await Tts.voices()
			if(!!voices.length) {
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
			} else {
				r()
			}
		})
	},

	play: (text) => {
		console.log('TextToSpeech:play - Playing:', text)
		Tts.speak(text, { androidParams: { KEY_PARAM_STREAM: 'STREAM_MUSIC' } })
	},

	playChapter: (chapter, parts = []) => {
		console.log('TextToSpeech:playChapter - Playing chapter:', chapter.title)
		let text = `${chapter.title}. Capítulo ${chapter.index}.`

		console.log('TextToSpeech:playChapter - Playing versicles:', parts.length)
		parts.map(v => text += `Versículo ${v.index}. ${v.title}.`)

		Tts.speak(text, { androidParams: { KEY_PARAM_STREAM: 'STREAM_MUSIC' } })
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
