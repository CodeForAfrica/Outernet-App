<template>
  <div class="book" draggable="true" @dragend="dragEnd" @dragstart="dragStart(bookId, listId)">

      <img :src="bookImagePath" :title="bookName" @click="openBook(bookPath)" />

      <button 
          v-show="true" 
          title="Remove Book" 
          class="remove-book-btn dred" 
          @click="removeBook({
              bookId: bookId,
              bookAuthor: bookAuthor,
              bookImagePath: bookImagePath,
              listId:listId
          })" />

      <span 
          class="title" 
          :title="bookName"
          @click="openBook(bookPath)">
          {{ bookName }}
      </span>
      
      <span class="author" :title="bookAuthor">{{ bookAuthor }}</span>

    </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  props: [
    'content-id',
    'content-name',
    'content-author',
    'content-page-count',
    'content-image-path',
    'content-path',
    'list-id',
  ],

  methods: {
    ...mapActions({
      openBook: 'openBook',
      removeBook: 'removeBook',
    }),

    dragStart(bookId, listId) {
      localStorage.setItem('dragBookId', bookId);
      localStorage.setItem('dragListId', listId);

      document
        .querySelectorAll('[droppable]')
        .forEach(e => e.classList.add('droppable'));
    },

    dragEnd() {
      document.querySelectorAll('[droppable]').forEach((e) => {
        e.classList.remove('droppable');
        e.classList.remove('enter');
      });
    },
  },
};
</script>
