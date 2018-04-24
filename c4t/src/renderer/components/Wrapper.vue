<template>
  <div :class="['main', { 'update' : update_check }]">

    <top />

    <sidebar v-show="toggleSources"></sidebar>

    <sources v-show="toggleSources"></sources>

    <viewer v-show="!toggleSources" :src="openedBookPath"></viewer>

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
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import request from 'request';
import { shell } from 'electron';

import Top from './Top';
import Viewer from './Viewer';
import Sidebar from './Sidebar';
import Sources from './Sources';

export default {
  computed: {
    ...mapGetters({
      toggleSources: 'toggleSources',
      openedBookPath: 'openedBookPath',
      isLoading: 'isLoading',
    }),
  },
  data() {
    return { update_check: false };
  },
  methods: {
    // open the link on browser
    downloadUpdate() {
      const homepage = require('../../../package.json').homepage;
      shell.openExternal(`${homepage}/releases/latest`);
    },
    ...mapActions({
      addAppList: 'addAppList',
    }),
  },
  created() {
    // this.addAppList();
    localStorage.clear();

    try {
      request.get('https://api.github.com/repos/mtuchi/C4T-Ed/releases/latest',
        { headers: { 'Content-Type': 'application/json', 'User-Agent': 'request' } },
        (err, res, body) => {
          const jsonBody = JSON.parse(body);

          const currentVersion = require('../../../package.json').version.toString();
          if (jsonBody.tag_name) {
            const releaseVersion = jsonBody.tag_name.substr(1).toString();
            this.update_check = (currentVersion !== releaseVersion);
          }
        });
    } catch (error) {
      // console.log(error);
    }
  },
  components: {
    top: Top,
    viewer: Viewer,
    sidebar: Sidebar,
    sources: Sources,
  },
};
</script>

