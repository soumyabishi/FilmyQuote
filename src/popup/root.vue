<template>
    <div class="popup">

            <img alt="FilmyQuote" class="logo" src="../tab/assets/img/logo_black.svg">

        <div class="active">
            <img alt="thank you" class="" src="../tab/assets/img/text.svg" width="105">
            <p>Thanks for using FilmyQuote!</p>
            <!--FilmyQuote is currently active! Open a new tab and get and new dialogue.-->
            <img alt="mogamboo" class="mogamboo" src="../tab/assets/img/mogamboo.png">
        </div>

        <div class="active_message">
            <p>FilmyQuote is <span>currently active!</span>
                Open a new tab and get a new dialogue.</p>
        </div>
    </div>
</template>
<script>
  export default {
    data: () => ({
    }),
    computed: { },
    created () { },
    mounted () { },
    methods: {

    }
  }
</script>
<style lang="scss">
  body{
      margin: 0;
      padding: 0;
      width: 260px;
      height: 200px;
      padding: 20px;
  }

    .popup{
    }

    .logo{
        width: 139px;
    }

    .active{
        background-color: #192f42;
        margin: 20px -20px;
        padding: 20px;
        color: #fff;
        position: relative;

        img.mogamboo{
            position: absolute;
            right: 0;
            bottom: 0;
            width: 143px;
        }
        p{
            opacity: 0.5;
            font-size: 11px;
            padding-top: 11px;
            -webkit-margin-before: 0;
            -webkit-margin-after: 0;
            padding-bottom: 8px;
        }
    }

    .active_message p{
        -webkit-margin-before: 0;
        -webkit-margin-after: 0;
        position: relative;
        padding-left: 31px;
        font-size: 11px;
        margin-bottom: 20px;
        line-height: 1.5;
        span{
            font-weight: 600;
            color: #00b154;
        }
        &:before{
            content: "";
            width: 23px;
            height: 23px;
            background: url(../tab/assets/img/tick.svg) no-repeat;
            left: 0;
            top:2px;
            /* bottom: 5px; */
            position: absolute;
            display: inline-block;
            transition: all .1s ease;
            background-size: 23px;
        }
    }
</style>