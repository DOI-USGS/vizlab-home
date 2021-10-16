<template>
  <div>
    <h2
      id="header-about"
      class="site-preview-heading"
    >
      About
    </h2>
    <div id="about-container">
      <div id="about-grp">
        <h3 id="about-title">
          What is the USGS Vizlab?
        </h3>
        <p>We are a data visualization team that strives to make water science accessible and fun. We are part of the Integrated Information Dissemination Division of the USGS Water Mission Area.</p>
      </div>
      <div id="contact-grp">
        <h3 id="about-title-contact">
          Contact us
        </h3>
        <div id="about-text-contact">
          <p>gs-w_vizlab@usgs.gov</p>
        </div>
      </div>
      <div id="follow-grp">
        <h3 id="about-title-follow">
          Follow us
        </h3>
        <div id="about-text-follow">
          <p>USGS Data Science</p>
          <p>USGS Water</p>
          <p>USGS streamgages</p>
        </div>
      </div>
    </div>
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
  width: 95%;
  border-style: none none solid none;
  border-bottom: 10px solid $darkGreen;
    padding: 1rem;
  background-color: transparent;
  h3 {
    border-style: none none solid none;
  }
}
#about-container {
    display:grid;
    margin-left: 1rem;
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
    "about follow"
    "contact follow"
}
#about-grp {
    grid-area: about;
}
#contact-grp {
    grid-area: contact;
}
#follow-grp {
    grid-area: follow;
}
</style>