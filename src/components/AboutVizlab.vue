<template>
  <div id="about-all">
    <h2 id="header-about" class="site-preview-heading">
      <span class="lowlight" style="line-height: 10%">
        About
      </span>
    </h2>
    <div id="about-container">
      <div id="about-grp">
        <h3 id="about-title">What is the USGS Vizlab?</h3>
        <p>
          The USGS Vizlab is a data visualization team that strives to make water science fun and accessible. We make charts, maps, and interactive websites to communicate USGS research and data. We are part of the 
          <a href="https://waterdata.usgs.gov/blog/water-data-science-2021/" target="_blank">Data Science Branch</a> of the 
          <a href="https://www.usgs.gov/mission-areas/water-resources" target="_blank">USGS Water Mission Area</a>.
          <br><br>
          We wrote a blog post about our work on the <a href="https://waterdata.usgs.gov/blog/what-is-vizlab/" target="_blank">Water Data for the Nation blog</a>.
        </p>
      </div>
      <div id="contact-grp">
        <h3 id="about-title-contact">Email the team</h3>
        <div id="about-text-contact">
          <p>
            <a href="mailto:gs-w_vizlab@usgs.gov" target="_blank">gs-w_vizlab@usgs.gov</a>
          </p>
        </div>
      </div>
      <div id="follow-grp">
        <h3 id="about-title-follow">Follow us</h3>
        <div id="about-text-follow">
          <p>
            <a id="twitter-bird" href="https://twitter.com/usgs_water" target="_blank" aria-label="twitter link">
              <font-awesome-icon :icon="['fab', 'square-x-twitter']">
                <span class="only">USGS Water</span>
              </font-awesome-icon>
              USGS Water
            </a>
          </p>
          <p>
            <a id="insta" href="https://instagram.com/usgs_water" target="_blank" aria-label="instagram link">
              <font-awesome-icon :icon="['fab', 'instagram']">
                <span class="only">USGS streamgages</span>
              </font-awesome-icon>
              USGS Waters
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const publicPath = import.meta.env.BASE_URL
</script>

<style lang="scss">
$nearBlack: #181a1a;
$darkGreen: #1F7564;
$coolBlue: rgb(66, 145, 235);

.site-preview-heading#header-about {
  color: $nearBlack;
  width: 95%;
  padding: 1rem;
  background-color: transparent;
}

.usa-nav__primary button[aria-expanded=false] span::after {
  background: url([object Object]) no-repeat center/contain;
  display: inline-block;
  height: 0px;
  width: 0px;
  vertical-align: middle;
  margin-left: auto;
}

#about-container {
  display: grid;
  margin-left: 1rem;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas:
    "about about follow"
    "email email contact";
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

#twitter-bird,
#insta {
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
