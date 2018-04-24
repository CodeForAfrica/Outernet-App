import isOnline from 'is-online';

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

const actions = {
  fetchConnStatus({ commit }) {
    isOnline()
      .then((status) => {
        // Connection is up
        commit('checkConn', { status });
      })
      .catch((status) => {
        // No connection
        commit('checkConn', { status });
      });
  },
};

const mutations = {
  isLoading(state) {
    state.isLoading = !state.isLoading;
  },

  checkConn(state, payload) {
    state.connectionStatus = payload.status;
  },

  toMain(state) {
    state.toggleSources = true;
    state.openedBookPath = '';
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
