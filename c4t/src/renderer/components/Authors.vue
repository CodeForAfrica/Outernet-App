<template>
  <div class="book-list">
        <span 
        :title="authorName" 
        @click="openAuthorList( { 
            authorName: authorName,
            event: $event
        })">
        {{ authorName }}
        </span>
    </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  props: ['author-id', 'author-name'],
  methods: {
    ...mapActions({
      openAuthorList: 'openAuthorList',
    }),
  },
};
</script>
