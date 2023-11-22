<template>
  <div id="footer">
    <footer class="footer">
      <!-- .footer-wrap -->
      <div class="footer-wrap">
        <!-- .footer-doi -->
        <div class="footer-doi">
          <ul class="menu nav">
            <li class="first leaf menu-links menu-level-1">
              <a href="https://www.doi.gov/privacy" target="_blank">DOI Privacy Policy</a>
            </li>
            <li class="leaf menu-links menu-level-1">
              <a href="https://www.usgs.gov/laws/policies_notices.html" target="_blank">Legal</a>
            </li>
            <li class="leaf menu-links menu-level-1">
              <a href="https://www2.usgs.gov/laws/accessibility.html" target="_blank">Accessibility</a>
            </li>
            <li class="leaf menu-links menu-level-1">
              <a href="https://www.usgs.gov/sitemap.html" target="_blank">Site Map</a>
            </li>
            <li class="last leaf menu-links menu-level-1">
              <a href="https://answers.usgs.gov/" target="_blank">Contact USGS</a>
            </li>
          </ul>
        </div>
        <!-- /.footer-doi -->
        <!-- .footer-utl-links -->
        <div class="footer-doi">
          <ul class="menu nav">
            <li class="first leaf menu-links menu-level-1">
              <a href="https://www.doi.gov/" target="_blank">U.S. Department of the Interior</a>
            </li>
            <li class="leaf menu-links menu-level-1">
              <a href="https://www.doioig.gov/" target="_blank">DOI Inspector General</a>
            </li>
            <li class="leaf menu-links menu-level-1">
              <a href="https://www.whitehouse.gov/" target="_blank">White House</a>
            </li>
            <li class="leaf menu-links menu-level-1">
              <a href="https://www.whitehouse.gov/omb/management/egov/" target="_blank">E-gov</a>
            </li>
            <li class="leaf menu-links menu-level-1">
              <a href="https://www.doi.gov/pmb/eeo/no-fear-act" target="_blank">No Fear Act</a>
            </li>
            <li class="last leaf menu-links menu-level-1">
              <a href="https://www2.usgs.gov/foia" target="_blank">FOIA</a>
            </li>
          </ul>
        </div>
        <!-- /.footer-utl-links -->
        <!-- .footer-social-links -->
        <div class="footer-social-links">
          <ul class="social">
            <li class="follow">
              Follow
            </li>
            <li class="twitter">
              <a
                href="https://twitter.com/usgs_datasci"
                target="_blank"
                aria-label="twitter link"
              >
                <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'twitter-square' }"><span class="only">Twitter</span></font-awesome-icon>
              </a>
            </li>
            <li class="facebook">
              <a
                href="https://facebook.com/USGSWater/"
                target="_blank"
                aria-label="facebook link"
              >
                <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook-square' }"><span class="only">Facebook</span></font-awesome-icon>
              </a>
            </li>
            <li class="github">
              <a
                href="https://github.com/DOI-USGS"
                target="_blank"
                aria-label="github link"
              >
                <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'github' }"><span class="only">GitHub</span></font-awesome-icon>
              </a>
            </li>
            <li class="instagram">
              <a
                href="https://instagram.com/usgs_water"
                target="_blank"
                aria-label="instagram link"
              >
                <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'instagram' }"><span class="only">Instagram</span></font-awesome-icon>
              </a>
            </li>
          </ul>
        </div>footer
        <!-- /.footer-social-links -->
      </div>
      <!-- /.footer-wrap -->
    </footer>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
  footer {
    margin: 0;
    position: relative;
    display: block;
  }

  *, *:before, *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .footer-wrap {
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
  }
  .footer-wrap a {
    text-decoration: none;
    background: transparent;
  }
  .footer-wrap:before, .footer-wrap:after {
    content: " ";
    display: table;
  }
  .footer-wrap:after {
    clear: both;
  }

  .menu.nav {
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
  }

  .nav:before, .nav:after {
    content: none;
  }
  footer.footer {
    background: black;
    padding: 0.25rem 0 0 0;
    position: relative;
    width: 100%;
  }

  footer.footer .footer-doi {
    padding-right: 0;
    padding-left: 0;
  }

  footer.footer .footer-doi ul.menu li a {
    padding: 5px 0;
    color: white;
    float: left;
    font-size: 12px;
  }

  footer.footer .footer-doi ul.menu li:first-of-type {
    padding-left: 0;
  }

  footer.footer .footer-doi ul.menu li {
    float: left;
    padding-right: 2px;
    padding-left: 5px;
  }

  footer.footer .footer-doi ul.menu li:after {
    content: "|";
    color: #ffffff;
    float: left;
    padding-top: 5px;
    padding-left: 7px;
    font-size: 12px;
  }

  footer.footer .footer-doi ul.menu li:last-child:after {
    content: "";
  }

  footer.footer .menu.nav a {
    padding: 4px 0;
    color: white;
    font-size: 12px;
  }

  footer.footer .footer-social-links {
    color: white;
    font-size: 12px;
    padding-right: 0;
  }

  footer.footer .footer-social-links ul {
    float: right;
    margin-top: 0;
  }

  footer.footer .footer-social-links ul li.follow {
    padding-top: 6px;
    padding-right: 5px;
  }

  footer.footer .footer-social-links ul li {
    float: left;
    height: 24px;
    margin: 0 2px;
    list-style: none;
  }

  footer.footer .footer-social-links ul li:last-of-type {
    margin-right: 0px;
  }

  footer.footer .footer-social-links ul li a i {
    color:#fff;
    font-size: 24px;
  }
  #maincontent {
    font-family: 'Source Sans Pro',sans-serif;
    font-size: 14px;
    line-height: 1.42857;
    color: white;
    background-color: white;
    padding-left: 15px;
    padding-right: 15px;
  }

  .svg-inline--fa {
    color: white;
    text-decoration: none;
    height: 24px;
    width: 21px;
  }
  .fa-wrapper {
    position: relative
  }
  .fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .fa-ul {
    padding-left: 0;
    margin-left: 2.14285714em;
    list-style-type: none;
  }
  .fa-ul > li {
    position: relative;
  }
  .fa-li {
    position: absolute;
    left: -2.14285714em;
    width: 2.14285714em;
    top: 0.14285714em;
    text-align: center;
  }
  .fa-search:before {
    content: "\f002";
  }
  .fa-twitter-square:before {
    content: "\f081";
  }
  .fa-facebook-square:before {
    content: "\f082";
  }
  .fa-github:before {
    content: "\f09b";
  }
  .fa-google-plus-square:before {
    content:"\f0d4";
  }
  .fa-flickr:before {
    content: "\f16e";
  }
  .fa-youtube-play:before {
    content: "\f16a";
  }
  .fa-instagram:before {
    content: "\f16d";
  }
  .only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  [role="button"]{cursor:pointer}

</style>
