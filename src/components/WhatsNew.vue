<template>
<div id="viz-latest">
    <div id="viz-title"></div>
    <div id="viz-text"></div>
    <div id="viz-img"></div>
    </div>
</template>

<script>
    export default {
        name: 'WhatsNew',
        props: {
            title: {
                type: String,
                default: process.env.VUE_APP_TITLE
            }
        },
        data() {
          return {
            publicPath: process.env.BASE_URL, 
          }
        }
        
    }
</script>

<style lang="scss">
 // 2 column layout
#viz-latest {
    display:grid;
    width: 95%;
    height: 40vh;
    grid-template-areas:
    "ft-title ft-title ft-text"
    "ft-img ft-img ft-text"
}
#viz-title {
    grid-area: ft-title;
    background-color: pink;
}
#viz-text {
    grid-area: ft-text;
    background-color: yellow;
}
#viz-img {
    grid-area: ft-img;
    background-color: blue;
}

</style>