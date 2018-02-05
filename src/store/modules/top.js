import isOnline from 'is-online'

const state = {
	showTranslate: false
}

const getters = {
	showTranslate: state => state.showTranslate
}

const actions = {
	updateBrightness(context, event) {
		try {
			document.getElementById('book-viewer-iframe').contentWindow
				.document.getElementById('viewerContainer').style.opacity = event.target.value
		}
		catch (err) { }
	},
	updateShowTranslate({ state }) {
		state.showTranslate = !state.showTranslate		
	},

	backToMain({ rootState }) {
		rootState.wrapper.toggleSourcesContent = true
		rootState.wrapper.openedBookPath = ''
	},

	checkConnection({ rootState }) {
		// Check for internet connection
		isOnline().then(online => {
			// Connection is up
			rootState.wrapper.connectionStatus = online
		}).catch(offline => {
			// No connection
			rootState.wrapper.connectionStatus = offline
		});
	}
}

export default {
	state,
	actions,
	getters
}