import { appListDB } from '../../utils/db';

const state = {
  sourcesContent: [],
};

const mutations = {
  updateBookContents(state, listId) {
    if (listId) {
      appListDB.findOne({ _id: listId }, (err, doc) => {
        state.sourcesContent = doc.sources;
      });
    } else state.sourcesContent = [];
  },
};

export default {
  state,
  mutations,
};
