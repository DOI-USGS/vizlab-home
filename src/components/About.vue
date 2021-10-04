<template>
  <div id="about-container">
    <h2 class="site-preview-heading">
      About
    </h2>
    </div>
</template>

<script>
    export default {
        name: 'About',
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
 $nearBlack: #181a1a;
$darkGreen: #1F7564;
.usa-accordion__button {
  color: $darkGreen;
  border-style: none none solid none;
  border-top: 5px solid $darkGreen;
  background-color: transparent;
  h3 {
    border-style: none none solid none;
  }
}
.site-preview-heading {
  padding: 1rem;

}
h2 {
    color: $nearBlack;
    margin-bottom: 0px;
  }
</style>