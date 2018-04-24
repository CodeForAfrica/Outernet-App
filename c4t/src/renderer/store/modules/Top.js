const state = {
  showTranslate: false,
};

const getters = {
  showTranslate: state => state.showTranslate,
};

const actions = {

  updateBrightness(context, event) {
    try {
      document
        .getElementById('book-viewer-iframe')

        .contentWindow.document.getElementById(
          'viewerContainer',
        ).style.opacity = event.target.value;
    } catch (err) {
      // console.error(err);
    }
  },

  updateShowTranslate({ commit }) {
    commit('toggleTranslate');
  },

  backToMain({ commit }) {
    commit('toMain');
  },

};

const mutations = {
  toggleTranslate(state) {
    state.showTranslate = !state.showTranslate;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
