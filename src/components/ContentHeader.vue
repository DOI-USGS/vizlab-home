<template>
  <div id="sticky-header" class="stuck">
    <header class="usa-header usa-header--basic">
      <div class="usa-nav-container">
        <nav
          aria-label="Primary navigation"
          class="usa-nav"
        >
          <ul class="usa-nav__primary usa-accordion">
            <li class="usa-nav__primary-item">
              <button
                class="usa-nav__button usa-nav__link"
                aria-expanded="false"
                onClick="document.getElementById('viz-new').scrollIntoView();"
              >
                <span>What's new</span>
              </button>
            </li>
            <li class="usa-nav__primary-item">
              <button
                class="usa-nav__button usa-nav__link"
                aria-expanded="false"
                onClick="document.getElementById('viz-cards').scrollIntoView();"
              >
                <span>Visualizations</span>
              </button>

              <!--       <ul id="basic-nav-section-one" class="usa-nav__submenu">
            <li class="usa-nav__submenu-item">
              <a href="#">Interactives</a>
            </li>
            <li class="usa-nav__submenu-item">
              <a href="#">Chart Gallery</a>
            </li>
              <li class="usa-nav__submenu-item">
              <a href="#">Hurricanes</a>
            </li>
          </ul> -->
            </li>
            <li class="usa-nav__primary-item">
              <button
                class="usa-nav__button usa-nav__link"
                aria-expanded="false"
                onClick="document.getElementById('viz-about').scrollIntoView();"
              >
                <span>About</span>
              </button>
            </li>
            <!-- <li class="usa-nav__primary-item">
              <button
                class="usa-nav__button usa-nav__link"
                aria-expanded="false"
                aria-controls="basic-nav-follow"
                onClick="document.getElementById('viz-follow').scrollIntoView();"
              >
                <span>Follow us</span>
              </button>
            </li> -->
          </ul>
        </nav>
      </div>
    </header>
  </div>
</template>

<script>
    export default {
        name: "ContentHeader",
        
        mounted() {
             // fix USWDS glitch that causes accordion menus to be open on page load
            const targetAccordionDivs = document.querySelectorAll('.usa-nav__primary .usa-accordion');
            targetAccordionDivs.forEach((li) => {
                div.setAttribute('hidden', '""');
            });
        },
    }
</script>

<style scoped lang="scss">
$color_menu: #1F7564;
div.usa-nav-container {
  //width: 100%;
}
.usa-header.usa-header--basic {
  width: 100vw;
  background-color: $color_menu;
}
.usa_nav__button .usa-nav__link {
  color: white;
  stroke: white;
      outline: none;
    outline-offset: 0;

}
  @media (min-width:1024px) {
  }
button {
  // text on menu
  span {
  color: white;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 600;
  font-size: 24px;
  }

}
/* .usa-nav__primary button:focus {
    outline: none;
    outline-offset: 0;
} */
 $theme-header-min-width: 300px;
</style>