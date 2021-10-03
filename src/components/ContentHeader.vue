<template>
  <div>
    <div class="usa-overlay"></div>
<header class="usa-header usa-header--basic">
  <div class="usa-nav-container">
    <div class="usa-navbar">
      <div class="usa-logo" id="basic-logo">
        <em class="usa-logo__text">
          <vizHeader />
        </em>
      </div>
      <button class="usa-menu-btn">What's new</button>
    </div>
    <nav aria-label="Primary navigation" class="usa-nav">
      <button class="usa-nav__close">
        <img src="/assets/img/usa-icons/close.svg" role="img" alt="Close" />
      </button>
      <ul class="usa-nav__primary usa-accordion">
        <li class="usa-nav__primary-item">
          <button
            class="usa-accordion__button usa-nav__link usa-current"
            aria-expanded="false"
            aria-controls="basic-nav-section-one"
          >
            <span>Visualizations</span>
          </button>

          <ul id="basic-nav-section-one" class="usa-nav__submenu">
            <li class="usa-nav__submenu-item">
              <a href="#">Interactives</a>
            </li>
            <li class="usa-nav__submenu-item">
              <a href="#">Chart Gallery</a>
            </li>
              <li class="usa-nav__submenu-item">
              <a href="#">Hurricanes</a>
            </li>
          </ul>
        </li>
        <li class="usa-nav__primary-item">
          <button
            class="usa-accordion__button usa-nav__link"
            aria-expanded="false"
            aria-controls="basic-nav-section-two"
          >
            <span>About</span>
          </button>
        </li>
         <li class="usa-nav__primary-item">
          <button
            class="usa-accordion__button usa-nav__link"
            aria-expanded="false"
            aria-controls="basic-nav-section-two"
          >
            <span>Follow us</span>
          </button>
        </li>
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

<style scoped>
  @import '~uswds/dist/css/uswds.css'; 
</style>