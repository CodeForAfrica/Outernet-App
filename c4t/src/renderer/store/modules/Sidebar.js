import appslist from '../../utils/apps';
import { appListDB, authorListDB } from '../../utils/db';

const state = {
  newListName: '',
  newListInput: false,
  appsList: [],
  authorsList: [],
};

const getters = {
  appsList: state => state.appsList,
  authorsList: state => state.authorsList,
  newListInput: state => state.newListInput,
  newListName: state => state.newListName,
};

const mutations = {
  updateAppLists(state) {
    appListDB
      .find({})
      .sort({ listName: 1 })
      .exec((err, docs) => {
        state.appsList = docs;
      });
  },
  updateAuthorsList(state) {
    authorListDB
      .find({})
      .sort({ authorName: 1 })
      .exec((err, docs) => {
        state.authorsList = docs;
      });
  },
  updateNewListName(state, val) {
    state.newListName = val;
  },
};

const actions = {
  addAppList({ commit }) {
    appslist.forEach((e) => {
      appListDB.find({ listName: e.listName }, (err, docs) => {
        if (!docs.length) {
          // Insert new apps for the first time
          appListDB.insert(
            {
              listName: e.listName,
              sources: e.sources,
            },
            () => commit('updateAppLists'),
          );
        }
      });
    });
  },

  addNewList({ state, commit }) {
    if (state.newListInput) {
      const newListName = state.newListName.trim();
      if (newListName) {
        appListDB.insert(
          {
            listName: newListName,
            sources: [],
          },
          () => commit('updateAppLists'),
        );
      }
      state.newListName = '';
      state.newListInput = false;
    } else {
      state.newListInput = true;
    }
  },

  bookSearching({ rootState, commit }, event) {
    commit('activeList');
    const results = [];
    const query = event.target.value.toLowerCase().trim();

    if (query) {
      appListDB.find({}, (er, docs) => {
        docs.forEach((list) => {
          list.sources.forEach((source) => {
            if (source.bookName.toLowerCase().indexOf(query) !== -1) {
              results.push(source);
            } else if (source.bookAuthor.toLowerCase().indexOf(query) !== -1) {
              results.push(source);
            }
          });
        });
      });
    }
    console.log(rootState);
    // rootState.sourcesContent.sourcesContent = results;
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
