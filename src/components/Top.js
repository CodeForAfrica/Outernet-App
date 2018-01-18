
import { mapState, mapGetters, mapActions } from 'vuex'
import Translate from './Translate'

export default {
    template: `<div class="top">
                    <button v-show="connectionStatus" :class="['translate-window-btn' , { 'active-top-btn' : showTranslate} ]" title="Translate" @click="updateShowTranslate"></button>
                    <input type="range" id="brightness" @input="updateBrightness" class="fr" min="0" max="1" step="0.02" value="1" v-if="! toggleSourcesContent"
                        title="Brightness" />
                    <button class="back-to-main-btn" title="Back to Main" v-show="! toggleSourcesContent" @click="backToMain"></button>
                    <translate></translate>
                </div>`,
    methods: {
        ...mapActions({
            updateBrightness: 'updateBrightness',
            updateShowTranslate: 'updateShowTranslate',
            backToMain: 'backToMain',
            checkConnection: 'checkConnection'
        })
    },
    computed: {
        ...mapGetters({
            toggleSourcesContent: 'toggleSourcesContent',
            showTranslate: 'showTranslate',
            connectionStatus: 'connectionStatus'
        }),
    },
    created() {
        // Trigger internet connection checkup
        setInterval(() => {
            this.checkConnection()
        }, 1000);
    },
    components: {
        'translate': Translate
    }
}