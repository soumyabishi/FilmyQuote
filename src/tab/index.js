import Vue from 'vue';
import root from './root.vue';
import VueResource from 'vue-resource';
import VueLocalStorage from 'vue-localstorage';
import './assets/js/jquery-3.1.1.min';
import './assets/js/semantic.min.js';
import vmodal from 'vue-js-modal'
import VueProgressiveImage from 'vue-progressive-image'
import firebase_config from './firebase-config';
import VueFirestore from 'vue-firestore';
import Firebase from 'firebase';
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

Vue.use(VueFirestore);

let firebaseApp = Firebase.initializeApp(firebase_config);

const firestore = firebaseApp.firestore();

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#root',
    render: h => h(root),
    localStorage: {
        filmy_quote_first_time_user: {
            type: Boolean,
            default: true,
        },
        filmy_quote_user_logged_in: {
            type: Boolean,
            default: false
        },
        filmy_quote_user_details: {
            type: Object,
            default: {
                credential: '',
                refresh_token: '',
                username: '',
                full_name: '',
                user_id: '',
                photo_url: '',
                bookmarks: [],
                display_user_name: '',
                filters: {
                    tags: [],
                    start_year: 0,
                    end_year: 0
                },
                reactions: []
            }
        },
        filmy_quote_search_movie_name: {
            type: String,
            default: '0'
        },
        filmy_quote_search_movie_year: {
            type: String,
            default: '0'
        },
        filmy_quote_search_star: {
            type: String,
            default: '0'
        }
    }
});
