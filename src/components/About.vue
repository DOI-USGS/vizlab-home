<template>
  <div id="about-container">
    <h2 class="site-preview-heading" id="header-about">
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
.site-preview-heading#header-about {
  color: $darkGreen;
  width: 90%;
  border-style: none none solid none;
  border-bottom: 10px solid $darkGreen;
    padding: 1rem;
  background-color: transparent;
  h3 {
    border-style: none none solid none;
  }
}

h2 {
    color: $darkGreen;
    margin-bottom: 0px;
  }
</style>