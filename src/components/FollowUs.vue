
<template>
  <div />
</template>

<script>
    export default {
        name: 'FollowUs',
        props: {
            title: {
                type: String,
                default: process.env.VUE_APP_TITLE
            }
        },
        data() {
          return {
            publicPath: process.env.BASE_URL, // allows app to find the files when on different deployment roots
          }
        }
        
    }
</script>

<style lang="scss">
 

</style>