<template>
  <div class="top">
        <button 
            v-show="connectionStatus" 
            :class="['translate-window-btn' , { 'active-top-btn' : showTranslate} ]" 
            title="Translate" 
            @click="updateShowTranslate">
        </button>
        
        <input 
            type="range" 
            id="brightness" 
            @input="updateBrightness" 
            class="fr" 
            min="0" max="1"
            step="0.02" 
            value="1" 
            v-if="!toggleSources"
            title="Brightness" />

        <button 
            class="back-to-main-btn" 
            title="Back to Main" 
            v-show="!toggleSources" 
            @click="backToMain">
        </button>
        
        <translate></translate>
    </div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex';
import Translate from './Translate';

export default {
  methods: {
    ...mapActions({
      updateBrightness: 'updateBrightness',
      updateShowTranslate: 'updateShowTranslate',
      backToMain: 'backToMain',
      fetchConnStatus: 'fetchConnStatus',
    }),
  },
  computed: {
    ...mapGetters({
      toggleSources: 'toggleSources',
      showTranslate: 'showTranslate',
      connectionStatus: 'connectionStatus',
    }),
  },
  created() {
    // Trigger internet connection checkup
    setInterval(() => {
      this.fetchConnStatus();
    }, 1000);
  },
  components: {
    translate: Translate,
  },
};
</script>

