import Vue from 'vue'
import root from './root.vue'
import VueResource from 'vue-resource'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueResource);
Vue.use(VueLocalStorage);

import'./assets/js/jquery-3.1.1.min'
import'./assets/js/semantic.min.js'
Vue.use(require('vue-moment'));


import VueProgressiveImage from 'vue-progressive-image'

Vue.use(VueProgressiveImage, {
    placeholder: 'https://unsplash.it/1920/1080?image=20'
});

Vue.use(require('vue-shortkey'));
Vue.use(require('vue-cookies'));



Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#root',
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
        }
    }
})
