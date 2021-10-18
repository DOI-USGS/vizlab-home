<template>
  <div id="sticky-header" class="stuck">
    <header class="usa-header usa-header--basic">
      <div class="usa-nav-container">
      <h2 id="title-water"> water data visualizations </h2>
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
$darkGreen: #1F7564;
$nearBlack: #181a1a;
$coolBlue: #005ea2;
div.usa-nav-container {
  //width: 100%;
  padding-left: 0;
  padding-right: 0;
  margin-left: 5vw;
  margin-right: 5vw;
  max-width: 90vw;
  width: 95vw;
}
.usa-nav__primary, .usa-accordion {
 align-items: right;
 float: right;
}
.usa-header.usa-header--basic {
  width: 100vw;
  background-color: white;
  color: $darkGreen;
  border-style: none none solid none;
  border-bottom: 5px solid $darkGreen;
}

.usa-nav {
  align-items: right;
  float: left;
}
nav.usa-nav {
  display:inline;
}
.usa_nav__button .usa-nav__link {
  color: white;
  stroke: white;
      outline: none;
    outline-offset: 0;

}
 $theme-header-min-width: 300px;
 #title-water {
   width: 100vw;
   padding-bottom: 0.75rem;
   scroll-padding-top: 0.75rem;
   margin: 0;
   font-weight: 300;
   font-size: 3.1em;
   line-height: 01;
 }
  @media (max-width:1200px) {
     #title-water {
    font-size: 2.5em;
     }

  }
  // fixing auto sidembar naviation for mobile
  // make two rows instead
@media (max-width: 63.99em){
  .usa-nav {
    position: relative;
    left:0; 
    top:0;
    height: auto;
    width: auto;
    margin-left: 0;
    padding: 0;
  }
  .usa-nav__primary.usa-accordion{
    width: 100vw;
    margin-top: 0;
  }
  .usa-nav__primary > li {
   // max-width: 90vw;
    display: inline-block;
  }
  .usa-nav__primary-item {
    border: none;
  }
  #title-water {
    padding-bottom: 0;
  }
}
button {
  // text on menu
  span {
  color: $darkGreen;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 600;
  font-size: 24px;
  }

}
.usa-nav__primary button:focus {
    outline: None;
    outline-offset: 0;
}
.usa-nav__primary button:hover {
    outline: None;
    outline-offset: 0;
    border: 0;
    background-color: $coolBlue;
    span {
     color: white;
    }
}

</style>