<template>
  <header
    id="usgs-banner"
    role="banner"
  >
    <div class="logo-container">
      <a
        class="logo-header"
        href="https://www.usgs.gov/mission-areas/water-resources/science/water-data-visualizations"
        aria-label="Water data visualizations homepage on USGS.gov"
        target="_blank"
      >
        <img
          class="img"
          src="@/assets/usgsHeaderAndFooter/images/usgsLogo_white-01.png"
          alt="USGS logo. Science for a changing world."
        >
      </a>
    </div>
  </header>
</template>

<script>
    export default {
        name: 'HeaderUSGS'
    }
</script>

<style scoped lang="scss">
  #usgs-banner {
    display: block;
    background: #151515;
  }
  .logo-container {
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
    border-bottom: 0px solid white;
  }
  .logo-container a {
    text-decoration: none;
    background: transparent;
  }
  .logo-container:after {
    clear: both;
  }
  .logo-header img {
    margin-top: 10px;
    margin-bottom: 8px;
    border: 0;
    max-width: 100%;
    height: 65px;
  }
</style>
