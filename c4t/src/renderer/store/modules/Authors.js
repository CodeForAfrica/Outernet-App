import { appListDB } from '../../utils/db';

const actions = {
  /**
   * Show the sources of the selected author.
   * @param {Object} args
   * args = { authorName, event }
   */
  openAuthorList({ rootState, commit }, args) {
    const sources = [];
    appListDB.find({ 'sources.bookAuthor': args.authorName }, (err, docs) => {
      docs.forEach((list) => {
        list.sources.forEach((book) => {
          if (sources.every(b => b.bookPath !== book.bookPath)
              && book.bookAuthor === args.authorName) {
            sources.push(book);
          }
        });
      });
      rootState.sourcesContent.sourcesContent = sources;
    });
    commit('activeList', args.event);
  },
};

// const mutations = {

// };

export default {
  actions,
};
