<template>
  <div
    class="book-list"
    @drop="drop(listId)"
    @dragover.prevent 
    @dragenter="dragEnter" 
    droppable="true">

      <span 
        :title="listName" 
        @click="openBookList({ 
          listId: listId,
          event: $event 
        })">
          {{ listName }}
      </span>

      <label v-show="true" :for="listId" title="Add New Book" class="add-list-book"></label>

      <button 
        v-show="false" 
        title="Remove List" 
        @click="remove({ 
          listId: listId,
          listName: listName 
        })" 
        class="remove-list-btn">
      </button>

      <input 
        v-show="false" 
        type="file" 
        :id="listId"
        accept="application/pdf" 
        @change="addListBook({ listId: listId, event: $event})" 
        maxlength="5" 
        multiple
        hidden
      />
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['list-name', 'list-id', 'book-paths'],

  methods: {
    ...mapActions({
      openBookList: 'openBookList',
      remove: 'remove',
      addListBook: 'addListBook',
      drop: 'drop',
    }),

    dragEnter(e) {
      e.preventDefault();

      document
        .querySelectorAll('[droppable]')
        .forEach(e => e.classList.remove('enter'));

      const appList = e.path[1];

      if (appList.classList.contains('droppable')) {
        appList.classList.add('enter');
      }
    },
  },
};
</script>

