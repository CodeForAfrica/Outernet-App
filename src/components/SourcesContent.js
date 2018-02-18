
import { mapState } from 'vuex'
import Book from './Book'

export default {
	template: `<div class="sources-content">
					<ul>
						<li v-for="book in sourcesContent">
							<book :book-id="book.bookId" :book-name="book.bookName" :book-author="book.bookAuthor"
									:book-path="book.bookPath" :book-image-path="book.bookImagePath"
									:book-page-count="book.bookPageCount" :list-id="book.listId"></book>
							</li>
					</ul>
				</div>`,
	data() {
	},
	computed: mapState({
		sourcesContent: state => state.sourcesContent.sourcesContent
	}),
	components: {
		'book': Book
	}
}