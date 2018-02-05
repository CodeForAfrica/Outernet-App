
const state = {
	toggleSourcesContent: true,
	openedBookPath: '',
	isLoading: false,
	connectionStatus: false
}

const getters = {
	toggleSourcesContent: state => state.toggleSourcesContent,
	openedBookPath: state => state.openedBookPath,
	isLoading: state => state.isLoading,
	connectionStatus: state => state.connectionStatus
}

const mutations = {
	isLoading(state) {
		state.isLoading = !state.isLoading
	}
}

export default {
	state,
	getters,
	mutations
}