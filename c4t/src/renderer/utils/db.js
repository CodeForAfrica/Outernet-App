import Datastore from 'nedb';

const userData = require('electron').remote.app.getPath('userData');

const appListDB = new Datastore({
  filename: `${userData}/dbs/app_lists.db`,
  autoload: true,
});

const authorListDB = new Datastore({
  filename: `${userData}/dbs/author_list.db`,
  autoload: true,
});

export { appListDB, authorListDB, userData };
