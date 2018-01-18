import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

import AppList from './AppList'
import AuthorList from './AuthorList'

export default {
    template: `<div class="sidebar">                    
                    <input type="text" class="search-box" placeholder="Search..." @input="bookSearching" />
                    <div style="height: calc(100% - 145px)">
                        <h5>Apps List <span v-show="appLists.length">{{ appLists.length }}</span></h5>
                        <ul>
                            <li v-for="list in appLists">
                                <app-list :list-name="list.listName" :list-id="list._id"></app-list>
                            </li>
                        </ul>
                        <h5>Authors <span v-show="authorsList.length">{{ authorsList.length }}</span></h5>
                        <ul>
                            <li v-for="author in authorsList">
                                <author-list :author-name="author.authorName" :author-id="author._id"></author-list>
                            </li>
                        </ul>
                    </div>
                    <div class="w100 fl tc sidebar-bottom">
                        <input type="text" id="add-new-list-input" @keyup.enter="addNewList" @input="updateNewListName" :value="newListName" placeholder="List name" v-show="newListInput"/>
                        <button type="button" id="add-new-list-btn" 
                            :class="newListInput ?
                                    newListName ? 'royal' : 'dred'
                                    : 'royal'"  @click="addNewList">
                            {{ newListInput ? 
                                newListName ? 'Add List' : 'Cancel'
                                : 'New List' }}
                        </button>
                    </div>
               </div>`,
    computed: {
        ...mapState({
            newListName: state => state.newListInput
        }),
        ...mapGetters({
            appLists: 'appLists',
            authorsList: 'authorsList',
            newListInput: 'newListInput',
            newListName: 'newListName'
        })
    },
    components: {
        'app-list': AppList,
        'author-list': AuthorList
    },
    created() {
        this.updateAppLists()
        this.updateAuthorsList()
    },
    methods: {
        updateNewListName(e) {
            this.$store.commit('updateNewListName', e.target.value)
        },
        ...mapMutations({
            updateAppLists: 'updateAppLists',
            updateAuthorsList: 'updateAuthorsList'
        }),
        ...mapActions({
            addNewList: 'addNewList',
            bookSearching: 'bookSearching'
        })
    }
}