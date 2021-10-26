<template>
  <div id="about-all">
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
        <p>The USGS Vizlab is a data visualization team that strives to make water science fun and accessible. <br> <br>We are part of the <a href="https://www.usgs.gov/mission-areas/water-resources" target="_blank" >USGS Water Mission Area.</a> </p>
      </div>
      <div id="contact-grp">
        <h3 id="about-title-contact">
          Email us
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
          <p><a
                href="https://twitter.com/usgs_datasci"
                target="_blank"
                aria-label="twitter link"
                id="twitter-bird"
              >
                <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'twitter-square' }"><span class="only">USGS Data Science</span></font-awesome-icon>
          USGS Data Science</a></p>
          <p><a
                href="https://twitter.com/usgs_water"
                target="_blank"
                aria-label="twitter link"
                id="twitter-bird"
              >
                <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'twitter-square' }"><span class="only">USGS Water</span></font-awesome-icon>
          USGS Water</a></p>

          <p><a
                href="https://instagram.com/usgs_streamgages"
                target="_blank"
                aria-label="instagram link"
                id="insta"
              >
                <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'instagram' }"><span class="only">USGS streamgages</span></font-awesome-icon>
          USGS streamgages</a></p>
        </div>
      </div>
       <div id="email-grp">
        <h3 id="about-title-email">
          Get email notifications
        </h3>
        <div id="about-text-email">
          <p>Provide your email address to receive notifications when new data visualizations are published.</p>
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
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
    "about about follow"
    "email email contact"
}
#email-grp {
  grid-area: email;
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

  #twitter-bird, #insta {
    transform: scale(2, 2);
    color: $darkGreen;
  }
#about-all {
  margin-bottom: 50px;
}
p {
  font-size: 1.3rem;
}
</style>