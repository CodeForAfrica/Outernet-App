import * as fs from 'fs';
import alertify from 'alertify.js';
import { appListDB, authorListDB, userData } from '../../utils/db';

import saveImage from '../../utils/pdf_utils';

const mutations = {
  activeList(state, event) {
    // deactivate the all active lists.
    document
      .querySelectorAll('.book-list')
      .forEach(e => e.classList.remove('active'));
    // active the selected list.
    if (event) event.path[1].classList.add('active');
  },
};

const actions = {
  /** Dragged book save
   * @param {string} listId
   */
  drop({ commit }, listId) {
    const dragBookId = localStorage.getItem('dragBookId');
    const dragListId = localStorage.getItem('dragListId');

    if (dragBookId && dragListId) {
      appListDB.findOne({ _id: dragListId }, (err, doc) => {
        const dragBook = doc.sources.filter(b => b.bookId === dragBookId)[0];
        dragBook.listId = listId;
        if (dragBook) {
        // the dragged book own list removed.
          appListDB.update(
            { _id: dragListId },
            { $pull: { sources: { bookId: dragBookId } } },
            (err) => {
              console.log(err);
              // the book was saved to the new list.
              appListDB.update(
                { _id: listId },
                { $push: { sources: dragBook } },
                (err) => {
                  // console.log(err);
                  commit('updateBookContents', dragListId);
                  return err;
                },
              );
            },
          );
        }
      });
    }
  },

  /**
   * @param {Object} args
   * args = { event, listId }
   */
  addListBook({ commit }, args) {
    // Maximum 20 files
    let selectedFiles = args.event.target.files;
    if (selectedFiles.length > 0) commit('isLoading');

    if (selectedFiles.length > 20) { selectedFiles = Array.from(selectedFiles).slice(0, 20); }
    const filePaths = Object.keys(selectedFiles).map(f => selectedFiles[f].path);

    if (!fs.existsSync(`${userData}/book-images`)) { fs.mkdirSync(`${userData}/book-images`); }

    const sources = [];
    const authors = new Set();

    new Promise((resolve) => {
      authorListDB.find({}, (e, docs) => resolve(docs.map(a => a.authorName)));
    }).then((tempAuthors) => {
      new Promise((resolve) => {
        filePaths.forEach((bookPath) => {
          const data = fs.readFileSync(bookPath);

          // generate bookId
          const bookId =
            `${args.listId}_${
              Math.random()
                .toString(36)
                .substr(2, 9)}`;

          const bookImagePath = `${userData}/book-images/${bookId}.jpeg`;

          // props = { meta, pageCount }
          saveImage(data, bookImagePath).then((props) => {
            const metadata =
              props.meta.metadata != null ? props.meta.metadata.metadata : {};

            const info = props.meta.info != null ? props.meta.info : {};

            const bookName =
              (metadata['dc:title'] !== '()' ? metadata['dc:title'] : '') ||
              bookPath.match(/.*[/\\](.+?)\./).pop() ||
              'Untitled';

            const bookAuthor =
              info.Author || metadata['dc:author'] || 'Unknown Author';

            const bookPageCount = props.pageCount;

            authors.add(bookAuthor);

            sources.push({
              bookId,
              bookImagePath,
              bookPath,
              bookName,
              bookAuthor,
              bookPageCount,
              listId: args.listId,
            });

            if (sources.length === selectedFiles.length) resolve(sources);
          });
        });
      }).then((sources) => {
        appListDB.update(
          { _id: args.listId },

          { $push: { sources: { $each: sources } } },

          (err, num) => {
            console.log(num);
            /* eslint no-underscore-dangle: 0 */
            const _tempAuthors = Array.from(tempAuthors);

            const _authors = Array.from(authors)

              .filter(e => _tempAuthors.indexOf(e) === -1)

              .map(e => ({
                authorName: e,
              }));

            authorListDB.insert(_authors, err =>
              console.log(err),
            commit('updateAuthorsList'),
            );

            commit('updateBookContents', args.listId);

            commit('isLoading');
          },
        );
      });
    });
  },

  /**
   * @param {Object} args
   * args = { listId, event }
   */
  openBookList({ commit }, args) {
    commit('updateBookContents', args.listId);
    commit('activeList', args.event);
  },

  remove({ commit }, args) {
    alertify
      .okBtn('Yes')
      .cancelBtn('No')
      .confirm(`Do you delete the [${args.listName}] list ?`)
      .then((value) => {
        value.event.preventDefault();

        if (value.buttonClicked === 'ok') {
          appListDB.findOne({ _id: args.listId }, (err, selectedList) => {
            selectedList.sources.forEach((book) => {
              // remove book image
              fs.unlink(book.bookImagePath);

              // does the book author have another book?
              // if there is no other book, the author is deleted.
              let bookCount = 0;
              appListDB.find({ _id: { $ne: args.listId } }, (err, lists) => {
                lists.forEach((list) => {
                  list.sources.forEach((b) => {
                    if (b.bookAuthor === book.bookAuthor) bookCount++;
                  });
                });

                if (bookCount === 0 || lists.length === 0) {
                  authorListDB.remove({ authorName: book.bookAuthor });
                  commit('updateAuthorsList');
                }
              });
            });

            // the selected list is deleted
            appListDB.remove({ _id: args.listId }, (err) => {
              console.log(err);
              alertify.delay(3000).success(`${args.listName} list deleted.`);
              // book lists and book contents are updated.
              commit('updateAppLists');
              commit('updateBookContents');
            });
          });
        }
      });
  },
};

export default {
  actions,
  mutations,
};
