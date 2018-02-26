<template>
  <div class="book-viewer">    
    <iframe id="book-viewer-iframe" :src="src" width="100%" height="100%"></iframe>    
  </div>
</template>
<script>
export default {
  props: ['src'],
};
</script>

