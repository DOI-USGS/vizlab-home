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
            :src="getImgUrl(viz.img)"
            :alt="viz.title" 
          >
        </div>
      </div>
      <div class="usa-card__body">
        <p>
          {{ viz.description }}
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
              :href="viz.code" 
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
        },
        methods: {
          getImgUrl(pic) {
            // TODO: alternative if image is not given or broken
            return require('../assets/images/cards/'+pic)
          }
        }
    }
</script>

<style>
  /* import USWDS styling */
  @import '~uswds/dist/css/uswds.css'; 

</style>