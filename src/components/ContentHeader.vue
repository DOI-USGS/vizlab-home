<template>
  <div>
    <header class="usa-header usa-header--extended">
      <div class="usa-navbar">
        <div
          id="extended-logo"
          class="usa-logo"
        >
          <em class="usa-logo__text">
            <a
              href=""
              title="Vizlab"
            >
              Vizlab
            </a>
          </em>
        </div>
        <button class="usa-menu-btn">
          Menu
        </button>
      </div>
      <nav
        aria-label="Primary navigation"
        class="usa-nav"
      >
        <div class="usa-nav__inner">
          <button class="usa-nav__close">
            <img
              src="/assets/img/usa-icons/close.svg"
              role="img"
              alt="Close"
            >
          </button>
          <ul class="usa-nav__primary usa-accordion">
            <li class="usa-nav__primary-item">
              <button
                class="usa-accordion__button usa-nav__link usa-current"
                aria-expanded="false"
                aria-controls="extended-nav-section-one"
              >
                <span>Visualizations</span>
              </button>

              <ul
                id="extended-nav-section-one"
                class="usa-nav__submenu"
              >
                <li class="usa-nav__submenu-item">
                  <a href="#">Navigation link </a>
                </li>
                <li class="usa-nav__submenu-item">
                  <a href="#">Navigation link</a>
                </li>
                <li class="usa-nav__submenu-item">
                  <a href="#">Navigation link</a>
                </li>
              </ul>
            </li>
            <li class="usa-nav__primary-item">
              <button
                class="usa-accordion__button usa-nav__link"
                aria-expanded="false"
                aria-controls="extended-nav-section-two"
              >
                <span>About</span>
              </button>

              <ul
                id="extended-nav-section-two"
                class="usa-nav__submenu"
              >
                <li class="usa-nav__submenu-item">
                  <a href="#">Navigation link</a>
                </li>
                <li class="usa-nav__submenu-item">
                  <a href="#">Navigation link</a>
                </li>
                <li class="usa-nav__submenu-item">
                  <a href="#">Navigation link</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
    export default {
        name: "ContentHeader",
        mounted() {
            // This is a fix for the weird USWDS glitch that causes the Methods section accordion menus to be open on page load
            const targetAccordionDivs = document.querySelectorAll('usa-nav__submenu-item');
            targetAccordionDivs.forEach((div) => {
                div.setAttribute('hidden', '""');
            });
        },
    }
</script>

<style scoped>
  @import '~uswds/dist/css/uswds.css'; 
</style>