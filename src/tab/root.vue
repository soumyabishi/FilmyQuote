<template>
    <div class="quote-wrapper" id="quote_wrapper">

        <a class="logo-container" v-on:click="get_quote()" v-shortkey="['space']" @shortkey="get_quote()">
            <img alt="FilmyQuote" src="./assets/img/logo.svg">
        </a>

        <p class="made-by ibm-type-mono">
            Made with love by <a href="https://github.com/soumyabishi" target="_blank">Soumya</a> & <a href="https://github.com/shiv-param" target="_blank">Shiv</a>.
        </p>


        <p class="overlay-text">FilmyQuote</p>


           <img src="./assets/img/settings.svg" class="refine-dialogues-button" @click="open_filter_modal()">
           <img src="./assets/img/share.svg" class="share-dialogue-button"  @click="init_share()">


        <div class="ui modal filter_modal">
            <!--<div class="ui header">-->
               <!--Preferences-->
            <!--</div>-->
            <div class="content filter-modal-content">

                <h3 class="ui header">
                    Pick some tags you're interested in
                    <div class="sub header">We will use them to customize the dialogues based on your interest</div>

                </h3>


                <button class="ui tiny button tag_button" v-for="tag in all_tags" v-bind:class="{ 'teal': tag.selected, 'basic' : !tag.selected}" @click="update_tag(tag.id, tag.selected)">
                    {{ tag.name }}
                </button>
                <div class="ui hidden divider"></div>
                <div class="ui hidden divider"></div>
                <div class="ui hidden divider"></div>
                <h3 class="ui header">
                    Set min and max movie year
                </h3>
                <vue_slider ref="slider" v-model="sliderValue.value" :min="sliderValue.min" :max="sliderValue.max" :interval="1"></vue_slider>
            </div>

            <div class="actions">
                <div class="ui deny basic button">Close</div>
            </div>

        </div>

        <div class="something-semantic">
            <div class="something-else-semantic">

                <div class="ui container">

                    <section class="loader" v-if="loading_quote">
                        <div id="wrap">
                            <div id="loader">
                                <div class="anim">
                                    <img src="https://s3.amazonaws.com/redpen-prod/red-pen-e37a8d47-6bc3-4828-eaa8-140b6857d23f.png" />
                                    <img src="https://s3.amazonaws.com/redpen-prod/red-pen-ab3019c2-e584-4f2a-e241-4ef26b3bff6a.png" />
                                    <img src="https://s3.amazonaws.com/redpen-prod/red-pen-ef2410cf-b0c7-45f5-c93c-255aba08ae9c.png" />
                                    <img src="https://s3.amazonaws.com/redpen-prod/red-pen-2772ff4c-47ab-430b-988e-bde2c88e42c1.png" />
                                    <img src="https://s3.amazonaws.com/redpen-prod/red-pen-6a64bf1d-5ae7-4a68-d37d-f575d49f30ff.png" />
                                    <img src="https://s3.amazonaws.com/redpen-prod/red-pen-a83f71c2-95a7-40d7-ce86-70eb2329fd8f.png" />
                                    <img src="https://s3.amazonaws.com/redpen-prod/red-pen-bf9170b3-13da-4b41-bd6c-ee17d8e96c5b.png" />
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
                                <h1 class="quote-text" v-bind:class="{'small': font_isSmall, 'medium': font_isMedium, 'large': font_isLarge}">{{filmyQuotes.dialogue.dialogue}}</h1>
                                <p class="text">&mdash;&nbsp;{{filmyQuotes.dialogue.star}}, {{filmyQuotes.dialogue.movie_name}} ({{filmyQuotes.dialogue.movie_year}})</p>

                                <div class="emoji">
                                    <ul class="reactions">
                                        <li v-for="emotion in filmyQuotes.dialogue.emotions">
                                            <span class="reaction-emo">
                                                <emoji set="apple" emoji="heart_eyes" :size="25" v-bind:class="{'animated bounceIn selected': check_reaction_added_for_mood('heart_eyes')}" v-if="emotion.mood == 'heart_eyes'" v-on:click="remove_reaction(filmyQuotes.dialogue.id, 'heart_eyes')"></emoji>
                                                <emoji set="apple" emoji="joy" :size="25" v-bind:class="{'animated bounceIn selected': check_reaction_added_for_mood('joy')}"v-if="emotion.mood == 'joy'" v-on:click="remove_reaction(filmyQuotes.dialogue.id, 'joy')"></emoji>
                                                <emoji set="apple" emoji="flushed" :size="25"  v-bind:class="{'animated bounceIn selected': check_reaction_added_for_mood('flushed')}" v-if="emotion.mood == 'flushed'" v-on:click="remove_reaction(filmyQuotes.dialogue.id, 'flushed')"></emoji>
                                                <emoji set="apple" emoji="pensive" :size="25"  v-bind:class="{'animated bounceIn selected': check_reaction_added_for_mood('pensive')}" v-if="emotion.mood == 'pensive'" v-on:click="remove_reaction(filmyQuotes.dialogue.id, 'pensive')"></emoji>
                                                <emoji set="apple" emoji="rage" :size="25"  v-bind:class="{'animated bounceIn selected': check_reaction_added_for_mood('rage')}" v-if="emotion.mood == 'rage'" v-on:click="remove_reaction(filmyQuotes.dialogue.id, 'rage')"></emoji>
                                            </span>
                                            {{emotion.count}}
                                        </li>
                                    </ul>
                                    <div class="button add_reaction_button" :class="{'loading':adding_reaction}" v-if="reaction_not_added">Add reaction
                                    </div>
                                    <div class="ui flowing popup top right transition hidden" v-if="reaction_not_added">
                                        <ul class="emojis-wrapper">
                                            <li class="emo">
                                                <emoji set="apple" emoji="heart_eyes" :size="35"  v-on:click="add_reaction(filmyQuotes.dialogue.id,'heart_eyes')"></emoji>
                                            </li>
                                            <li class="emo">
                                                <emoji set="apple" emoji="joy" :size="35"  v-on:click="add_reaction(filmyQuotes.dialogue.id,'joy')"></emoji>
                                            </li>
                                            <li class="emo">
                                                <emoji set="apple" emoji="flushed" :size="35"  v-on:click="add_reaction(filmyQuotes.dialogue.id,'flushed')"></emoji>
                                            </li>
                                            <li class="emo">
                                                <emoji set="apple" emoji="pensive" :size="35"  v-on:click="add_reaction(filmyQuotes.dialogue.id,'pensive')"></emoji>
                                            </li>
                                            <li class="emo">
                                                <emoji set="apple" emoji="rage" :size="35"  v-on:click="add_reaction(filmyQuotes.dialogue.id,'rage')"></emoji>
                                            </li>
                                        </ul>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </section>
                    <a id="refresh" value="Refresh" v-on:click="get_quote()" v-shortkey="['space']" @shortkey="get_quote()" v-if="!loading_quote">
                        <svg class="icon"   version="1.1" id="Capa_1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     width="35px" height="35px" viewBox="0 0 322.447 322.447" style="enable-background:new 0 0 322.447 322.447;"
     xml:space="preserve">
        <g>
          <path  d="M321.832,230.327c-2.133-6.565-9.184-10.154-15.75-8.025l-16.254,5.281C299.785,206.991,305,184.347,305,161.224
            c0-84.089-68.41-152.5-152.5-152.5C68.411,8.724,0,77.135,0,161.224s68.411,152.5,152.5,152.5c6.903,0,12.5-5.597,12.5-12.5
            c0-6.902-5.597-12.5-12.5-12.5c-70.304,0-127.5-57.195-127.5-127.5c0-70.304,57.196-127.5,127.5-127.5
            c70.305,0,127.5,57.196,127.5,127.5c0,19.372-4.371,38.337-12.723,55.568l-5.553-17.096c-2.133-6.564-9.186-10.156-15.75-8.025
            c-6.566,2.134-10.16,9.186-8.027,15.751l14.74,45.368c1.715,5.283,6.615,8.642,11.885,8.642c1.279,0,2.582-0.198,3.865-0.614
            l45.369-14.738C320.371,243.946,323.965,236.895,321.832,230.327z"/>
        </g>
       </svg>
                    </a>
                    <div class="ui popup">
                        Refresh to get a new one!
                    </div>

                    <!--<picker @click="addEmoji"></picker>-->

                </div>
            </div>
        </div>

        <div class="quote-details" v-if="!loading_quote">

            <ul>
                <li class="movie-name">{{filmyQuotes.dialogue.movie_name}} <span
                        class="year">({{filmyQuotes.dialogue.movie_year}})</span>
                </li>
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
    import {Picker} from 'emoji-mart-vue';
    import {Emoji} from 'emoji-mart-vue';
    import placeHolderUrl from './assets/img/placeholder.svg';
    import vueSlider from 'vue-slider-component';
    import domtoimage from 'dom-to-image';

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
                actor_image_url: '',
                first_quote: true,
                loading_quote: false,
                actor_image_url_full: '',
                actor_image_url_thumb: '',
                reaction_not_added: true,
                reaction_added: '',
                adding_reaction: false,
                font_isSmall: false,
                font_isMedium: false,
                font_isLarge: false,
                all_tags: [],
                sliderValue: {
                    value: [0, 0],
                    max: 0,
                    min: 0
                },
                first_time_user: false,
                base_url: 'http://18.219.186.38'
            }
        },

        computed: {},

        methods: {

            check_first_time_user() {
                this.first_time_user = this.$localStorage.get('filmy_quotes_user_first_time');
                this.$localStorage.set('filmy_quotes_user_first_time', true);
            },

            fetch_year_range() {
                this.loading_quote = true;
                let url = this.base_url + '/api/get-year-range/';
                this.$http.get(url).then(response => {
                        this.sliderValue.min = response.data.min_year;
                        this.sliderValue.max = response.data.max_year;
                        let min_year_filter = this.$localStorage.get('filmy_quotes_user_added_min_year');
                        let max_year_filter = this.$localStorage.get('filmy_quotes_user_added_max_year');
                        if (min_year_filter === 0) {
                            min_year_filter = response.data.min_year;
                            this.$localStorage.set('filmy_quotes_user_added_min_year', min_year_filter);
                        }
                        if (max_year_filter === 0) {
                            max_year_filter = response.data.max_year;
                        }
                        this.sliderValue.value = [min_year_filter, max_year_filter];
                      this.get_quote();
                }, response => {
                });
            },

            fetch_tags() {
                let url = this.base_url + '/api/get-tags/';
                this.$http.get(url).then(response => {
                    this.all_tags = response.data.tags;
                    this.check_filtered_tags();
                }, response => {
                });
            },

            open_filter_modal() {

                window.setTimeout(() => {
                    $('.filter_modal')
                        .modal({
                            observeChanges: true
                        })
                        .modal('show');
                }, 30)


            },

            check_reacted_mood(dialogue_id, mood) {
                let all_reacted_moods = this.$localStorage.get('filmy_quotes_user_added_moods');
                return all_reacted_moods.dialogue_id === mood;
            },

            check_reaction_added_for_mood(mood){
                return (this.reaction_added == mood && this.reaction_not_added == false);
            },

            check_reacted_dialogue(dialogue_id) {
                let all_reacted_dialogues = this.$localStorage.get('filmy_quotes_user_added_dialogues');
                // console.log(all_reacted_dialogues);
                let reacted = all_reacted_dialogues.indexOf(dialogue_id) > -1;
                if (reacted){
                    let all_reacted_moods = this.$localStorage.get('filmy_quotes_user_added_moods');
                    this.reaction_added = all_reacted_moods.dialogue_id;
                }
                return reacted;
            },

            check_filtered_tags() {
                let all_filtered_tags = this.$localStorage.get("filmy_quotes_user_added_tag_filters");
                // console.log(all_filtered_tags);
                for (let i = 0; i < this.all_tags.length; i++) {
                    if (all_filtered_tags.indexOf(this.all_tags[i].id) > -1) {
                        this.all_tags[i].selected = true;
                    } else {
                        this.all_tags[i].selected = false;
                    }
                }
                this.$forceUpdate();
            },

            update_tag(tag_id, selected) {
                if (selected) this.remove_tag_from_filtered_tags(tag_id);
                else this.add_tag_to_filtered_tags(tag_id);
            },

            add_tag_to_filtered_tags(tag_id) {
                let all_filtered_tags = this.$localStorage.get("filmy_quotes_user_added_tag_filters");
                // console.log(all_filtered_tags);
                all_filtered_tags.push(tag_id);
                // console.log(all_filtered_tags);
                this.$localStorage.set('filmy_quotes_user_added_tag_filters', all_filtered_tags);
                // console.log(this.$localStorage.get('filmy_quotes_user_added_tag_filters'));
                this.check_filtered_tags();
            },

            remove_tag_from_filtered_tags: function (tag_id) {
                let all_filtered_tags = this.$localStorage.get("filmy_quotes_user_added_tag_filters");
                // console.log(all_filtered_tags);
                let tag_index = all_filtered_tags.indexOf(tag_id);
                // console.log(tag_index);
                if (tag_index > -1) {
                    all_filtered_tags.splice(tag_index, 1)
                }
                // console.log(all_filtered_tags);
                this.$localStorage.set('filmy_quotes_user_added_tag_filters', all_filtered_tags);
                // console.log(this.$localStorage.get('filmy_quotes_user_added_tag_filters'));
                this.check_filtered_tags();
            },

            add_to_reacted_dialogues(dialogue_id, emoji) {
                let all_reacted_dialogues = this.$localStorage.get('filmy_quotes_user_added_dialogues');
                let all_reacted_moods = this.$localStorage.get('filmy_quotes_user_added_moods');
                // console.log(all_reacted_dialogues);
                all_reacted_dialogues.push(dialogue_id);
                all_reacted_moods.dialogue_id = emoji;
                // console.log(all_reacted_dialogues);
                this.$localStorage.set('filmy_quotes_user_added_dialogues', all_reacted_dialogues);
                this.$localStorage.set('filmy_quotes_user_added_moods', all_reacted_moods);
                // console.log(this.$localStorage.get('filmy_quotes_user_added_dialogues'));
            },

            remove_from_reacted_dialogues(dialogue_id) {
                let all_reacted_dialogues = this.$localStorage.get('filmy_quotes_user_added_dialogues');
                let all_reacted_moods = this.$localStorage.get('filmy_quotes_user_added_moods');
                // console.log(all_reacted_dialogues);
                let emotion_found = false;
                let emotion_at = -1;
                for (let i = 0; i < all_reacted_dialogues.length; i++) {
                    if (all_reacted_dialogues[i] === dialogue_id) {
                        emotion_found = true;
                        emotion_at = i;
                        break
                    }
                }
                if (emotion_found) {
                    all_reacted_dialogues.splice(emotion_at, 1);
                }
                delete all_reacted_moods.dialogue_id;
                // console.log(all_reacted_dialogues);
                this.$localStorage.set('filmy_quotes_user_added_dialogues', all_reacted_dialogues);
                this.$localStorage.set('filmy_quotes_user_added_moods', all_reacted_moods);
                // console.log(this.$localStorage.get('filmy_quotes_user_added_dialogues'));
            },

            set_fontsize(dialogue_text) {

                var numWords = dialogue_text.split(" ").length;
//                console.log(numWords);
                this.font_isSmall = false;
                this.font_isMedium = false;
                this.font_isLarge = false;

                if (numWords >= 1 && numWords < 10) {
                    // $quote.css("font-size", "36px");
                    this.font_isLarge = true;
                }
                else if (numWords >= 10 && numWords < 40) {
                    // $quote.css("font-size", "33px");
                    this.font_isMedium = true;
                }
                else if (numWords >= 40) {
                    // $quote.css("font-size", "26px");
                    this.font_isSmall = true;
                }
            },

            enable_emoji_popup() {
                setTimeout(function () {
                    $('.add_reaction_button')
                        .popup({
                            inline: true,
                            on: 'click',
                            variation: 'basic',
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

            get_quote() {
                this.loading_quote = true;
                let url = this.base_url + '/api/get-dialogues/?include_tags=';
                let filtered_tags = this.$localStorage.get("filmy_quotes_user_added_tag_filters");
                if (filtered_tags.length) {
                    url += filtered_tags.join();
                } else {
                    url += '0';
                }
                url += '&year_min=' + this.sliderValue.value[0] + '&year_max=' + this.sliderValue.value[1];
                this.$http.get(url).then(response => {
                    this.loading_quote = false;

                    this.filmyQuotes = response.data;

                    if (this.filmyQuotes.dialogue.star_image_url) {
                        this.actor_image_url_full = 'https://image.tmdb.org/t/p/w500_and_h500_face/' + this.filmyQuotes.dialogue.star_image_url;
                        this.actor_image_url_thumb = 'https://image.tmdb.org/t/p/w50_and_h50_face/' + this.filmyQuotes.dialogue.star_image_url;
                    } else {
                        this.actor_image_url_full = placeHolderUrl;
                        this.actor_image_url_thumb = placeHolderUrl
                    }

                    this.reaction_not_added = !this.check_reacted_dialogue(this.filmyQuotes.dialogue.id);

                    this.set_fontsize(this.filmyQuotes.dialogue.dialogue);
                    this.enable_emoji_popup();

                }, response => {
                    this.loading_quote = false;
                });

            },

            add_reaction(id, mood) {
                this.adding_reaction = true;
                let data = {
                    'dialogue': id,
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
                    this.reaction_not_added = false;
                    this.reaction_added = mood;
                    this.add_to_reacted_dialogues(id, mood);
                    this.adding_reaction = false;
                    this.$forceUpdate();
                }, response => {
                    this.adding_reaction = false;
                });
            },

            remove_reaction(id, mood) {
                if (this.check_reacted_mood(id, mood)) {
                    let data = {
                        'dialogue': id,
                        'mood': mood
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
                        this.reaction_not_added = true;
                        this.reaction_added = '';
                        this.remove_from_reacted_dialogues(id);
                        this.enable_emoji_popup();
                        this.$forceUpdate();
                    }, response => {
                    });
                }
            },

            init_share() {
                let vm = this;
                let node = document.getElementById('quote_wrapper');
                domtoimage.toJpeg(node, {quality: 0.95})
                    .then(function (dataUrl) {
                        var link = document.createElement('a');
                        link.download = 'filmy-quote-' + vm.filmyQuotes.dialogue.id + '.jpeg';
                        link.href = dataUrl;
                        console.log(link.download)
//                        console.log(link.href)
//                        link.click();
                    });
            }
        },


        updated() {
            setTimeout(function () {
//        $('#refresh')
//          .popup({
//            position: 'top center',
//            delay: {
//              show: 30,
//              hide: 30
//            }
//          })
//        ;
            }, 15);
        },

        mounted() {
            this.check_first_time_user();
            this.fetch_tags();
            this.fetch_year_range();
        }
    }

</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

    body{
        background-color: #3F4658;
    }
    a{
        cursor: pointer;
    }

    .emoji-mart-emoji.selected{
            &:before{
                z-index: 0;
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #f4f4f4;
                border-radius: 100%;
                opacity: 0;
            }
    }

    h1.quote-text{
        font-family: freight-sans-pro, sans-serif;
        padding-top: 0;
        margin-top: 0;
        font-style: italic;
    }

    .sub.header{
        margin-top: 7px !important;
        margin-bottom: 10px !important;
    }

    @media only screen and (max-width: 64.063em) {
        section.quote{
            margin-top: 90px;
        }
        section.quote .content{
            padding-left: 0;
        }
        section.quote .poster{
            position: relative;
        }
    }
    @import './assets/css/semantic.min.css';
    @import './assets/css/animate.css';
    @import '../../node_modules/inter-ui/inter-ui.css';
    @import '../../node_modules/@ibm/type/css/ibm-type.min.css';
    @import './assets/css/main.css';
    @import '../../node_modules/vue-range-slider/dist/vue-range-slider.css';
    @import url("https://use.typekit.net/fde6xbm.css");


</style>
