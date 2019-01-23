<template>
    <div class='' v-if="is_signin_box_open">
        <a class="logo-container">
            <img alt="FilmyQuote" src="./assets/img/logo.svg">
        </a>
        <div class="" v-if="signin_state_login_screen">
            <img src="./assets/img/welcome.png" />
            <p>{{ sign_in_box_text }}</p>
            <p>Login to continue</p>
            <div>
                <button @click="loginUser('google')">Login with Google+</button>
                <button @click="loginUser('facebook')">Login with Facebook</button>
            </div>
            <a href="#" @click="skipLogin">I ll do it later</a>
        </div>
        <div class="" v-if="signin_state_username_screen">
            <img src="./assets/img/hi.png" />
            <p>Hello, {{ user.full_name }}</p>
            <p>Choose a username</p>
            <p>Rishte mein to hum tumhare baap lagte hain, username hai</p>
            <input type="text" v-model="username_form_text" placeholder="shahansha" />
            <button @click="saveUsername">Save</button>
            <p v-if="username_not_available">Username not available</p>
        </div>
    </div>
    <div class="quote-wrapper" id="quote_wrapper" v-else>
        <a class="logo-container" v-on:click="getQuote()" v-shortkey="['space']" @shortkey="getQuote()">
            <img alt="FilmyQuote" src="./assets/img/logo.svg">
        </a>
        <div class="clock">
            <p>{{ curr_time }}
                <span> {{ curr_day }}</span>
            </p>
        </div>
        <div class="ui search" id="search_movie_dropdown">
            <div class="ui inverted transparent left icon input">
                <input class="prompt" type="text" placeholder="Filter by movie or actor name..." v-model="search_term"
                       v-if="movie_searched" v-shortkey.avoid>
                <input class="prompt" type="text" placeholder="Filter by movie or actor name..." v-else v-shortkey.avoid>
                <i class="search icon"></i>
            </div>
            <i class="close icon" @click="clearSearchMovieDetails();clearSearchStar();" v-if="movie_searched"></i>
            <div class="results"></div>
        </div>
        <modal name="hello-world"
               :adaptive="true"
               width="700"
               height="auto"
               :scrollable="true"
               transition="fade">

            <div class="dialog-content filter-modal-content">
                <h3 class="ui header">
                    Pick some tags you're interested in
                    <div class="sub header">We will use them to customize the dialogues based on your interest</div>
                </h3>
                <button class="ui tiny button compact tag_button" v-for="tag in all_tags"
                        v-bind:class="{ 'teal': tag.selected, 'basic' : !tag.selected}"
                        @click="updateTag(tag.id, tag.selected)">
                    {{ tag.name }}
                </button>
                <h3 class="ui header">
                    Set year range (Showing {{sliderValue.value[0]}} - {{sliderValue.value[1]}})
                    <div class="sub header">Drag the slider to change</div>
                </h3>
                <vue_slider ref="slider" v-model="sliderValue.value" :min="sliderValue.min" :max="sliderValue.max"
                            :interval="1"
                            tooltip='hover' :dot-size="6" :dot-width="12" :dot-height="12" :height="4"
                            :processStyle='{"backgroundColor": "#00b5ad"}'
                            :tooltipStyle='[{"backgroundColor": "#00b5ad", "borderColor": "#00b5ad"}, {"backgroundColor": "#00b5ad", "borderColor": "#00b5ad"}]'
                >
                </vue_slider>
            </div>
        </modal>
        <modal name="info"
               :adaptive="true"
               width="600"
               height="auto"
               :scrollable="true"
               transition="fade">
            <div class="dialog-content filter-modal-content">
                <img src="./assets/img/info_logo.svg">
                <span style="color: #BCBCBC">v1.0.8</span>
                <p style="margin-top:10px;color:#777">Famous bollywood movie dialogues in your new tab!</p>
                <h4 style="font-weight: 500;margin-bottom: 12px;margin-top: 70px;font-size: 17px;"> Made with love by</h4>
                <p style="font-family:'IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier, monospace;">
                    <a href="https://github.com/soumyabishi" target="_blank">Soumya Ranjan Bishi</a> and <a href="https://github.com/shiv-prasad" target="_blank">Shiv Prasad</a>
                </p>
            </div>


        </modal>

        <p class="spacebar">Hit <span>SPACEBAR</span> to shuffle.</p>

        <p class="overlay-text">FilmyQuote</p>

        <img src="./assets/img/settings.svg" class="refine-dialogues-button" @click="openFilterModal()"
             v-if="!movie_searched">
        <img src="./assets/img/settings.svg" class="" @click="logout()">

        <img src="./assets/img/info.svg" class="refine-dialogues-button info" @click="openInfoModal()">

        <!--<img src="./assets/img/share.svg" class="share-dialogue-button"  @click="init_share()">-->

        <div class="something-semantic">
            <div class="something-else-semantic">
                <div class="ui container">
                    <section class="loader" v-if="loading_quote">
                        <div id="wrap">
                            <div id="loader">
                                <div class="anim">
                                    <img src="https://s3.amazonaws.com/redpen-prod/red-pen-e37a8d47-6bc3-4828-eaa8-140b6857d23f.png"/>
                                    <img src="https://s3.amazonaws.com/redpen-prod/red-pen-ab3019c2-e584-4f2a-e241-4ef26b3bff6a.png"/>
                                    <img src="https://s3.amazonaws.com/redpen-prod/red-pen-ef2410cf-b0c7-45f5-c93c-255aba08ae9c.png"/>
                                    <img src="https://s3.amazonaws.com/redpen-prod/red-pen-2772ff4c-47ab-430b-988e-bde2c88e42c1.png"/>
                                    <img src="https://s3.amazonaws.com/redpen-prod/red-pen-6a64bf1d-5ae7-4a68-d37d-f575d49f30ff.png"/>
                                    <img src="https://s3.amazonaws.com/redpen-prod/red-pen-a83f71c2-95a7-40d7-ce86-70eb2329fd8f.png"/>
                                    <img src="https://s3.amazonaws.com/redpen-prod/red-pen-bf9170b3-13da-4b41-bd6c-ee17d8e96c5b.png"/>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="quote" v-if="!loading_quote">
                        <div class="quote-wrapper">
                            <div class="poster">
                                <progressive-img
                                        :src="actor_image_url_full" :blur="30"
                                        :placeholder="actor_image_url_thumb"
                                />
                            </div>
                            <div class="content">
                                <img src="./assets/img/quote.svg" alt="Quote" class="quote_icon">
                                <h1 class="quote-text"
                                    v-bind:class="{'small': font_isSmall, 'medium': font_isMedium, 'large': font_isLarge}">
                                    {{filmyQuotes.dialogue.dialogue}}</h1>
                                <p class="text">
                                    &mdash;&nbsp;{{filmyQuotes.dialogue.star}}, {{filmyQuotes.dialogue.movie_name}} ({{filmyQuotes.dialogue.movie_year}})</p>
                                <div class="bollymoji">
                                    <ul class="reactions">
                                        <li v-for="emotion in filmyQuotes.dialogue.emotions"
                                            v-bind:class="{'active': reaction_added_mood === 'heart_eyes'}"
                                            v-if="emotion.mood == 'heart_eyes'">
                                            <img src="./assets/img/bollymojis/heart_eyes.png" class="bollymojis_text"
                                                 v-on:click="updateReaction(filmyQuotes.dialogue.id, 'heart_eyes')">
                                            <div class="ui flowing mini popup top center">
                                                Pyaar ho jayega..
                                            </div>
                                            <p class="count">{{emotion.count}}</p>
                                        </li>
                                        <li v-for="emotion in filmyQuotes.dialogue.emotions"
                                            v-bind:class="{'active': reaction_added_mood === 'joy'}"
                                            v-if="emotion.mood == 'joy'">
                                            <img src="./assets/img/bollymojis/joy.png" class="bollymojis_text"
                                                 v-on:click="updateReaction(filmyQuotes.dialogue.id, 'joy')">
                                            <div class="ui flowing mini popup top center">
                                                Bahuut maza aya
                                            </div>
                                            <p class="count">{{emotion.count}}</p>
                                        </li>
                                        <li v-for="emotion in filmyQuotes.dialogue.emotions"
                                            v-bind:class="{'active': reaction_added_mood === 'flushed'}"
                                            v-if="emotion.mood == 'flushed'">
                                            <img src="./assets/img/bollymojis/flushed.png" class="bollymojis_text"
                                                 v-on:click="updateReaction(filmyQuotes.dialogue.id, 'flushed')">
                                            <div class="ui flowing mini popup top center">
                                                Wow! kya dialogue hai!
                                            </div>
                                            <p class="count">{{emotion.count}}</p>
                                        </li>
                                        <li v-for="emotion in filmyQuotes.dialogue.emotions"
                                            v-bind:class="{'active': reaction_added_mood === 'pensive'}"
                                            v-if="emotion.mood == 'pensive'">
                                            <img src="./assets/img/bollymojis/pensive.png" class="bollymojis_text"
                                                 v-on:click="updateReaction(filmyQuotes.dialogue.id, 'pensive')">
                                            <div class="ui flowing mini popup top center">
                                                Mummy ko bol dunga
                                            </div>
                                            <p class="count">{{emotion.count}}</p>
                                        </li>
                                        <li v-for="emotion in filmyQuotes.dialogue.emotions"
                                            v-bind:class="{'active': reaction_added_mood === 'rage'}"
                                            v-if="emotion.mood == 'rage'">
                                            <img src="./assets/img/bollymojis/rage.png" class="bollymojis_text"
                                                 v-on:click="updateReaction(filmyQuotes.dialogue.id, 'rage')">
                                            <div class="ui flowing mini popup top center">
                                                Kaat ke rakh dunga
                                            </div>
                                            <p class="count">{{emotion.count}}</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="no-quote" v-if="no_quotes_found">
                    <p>Sorry, no dialogues to show! :(</p>
                    </section>
                </div>
            </div>
        </div>
        <div class="quote-details" v-if="!loading_quote">
            <ul>
                <li class="tags">
                    <span v-for="(tag,index) in filmyQuotes.dialogue.tags">
                        {{ tag }}<span v-if="index<filmyQuotes.dialogue.tags.length-1">, </span>
                     </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import {Picker} from 'emoji-mart-vue';
    import {Emoji} from 'emoji-mart-vue';
    import placeHolderUrl from './assets/img/placeholder.svg';
    import vueSlider from 'vue-slider-component';
    import domtoimage from 'dom-to-image';
    import firebase from 'firebase';

    const pickEmoji = [
        {
            name: 'pickemoji',
            short_names: ['pickemoji'],
            text: '',
            emoticons: [],
            keywords: ['pickemoji'],
            imageUrl: './assets/img/pickemoji.svg'
        },
    ];

    export default {

        components: {
            picker: Picker,
            emoji: Emoji,
            vue_slider: vueSlider
        },

        data() {
            return {
                sign_in_box_text: "",
                messages_text: {
                    sign_in_box: {
                        default: "Thanks for choosing FilmyQuote!",
                        first_time_user: "Thanks for choosing FilmyQuote!",
                        bookmark: "You need to be logged in to bookmark this dialog",
                        filters: "You need to be logged in to set filters",
                        reactions: "You need to be logged in to react to this dialog",
                    },
                },
                is_user_logged_in: false,
                is_signin_box_open: false,
                is_filter_box_open: false,
                signin_state_login_screen: false,
                signin_state_username_screen: false,
                user: {
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
                },
                default_user: {
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
                },
                username_form_text: "",
                username_not_available: false,
                pending_task: '',
                filmyQuotes: {
                    "dialogue": {
                        "id": 0,
                        "dialogue": "",
                        "movie_name": "",
                        "star": "",
                        "movie_year": 0,
                        "tags": [],
                        "emotions": [],
                        "star_image_url": ""
                    }
                },
                curr_time:'',
                curr_day:'',
                actor_image_url: '',
                first_quote: true,
                loading_quote: false,
                actor_image_url_full: '',
                actor_image_url_thumb: '',
                reaction_added: false,
                reaction_added_mood: '',
                reaction_added_dialogue: '',
                adding_reaction: false,
                font_isSmall: false,
                font_isMedium: false,
                font_isLarge: false,
                all_tags: [],
                sliderValue: {
                    value: [0, 0],
                    max: 0,
                    min: 0,
                },
                first_time_user: false,
                base_url: 'https://www.filmyquote.tk',
                search_movie_name: '0',
                search_movie_year: '0',
                search_star: '0',
                search_term: '',
                movie_searched: false,
                no_quotes_found: false,
            }
        },

        computed: {},

        methods: {

            createUsername(name) {
                return name.split(" ").map(function(v, i, a) {
                    return i !== (a.length - 1) ? v[0] : v;
                }).join('').toLowerCase();
            },

            checkFirstTimeUser() {
                if (this.$localStorage.get('filmy_quote_first_time_user')) {
                    this.$localStorage.set('filmy_quote_first_time_user', false);
                    this.openSignInBox("first_time");
                }
            },

            skipLogin() {
                this.is_signin_box_open = false;
                this.signin_state_login_screen = false;
            },

            checkUserSignedIn() {
                this.is_user_logged_in = this.$localStorage.get('filmy_quote_user_logged_in');
            },

            checkUserDetails() {
                this.user = this.$localStorage.get('filmy_quote_user_details');
            },

            openSignInBox(signin_type) {
                if (!this.is_user_logged_in) {
                    if (signin_type === 'first_time') {
                        this.sign_in_box_text = this.messages_text.sign_in_box.first_time_user;
                    } else if (signin_type === 'default') {
                        this.sign_in_box_text = this.messages_text.sign_in_box.default;
                    } else if (signin_type === 'bookmark') {
                        this.sign_in_box_text = this.messages_text.sign_in_box.bookmark;
                    } else if (signin_type === 'reactions') {
                        this.sign_in_box_text = this.messages_text.sign_in_box.reactions;
                    } else if (signin_type === 'filters') {
                        this.sign_in_box_text = this.messages_text.sign_in_box.filters;
                    }
                    this.is_signin_box_open = true;
                    this.signin_state_login_screen = true;
                }
            },

            loginUser(type) {
                let provider = null;
                let vm = this;
                if (type === 'google') {
                    provider = new firebase.auth.GoogleAuthProvider();
                } else if (provider === 'facebook') {
                    provider = new firebase.auth.FacebookAuthProvider();
                }
                firebase
                    .auth()
                    .signInWithPopup(provider)
                    .then( (result) => {
                        vm.user.credential = {
                            access_token: result.credential.accessToken,
                            id_token: result.credential.idToken,
                            provider_id: result.credential.providerId,
                            sign_in_method: result.credential.signInMethod
                        };
                        vm.user.refresh_token = result.user.refreshToken;
                        vm.user.full_name = result.user.displayName;
                        vm.user.user_id = result.user.uid;
                        vm.user.photo_url = result.user.photoURL;
                        if (result.additionalUserInfo.isNewUser) {
                            vm.signin_state_username_screen = true;
                            vm.createNewUser();
                        } else {
                            vm.updateExistingUser();
                        }
                        vm.signin_state_login_screen = false;
                        vm.is_user_logged_in = true;
                        vm.$localStorage.set('filmy_quote_user_logged_in', true);
                    });
            },

            createNewUser() {
                let username = this.createUsername(this.user.full_name);
                let vm = this;
                firebase.firestore()
                    .collection('users')
                    .doc(username)
                    .get()
                    .then( (usernameSnapshot) => {
                        if (usernameSnapshot.exists) {
                            firebase.firestore()
                                .collection('id')
                                .doc('SF')
                                .get()
                                .then( (querySnapshot) => {
                                    let currId = querySnapshot.data()['population'];
                                    let vm1 = vm;
                                    firebase.firestore()
                                        .collection('id')
                                        .doc('SF')
                                        .update({
                                            population: (currId+1)
                                        })
                                        .then( (updatedId) => {
                                            let new_username = username + String(updatedId.data()['population']);
                                            vm1.addUserFirestore(new_username);
                                    });
                            });
                        } else {
                            this.addUserFirestore(username);
                        }
                    });
            },

            addUserFirestore(username) {
                this.user.username = username;
                this.user.display_user_name = username;
                firebase.firestore()
                    .collection('users')
                    .doc(username)
                    .set(this.user)
                    .then( (newUser) => {});
                this.updateLocalUser();
            },

            updateExistingUser() {
                let vm = this;
                firebase.firestore()
                    .collection('users')
                    .doc(this.user.username)
                    .get()
                    .then( (querySnapshot) => {
                        vm.user = querySnapshot.data();
                        vm.updateLocalUser();
                    });
            },

            updateLocalUser() {
                this.$localStorage.set('filmy_quote_user_details', this.user);
                this.updatePendingTasks();
            },

            saveUsername() {
                let vm = this;
                firebase.firestore()
                    .collection('users')
                    .where('display_user_name', '==', this.username_form_text)
                    .get()
                    .then( (querySnapshot) => {
                        if (querySnapshot.size !== 0) {
                            vm.username_not_available = true;
                        } else {
                            let vm1 = vm;
                            firebase.firestore()
                                .collection('users')
                                .doc(vm.user.username)
                                .update({
                                    display_user_name: vm.username_form_text
                                })
                                .then( (updateSnapshot) => {
                                    vm1.user.display_user_name = vm1.username_form_text;
                                    vm1.username_form_text = '';
                                    vm1.sign_in_box_text = '';
                                    vm1.is_signin_box_open = false;
                                    vm1.signin_state_username_screen = false;
                                });
                        }
                    });
            },

            updatePendingTasks() {

            },

            checkSearchMovieDetails() {
                this.search_movie_name = this.$localStorage.get('filmy_quote_search_movie_name');
                this.search_movie_year = this.$localStorage.get('filmy_quote_search_movie_year');
                if (this.search_movie_name != '0') {
                    this.movie_searched = true;
                }
            },

            setSearchMovieDetails(movie_name, movie_year) {
                this.$localStorage.set('filmy_quote_search_movie_name', movie_name);
                this.$localStorage.set('filmy_quote_search_movie_year', movie_year);
                this.search_movie_name = movie_name;
                this.search_movie_year = movie_year;
                this.movie_searched = true;
            },

            clearSearchMovieDetails() {
                this.$localStorage.set('filmy_quote_search_movie_name', '0');
                this.$localStorage.set('filmy_quote_search_movie_year', '0');
                this.search_movie_name = '0';
                this.search_movie_year = '0';
                this.movie_searched = false;
            },

            checkSearchStar() {
                this.search_star = this.$localStorage.get('filmy_quote_search_star');
                if (this.search_star != '0') {
                    this.movie_searched = true;
                }
            },

            setSearchStar(star) {
                this.$localStorage.set('filmy_quote_search_star', star);
                this.search_star = star;
                this.movie_searched = true;
            },

            clearSearchStar() {
                this.$localStorage.set('filmy_quote_search_star', '0');
                this.search_star = '0';
                this.movie_searched = false;
            },

            fetchYearRange() {
                this.loading_quote = true;
                let url = this.base_url + '/api/get-year-range/';
                this.$http.get(url).then(response => {
                    this.sliderValue.min = response.data.min_year;
                    this.sliderValue.max = response.data.max_year;
                    if (this.user.filters.start_year === 0) {
                        this.user.filters.start_year = response.data.min_year;
                    }
                    if (this.user.filters.end_year === 0 || this.user.filters.end_year === (response.data.max_year - 1)) {
                        this.user.filters.end_year = response.data.max_year;
                    }
                    this.sliderValue.value = [this.user.filters.start_year, this.user.filters.end_year];
                    this.getQuote();
                    this.updateLocalUser();
                }, response => {
                });
            },

            fetchTags() {
                let url = this.base_url + '/api/get-tags/';
                this.$http.get(url).then(response => {
                    this.all_tags = response.data.tags;
                    this.checkFilteredTags();
                }, response => {
                });
            },

            openFilterModal() {
                if (this.is_user_logged_in) {
                    this.$modal.show('hello-world');
                } else {
                    this.pending_task = 'filter';
                    this.openSignInBox('filters');
                }
            },

            openInfoModal() {
                this.$modal.show('info');
            },

            checkFilteredTags() {
                let all_filtered_tags = this.user.filters.tags;
                for (let i = 0; i < this.all_tags.length; i++) {
                    if (all_filtered_tags.indexOf(this.all_tags[i].id) > -1) {
                        this.all_tags[i].selected = true;
                    } else {
                        this.all_tags[i].selected = false;
                    }
                }
                this.$forceUpdate();
            },

            updateFirestoreFilters() {
                let vm = this;
                firebase.firestore()
                    .doc(this.user.username)
                    .update({
                        filters: this.user.filters
                    })
                    .then( (updatedFilters) => {
                        vm.updateLocalUser();
                    });
            },

            updateTag(tag_id, selected) {
                if (selected) this.removeTagFromFilteredTags(tag_id);
                else this.addTagToFilteredTags(tag_id);
            },

            addTagToFilteredTags(tag_id) {
                this.user.filters.tags.push(tag_id);
                this.updateFirestoreFilters();
                this.checkFilteredTags();
            },

            removeTagFromFilteredTags: function (tag_id) {
                let all_filtered_tags = this.user.filters.tags;
                let tag_index = all_filtered_tags.indexOf(tag_id);
                if (tag_index > -1) {
                    all_filtered_tags.splice(tag_index, 1)
                }
                this.user.filters.tags = all_filtered_tags;
                this.updateFirestoreFilters();
                this.checkFilteredTags();
            },

            setFontsize(dialogue_text) {
                let numWords = dialogue_text.split(" ").length;
                this.font_isSmall = false;
                this.font_isMedium = false;
                this.font_isLarge = false;
                if (numWords >= 1 && numWords < 10) {
                    this.font_isLarge = true;
                }
                else if (numWords >= 10 && numWords < 40) {
                    this.font_isMedium = true;
                }
                else if (numWords >= 40) {
                    this.font_isSmall = true;
                }
            },

            enableEmojiPopup() {
                setTimeout(function () {
                    $('.add_reaction_button')
                        .popup({
                            inline: true,
                            on: 'click',
                            duration: 200,
                            onShow: function () {
                                $(".button").addClass("active");
                            },
                            onHide: function () {
                                $(".button").removeClass("active");
                            }
                        });
                }, 10);
            },

            enableBollymojisPopup(){
                setTimeout(function () {
                    $('.bollymojis_text')
                        .popup({
                            inline: true,
                            position: 'top center',
                            duration: 100
                        });

                }, 10);
            },

            getQuote() {
                this.no_quotes_found = false;
                this.loading_quote = true;
                let url = this.base_url + '/api/get-dialogues/?include_tags=';
                let filtered_tags = this.user.filters.tags;
                if (filtered_tags.length) {
                    url += filtered_tags.join();
                } else {
                    url += '0';
                }
                url += '&year_min=' + this.sliderValue.value[0] + '&year_max=' + this.sliderValue.value[1];
                url += '&movie_name=' + this.search_movie_name + '&movie_year=' + this.search_movie_year;
                url += '&star=' + this.search_star;
                this.$http.get(url).then(response => {
                    this.loading_quote = false;
                    this.filmyQuotes = response.data;
                    if (this.filmyQuotes.dialogue.star_image_url) {
                        this.actor_image_url_full = 'https://image.tmdb.org/t/p/w300_and_h300_face/' + this.filmyQuotes.dialogue.star_image_url;
                        this.actor_image_url_thumb = 'https://image.tmdb.org/t/p/w50_and_h50_face/' + this.filmyQuotes.dialogue.star_image_url;
                    } else {
                        this.actor_image_url_full = placeHolderUrl;
                        this.actor_image_url_thumb = placeHolderUrl
                    }
                    this.getReactedMood(this.filmyQuotes.dialogue.id);
                    this.setFontsize(this.filmyQuotes.dialogue.dialogue);
                    this.enableEmojiPopup();
                    this.enableBollymojisPopup();
                }, response => {
                    this.loading_quote = false;
                    this.no_quotes_found = true;
                });
            },

            updateFirestoreReactions() {
                let vm = this;
                firebase.firestore()
                    .collection('users')
                    .doc(this.user.username)
                    .update({
                        reactions: this.user.reactions
                    })
                    .then( (updatedSnapshot) => {
                        vm.updateLocalUser();
                    });
            },

            getReactedMood(dialogue_id) {
                let reactionKeys = Object.keys(this.user.reactions);
                if (reactionKeys.indexOf(dialogue_id) !== -1) {
                    this.reaction_added = true;
                    this.reaction_added_mood = this.user.reactions[dialogue_id];
                    this.reaction_added_dialogue = dialogue_id;
                } else {
                    this.reaction_added = false;
                    this.reaction_added_mood = '';
                    this.reaction_added_dialogue = '';
                }
            },

            updateReaction(dialogue_id, mood) {
                if (this.is_user_logged_in) {
                    let new_addition = false;
                    if (dialogue_id !== this.reaction_added_dialogue) {
                        new_addition = true;
                    }
                    this.removeReaction();
                    if (new_addition) {
                        let data = {
                            'dialogue': dialogue_id,
                            'mood': mood
                        };
                        this.$http.post(this.base_url + '/api/add-emotion/', data).then(response => {
                            let emotions = this.filmyQuotes.dialogue.emotions;
                            let emotion_found = false;
                            let emotion_at = -1;
                            for (let i = 0; i < emotions.length; i++) {
                                if (emotions[i].mood === mood) {
                                    emotion_found = true;
                                    emotion_at = i;
                                    break
                                }
                            }
                            if (emotion_found) {
                                emotions[emotion_at].count = emotions[emotion_at].count + 1;
                            } else {
                                emotions.push({
                                    mood: mood,
                                    count: 1
                                })
                            }
                            this.filmyQuotes.dialogue.emotions = emotions;
                            this.reaction_added = true;
                            this.reaction_added_mood = mood;
                            this.reaction_added_dialogue = dialogue_id;
                            this.addUserReactions(dialogue_id, mood);
                            this.adding_reaction = false;
                            this.$forceUpdate();
                        }, response => {
                            this.adding_reaction = false;
                        });
                    }
                } else {
                    this.pending_task = 'reaction';
                    this.openSignInBox('reactions');
                }
            },

            addUserReactions(dialogue_id, mood) {
                this.user.reactions[dialogue_id] = mood;
                this.updateFirestoreReactions();
            },

            removeReaction() {
                    let data = {
                        'dialogue': this.reaction_added_dialogue,
                        'mood': this.reaction_added_mood
                    };
                    this.$http.post(this.base_url + '/api/remove-emotion/', data).then(response => {
                        let emotions = this.filmyQuotes.dialogue.emotions;
                        let emotion_found = false;
                        let emotion_at = -1;
                        for (let i = 0; i < emotions.length; i++) {
                            if (emotions[i].mood === mood) {
                                emotion_found = true;
                                emotion_at = i;
                                break
                            }
                        }
                        if (emotion_found) {
                            if (emotions[emotion_at].count === 1) {
                                emotions.splice(emotion_at, 1)
                            } else {
                                emotions[emotion_at].count = emotions[emotion_at].count - 1;
                            }
                        }
                        this.filmyQuotes.dialogue.emotions = emotions;
                        this.reaction_added = false;
                        this.reaction_added_mood = '';
                        this.reaction_added_dialogue = '';
                        this.removeUserReactions(this.reaction_added_dialogue);
                        this.enableEmojiPopup();
                        this.$forceUpdate();
                    }, response => {
                    });
            },

            removeUserReactions(dialogue_id) {
                let user_reaction_keys = Object.keys(this.user.reactions);
                let final_reactions = {};
                for (let i=0; i<user_reaction_keys.length; i++) {
                    if (user_reaction_keys[i] !== dialogue_id) {
                        final_reactions[user_reaction_keys[i]] = this.user.reactions[user_reaction_keys[i]];
                    }
                }
                this.user.reactions = final_reactions;
                this.updateFirestoreReactions();
            },

            initShare() {
                let vm = this;
                let node = document.getElementById('quote_wrapper');
                domtoimage.toJpeg(node, {quality: 0.95})
                    .then(function (dataUrl) {
                        var link = document.createElement('a');
                        link.download = 'filmy-quote-' + vm.filmyQuotes.dialogue.id + '.jpeg';
                        link.href = dataUrl;
                    });
            },

            moment: function () {
                return moment();
            },

            beforeClose(event) {
                this.getQuote();
            },

            clearStorage() {
                this.user = this.default_user;
                this.is_user_logged_in = false;
                this.updateLocalUser();
                this.$localStorage.set('filmy_quote_user_logged_in', false);
            },

            logout() {
                let vm = this;
                firebase.auth()
                    .signOut()
                    .then((signOutResponse) => {
                        vm.clearStorage();
                    });
            }

        },


        mounted() {
            this.checkFirstTimeUser();
            this.checkUserSignedIn();
            this.checkUserDetails();
            this.checkSearchMovieDetails()
            this.checkSearchStar();
            this.fetchTags();
            this.fetchYearRange();
            let vm = this;
            $('#search_movie_dropdown').search({
                apiSettings: {
                    url: this.base_url + '/api/search-movies-star/?query={query}',
                },
                onSelect: function (result, response) {
                    let search_type = result.type;
                    if(search_type === 'movie'){
                        let movie_name = result.value.split('|')[0].trim();
                        let movie_year = result.value.split('|')[1].trim();
                        vm.setSearchMovieDetails(movie_name, movie_year);
                    }else{
                        vm.setSearchStar(result.value.trim())
                    }
                    vm.search_term = result.text;
                    vm.fetchYearRange();
                },
                fields: {
                    results: 'results',
                    title: 'text',
                },
            });
            setInterval(function(){
                vm.curr_time = moment().format('hh:mm a');
                vm.curr_day = moment().format('ddd, MMMM D');
            }, 1000);
        },
    }

</script>

<style lang="scss">
    @import './assets/css/semantic.min.css';
    @import './assets/css/fde6xbm.css';
    @import './assets/css/animate.css';
    @import '../../node_modules/inter-ui/inter-ui.css';
    @import '../../node_modules/@ibm/type/css/ibm-type.min.css';
    @import './assets/css/main.css';
    @import '../../node_modules/vue-range-slider/dist/vue-range-slider.css';
    @import '../../node_modules/vue-js-modal/dist/styles.css';
</style>
