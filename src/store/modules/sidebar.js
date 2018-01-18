
const state = {
	newListName: '',
	newListInput: false,
	appLists: [],
	authorsList: []
}

const getters = {
	appLists: state => state.appLists,
	authorsList: state => state.authorsList,
	newListInput: state => state.newListInput,
	newListName: state => state.newListName
}

const mutations = {
	updateAppLists(state) {
		appListDB.find({}).sort({ listName: 1 }).exec((err, docs) => {
			state.appLists = docs
		})
	},
	updateAuthorsList(state) {
		authorListDb.find({}).sort({ authorName: 1 }).exec((err, docs) => {
			state.authorsList = docs
		})
	},
	updateNewListName(state, val) {
		state.newListName = val
	},
}

const actions = {
	addNewList({ state, commit }) {
		if (state.newListInput) {
			let newListName = state.newListName.trim()
			if (newListName) {
				appListDB.insert({
					listName: newListName,
					sources: []
				}, () => commit('updateAppLists'))
			}
			state.newListName = ''
			state.newListInput = false
		}
		else {
			state.newListInput = true
		}
	},
	bookSearching({ rootState, commit }, event) {
		commit('activeList')

		let results = []
		let query = event.target.value.toLowerCase().trim()

		if (query) {
			appListDB.find({}, (er, docs) => {
				docs.forEach((list) => {
					list.sources.forEach((source) => {
						if (source.bookName.toLowerCase().indexOf(query) !== -1)
							results.push(source)
						else if (source.bookAuthor.toLowerCase().indexOf(query) !== -1)
							results.push(source)
					})
				})
			})
		}
		rootState.sourcesContent.sourcesContent = results
	}
}

export default {
	state,
	mutations,
	getters,
	actions
}