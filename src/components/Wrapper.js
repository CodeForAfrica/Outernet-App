
import { mapGetters } from 'vuex'
import request from 'request'
import { shell } from 'electron'

import Top from './Top'
import Sidebar from './Sidebar'
import SourcesContent from './SourcesContent'
import Book from './Book'
import AppList from './AppList'
import AuthorList from './AuthorList'
import BookViewer from './BookViewer'
import { setInterval } from 'timers';
import jsftp from 'jsftp'
import isReachable from 'is-reachable'

export default {
	template: `<div :class="['main', { 'update' : update_check }]">
					<top></top>
					<sidebar v-show="toggleSourcesContent"></sidebar>
					<sources-content v-show="toggleSourcesContent"></sources-content>
					<book-viewer v-show="! toggleSourcesContent" :src="openedBookPath"></book-viewer>
					<div id="book-loader" v-show="isLoading">
						<div class="spinner">
							<div class="rect1"></div>
							<div class="rect2"></div>
							<div class="rect3"></div>
							<div class="rect4"></div>
							<div class="rect5"></div>
						</div>
					</div>
					<div class="update_check" v-show="update_check">
						<span>There are updates currently available.</span>
						<button @click="downloadUpdate"> Download Update </button>
					</div>
			</div>`,
	computed: {
		...mapGetters({
			toggleSourcesContent: 'toggleSourcesContent',
			openedBookPath: 'openedBookPath',
			isLoading: 'isLoading'
		})
	},
	data() {
		return { update_check: false }
	},
	methods: {
		// open the link on browser
		downloadUpdate() {
			let homepage = require('../../package.json').homepage
			shell.openExternal(homepage + '/releases/latest')
		}
	},
	created() {
		// Check if you can ftp to outernet dreamacatcher
		setInterval(() => {
			isReachable('10.0.0.1').then(reachable => {
				console.log(reachable);
			});
		},1000)

		const Ftp = new jsftp({
			host: "10.0.0.1",
			user: "outernet", // defaults to "anonymous"
			pass: "outernet" // defaults to "@anonymous"
		});

		Ftp.ls("/mnt/downloads", (err, res) => {
			res.forEach(file => console.log(file.name));
		});
				
		localStorage.clear()

		try {
			request.get('https://api.github.com/repos/mtuchi/C4T-Ed/releases/latest',
				{ headers: { 'Content-Type': 'application/json', 'User-Agent': 'request' } },
				(err, res, body) => {
					let jsonBody = JSON.parse(body)

					let currentVersion = require('../../package.json').version.toString()
					if (jsonBody.tag_name) {
						let releaseVersion = jsonBody.tag_name.substr(1).toString()
						this.update_check = (currentVersion != releaseVersion)
					}
				})
		} catch (error) {
			console.log(error)
		}
	},
	components: {
		'top': Top,
		'sidebar': Sidebar,
		'sources-content': SourcesContent,
		'book-viewer': BookViewer
	}
}