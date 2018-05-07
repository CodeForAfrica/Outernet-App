<template>
  <div class="sources-content">
        <ul>
            <li v-for="book in sourcesContent" :key="book.bookId">
                <content
                    :content-id="book.bookId" 
                    :content-name="book.bookName" 
                    :content-author="book.bookAuthor"
                    :content-path="book.bookPath" 
                    :content-page-count="book.bookPageCount" 
                    :list-id="book.listId"
                    content-image-path="book.bookImagePath">
                </content>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapState } from 'vuex';

import Content from './Content';

export default {
  computed: mapState({
    // sourcesContent: state => state.sourcesContent.sourcesContent,

    sourcesContent: 'sourcesContent',
  }),

  components: {
    content: Content,
  },
};
</script>
