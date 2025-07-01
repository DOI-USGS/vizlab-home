<template>
  <div
    id="sticky-header"
    class="stuck"
  >
    <header class="usa-header usa-header--basic">
      <div class="usa-nav-container">
        <h2 id="title-water">
          water data visualizations
        </h2>
        <nav
          aria-label="Primary navigation"
          class="usa-nav"
        >
          <ul class="usa-nav__primary usa-accordion">
            <li class="usa-nav__primary-item">
              <button
                class="usa-nav__button usa-nav__link first-button"
                aria-expanded="false"
                onClick="document.getElementById('viz-new').scrollIntoView();"
              >
                <span>Recent</span>
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

            <li class="usa-nav__primary-item">
              <a
                id="twitter-bird"
                href="https://twitter.com/usgs_datasci"
                target="_blank"
                aria-label="twitter link"
              >
                <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'square-x-twitter' }"><span class="only">Twitter</span></font-awesome-icon>
              </a>
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

<style scoped lang="scss">
$nearBlack: #212222;
$coolBlue: rgb(66, 145, 235);
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
 background-color: $nearBlack;
}
.usa-header.usa-header--basic {
  width: 100vw;
  background-color: $nearBlack;
  color: white;
  border-style: none none solid none;
  border-bottom: 5px solid $nearBlack;
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
    span {
       color: white;
       stroke: white;
       fill: white;
    }

}
 $theme-header-min-width: 300px;
 #title-water {
   width: 100vw;
   padding-bottom: 0.75rem;
   scroll-padding-top: 0.75rem;
   margin: 0;
   font-weight: 300;
   font-size: 3em;
   line-height: 1;
   color: white;
 }
 .first-button {
   min-width: 100px;
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
    width: 95vw;
    margin-top: 0;
    margin-left: 0;
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
    //color: white;
    font-size: 1.5em
  }
  .first-button {
    padding-left: 0vw;
  }
}
button {
  // text on menu
  span {
  color: white;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 600;
  font-size: 20px;
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
.usa-nav__primary-item a:focus {
    outline: none;
    outline-offset: 0;
}

  #twitter-bird {
    transform: scale(2, 2);
    color: white;
  }
</style>