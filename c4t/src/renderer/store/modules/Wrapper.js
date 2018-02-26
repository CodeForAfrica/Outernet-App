
const state = {
  toggleSources: true,
  openedBookPath: '',
  isLoading: false,
  connectionStatus: false,
};

const getters = {
  toggleSources: state => state.toggleSources,
  openedBookPath: state => state.openedBookPath,
  isLoading: state => state.isLoading,
  connectionStatus: state => state.connectionStatus,
};

const mutations = {
  isLoading(state) {
    state.isLoading = !state.isLoading;
  },
};

export default {
  state,
  getters,
  mutations,
};
