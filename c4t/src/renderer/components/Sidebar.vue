<template>

  <div class="sidebar">

    <input type="text" class="search-box" placeholder="Search..." @input="bookSearching" />

    <div style="height: calc(100% - 145px)">

      <h5>Top Apps <span v-show="appsList.length">{{ appsList.length }}</span></h5>

      <ul>
        <li v-for="list in appsList" :key="list._id">
          <app-list 
          :list-name="list.listName" 
          :list-id="list._id">
          </app-list>
        </li>
      </ul>

      <h5 v-show="false">Authors <span v-show="authorsList.length">{{ authorsList.length }}</span></h5>

      <ul v-show="false">
        <li v-for="author in authorsList" :key="author._id">
          <author-list 
          :author-name="author.authorName" 
          :author-id="author._id">
          </author-list>
        </li>
      </ul>
    </div>
    
    <div v-show="false" class="w100 fl tc sidebar-bottom">

      <input 
        type="text" 
        id="add-new-list-input" 
        @keyup.enter="addNewList" 
        @input="updateNewListName" 
        :value="newListName" 
        placeholder="List name" 
        v-show="newListInput"
      />
      
      <button type="button" id="add-new-list-btn" 
        :class="newListInput ?
                newListName ? 'royal' : 'dred'
                : 'royal'"  @click="addNewList">
        {{ newListInput ? 
            newListName ? 'Add List' : 'Cancel'
            : 'New List' }}
      </button>

    </div>

  </div>

</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

import Apps from './Apps';
import Authors from './Authors';

export default {
  computed: {
    ...mapState({
      newListName: state => state.newListInput,
    }),

    ...mapGetters({
      appsList: 'appsList',
      authorsList: 'authorsList',
      newListInput: 'newListInput',
      newListName: 'newListName',
    }),
  },

  components: {
    'app-list': Apps,
    'author-list': Authors,
  },

  created() {
    this.updateAppLists();
    this.updateAuthorsList();
  },

  methods: {
    updateNewListName(e) {
      this.$store.commit('updateNewListName', e.target.value);
    },

    ...mapMutations({
      updateAppLists: 'updateAppLists',
      updateAuthorsList: 'updateAuthorsList',
    }),

    ...mapActions({
      addNewList: 'addNewList',
      bookSearching: 'bookSearching',
    }),
  },
};
</script>

