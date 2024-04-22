<template>
  <div class="usa-overlay"></div>
  <header class="usa-header usa-header--basic">
    <div class="usa-nav-container">
      <div class="usa-navbar">
        <div class="usa-logo">
          <em class="usa-logo__text"
            ><a href="/" title="<Project title>"> {{ long_title }}</a></em
          >
        </div>
      </div>
    </div>
  </header>
  <div class="usa-section">
    <div class="grid-container">
      <div class="grid-row grid-gap">
        <main class="" id="main-content">
          <div class="usa-prose">
            <h1>Page not found</h1>
            <p class="usa-intro">
              We’re sorry, we can’t find the page you're looking for. The site
              administrator may have removed it, changed its location, or made
              it otherwise unavailable.
            </p>
            <p>
              If you typed the URL directly, check your spelling and
              capitalization. Our URLs look like this:
              <strong>&lt;agency.gov/example-one&gt;</strong>.
            </p>
            <p>
              Visit our homepage for helpful tools and resources, or contact us
              and we’ll point you in the right direction.
            </p>
            <div class="margin-y-5">
              <ul class="usa-button-group">
                <li class="usa-button-group__item">
                  <a href="/" class="usa-button"
                    >Visit {{ long_title }} main page</a
                  >
                </li>
                <li class="usa-button-group__item">
                  <a href="mailto:gs-w_vizlab@usgs.gov" target="_blank" class="usa-button usa-button--outline" >Contact us</a>
                </li>
              </ul>
            </div>
            <p class="text-base"><strong>Error code:</strong> 404</p>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
  const long_title = import.meta.env.VITE_APP_LONG_TITLE;
</script>

<style scoped lang="scss">
  @import '../../node_modules/@uswds/uswds/dist/css/uswds.css';
  .main-content {
    height: max(700px, calc(100vh - 85.7px - 40px - 95px)); /* page height - USGS header - prefooter code links - USGS footer */
    margin-left: auto;
    margin-right: auto;
    max-width: 1200px;
    padding: 2em;
  }
</style>
