
const userData = require('electron').remote.app.getPath('userData')

import Datastore from 'nedb'
let appListDB = new Datastore({ filename: `${userData}/dbs/app_lists.db`, autoload: true })
let authorListDb = new Datastore({ filename: `${userData}/dbs/author_list.db`, autoload: true })

import store from './store'
import Wrapper from './components/Wrapper'

new Vue({
    el: 'app',
    store: store,
    components: {
        'app': Wrapper
    }
})