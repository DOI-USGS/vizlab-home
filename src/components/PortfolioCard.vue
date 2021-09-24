<template>
  <li 
    class="card"
  >
    <div class="usa-card__container">
      <header class="usa-card__header">
        <h2 class="usa-card__heading">
          {{ viz.title }}
        </h2>
      </header>
      <div class="usa-card__media">
        <div class="usa-card__img">
          <img
            src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
            :alt="viz.title" 
          >
        </div>
      </div>
      <div class="usa-card__body">
        <p>
          {{ viz.description }}
        </p>
        <p>
          Published {{ viz.released }}
        </p>
      </div>
      <div class="usa-card__footer">
        <ul class="usa-button-group">
          <li class="usa-button-group__item">
            <a 
              :href="viz.url"
              target="_blank"
              class="usa-button"
            >View</a>
          </li> 
          <li class="usa-button-group__item">
            <a 
              :href="viz.url" 
              target="_blank"
              class="usa-button usa-button--outline"
            >Code</a>
          </li>              
        </ul>
      </div>
    </div>
  </li>
</template>

<script>
  import * as d3Base from 'd3';
  import uswds from 'uswds';
   
  // make sure that the prop for the viz cards is passed in, not sure if this needs to be imported or piped
   
   export default {
        name: 'PortfolioCard',
        props: {
            title: {
                type: String,
                default: process.env.VUE_APP_TITLE
            },
            viz: { 
              type: Object
            } 
        }
    }
</script>

<style>
  /* this line is critical for importing USWDS styling */
  @import '~uswds/dist/css/uswds.css'; 

</style>