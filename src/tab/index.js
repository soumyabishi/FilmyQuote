import { Vue } from 'vue';
import { root } from './root.vue';
import { VueResource } from 'vue-resource';
import { VueLocalStorage } from 'vue-localstorage';
import './assets/js/jquery-3.1.1.min';
import './assets/js/semantic.min.js';
import { vmodal } from 'vue-js-modal'
import { VueProgressiveImage } from 'vue-progressive-image'
import { firebase_config } from './firebase-config';
require('firebase/firestore');

Vue.use(VueResource);
Vue.use(VueLocalStorage);
Vue.use(require('vue-moment'));
Vue.use(vmodal);
Vue.use(VueProgressiveImage, {
    placeholder: 'https://unsplash.it/1920/1080?image=20'
});
Vue.use(require('vue-shortkey'));
Vue.use(require('vue-cookies'));

import VueFirestore from 'vue-firestore';
import Firebase from 'firebase';

Vue.use(VueFirestore);

let firebaseApp = Firebase.initializeApp(firebase_config);

const firestore = firebaseApp.firestore();

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#root',
    firestore() {
        return {
            users: firestore.collection('users')
        }
    },
    render: h => h(root),
    localStorage: {
        filmy_quotes_user_added_dialogues: {
            type: Object,
            default: []
        },
        filmy_quotes_user_added_moods: {
            type: Object,
            default: {}
        },
        filmy_quotes_user_added_tag_filters: {
            type: Object,
            default: []
        },
        filmy_quotes_user_added_min_year: {
            type: Number,
            default: 0
        },
        filmy_quotes_user_added_max_year: {
            type: Number,
            default: 0
        },
        filmy_quotes_user_first_time: {
            type: Boolean,
            default: false
        },
        filmy_quotes_search_movie_name: {
            type: String,
            default: '0'
        },
        filmy_quotes_search_movie_year: {
            type: String,
            default: '0'
        },
        filmy_quotes_search_star: {
            type: String,
            default: '0'
        }
    }
});
