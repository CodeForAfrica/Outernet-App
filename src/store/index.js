
import Vuex from 'vuex'

import wrapper from './modules/wrapper'
import sidebar from './modules/sidebar'
import sourcesContent from './modules/sources_content'
import authorList from './modules/author_list'
import appList from './modules/app_list'
import book from './modules/book'
import top from './modules/top'

export default new Vuex.Store({
	modules: {
		top,
		wrapper,
		sidebar,
		sourcesContent,
		appList,
		authorList,
		book,
	}
})