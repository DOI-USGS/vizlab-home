<template>
  <div id="about-all">
    <h2
      id="header-about"
      class="site-preview-heading"
    >
      <span
        class="lowlight"
        style="line-height: 10%"
      >
        About
      </span>
    </h2>
    <div id="about-container">
      <div id="about-grp">
        <h3 id="about-title">
          What is the USGS Vizlab?
        </h3>
        <p>
          The USGS Vizlab is a data visualization team that strives to make water science fun and accessible. We make charts, maps, and interactive websites to communicate USGS research and data. We are part of the 
          <a 
            href="https://waterdata.usgs.gov/blog/water-data-science-2021/" 
            target="_blank"
          >Data Science Branch
          </a>of the 
          <a
            href="https://www.usgs.gov/mission-areas/water-resources"
            target="_blank"
          >USGS Water Mission Area.
          </a>
          <br>
          <br>
          We wrote a blog post about our work inn the <a
            href="https://waterdata.usgs.gov/blog/what-is-vizlab/"
            target="_blank"
          > Water Data for the Nation blog</a>.
        </p>
      </div>
      <div id="contact-grp">
        <h3 id="about-title-contact">
          Email the team
        </h3>
        <div id="about-text-contact">
          <p>
            <a
              href="mailto:gs-w_vizlab@usgs.gov"
              target="_blank"
            >gs-w_vizlab@usgs.gov</a>
          </p>
        </div>
      </div>
      <div id="follow-grp">
        <h3 id="about-title-follow">
          Follow us
        </h3>
        <div id="about-text-follow">
          <p>
            <a
              id="twitter-bird"
              href="https://twitter.com/usgs_datasci"
              target="_blank"
              aria-label="twitter link"
            >
              <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'twitter-square' }"><span class="only">USGS Data Science</span></font-awesome-icon>
              USGS Data Science</a>
          </p>
          <p>
            <a
              id="twitter-bird"
              href="https://twitter.com/usgs_water"
              target="_blank"
              aria-label="twitter link"
            >
              <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'twitter-square' }"><span class="only">USGS Water</span></font-awesome-icon>
              USGS Water</a>
          </p>

          <p>
            <a
              id="insta"
              href="https://instagram.com/usgs_streamgages"
              target="_blank"
              aria-label="instagram link"
            >
              <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'instagram' }"><span class="only">USGS streamgages</span></font-awesome-icon>
              USGS streamgages</a>
          </p>
        </div>
      </div>
      <!-- <div id="email-grp">
        <h3 id="about-title-email">
          Get email notifications
        </h3>
        <div id="about-text-email">
          <div id="mc_embed_signup">
            <form action="https://usgs.us5.list-manage.com/subscribe/post?u=54239c191d60c957fecb1eda9&amp;id=b1922dda68" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                <div id="mc_embed_signup_scroll">
                <label for="mce-EMAIL">Subscribe</label>
                <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required>
  
                <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_54239c191d60c957fecb1eda9_b1922dda68" tabindex="-1" value=""></div>
                    <div class="clear foot">
                      <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button">
                    </div>
                 </div>
            </form>
            </div>
          <p>Provide your email address to receive notifications when new data visualizations are published. Email frequency is low.</p>
        </div>
      </div> -->
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
$coolBlue: rgb(66, 145, 235);
.site-preview-heading#header-about {
  color: $nearBlack;
  width: 95%;
  //border-style: none none solid none;
  //border-top: 3px solid lightgrey;
    padding: 1rem;
  background-color: transparent;
  h3 {
    //border-style: none none solid none;

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
  padding-right: 5vw;
}
#about-grp {
    grid-area: about;
    padding-right: 5vw;
     a {
  font-size: 1.3rem;
}
}
#contact-grp {
    grid-area: contact;
}
#follow-grp {
    grid-area: follow;
    a {
  font-size: 1.2rem;
}
}

  #twitter-bird, #insta {
    transform: scale(2, 2);
    color: $coolBlue;
  }
#about-all {
  margin-bottom: 50px;
}
p {
  font-size: 1.2rem;
}
</style>
