<template>
  <li 
    class="card"
  >
    <div class="usa-card__container">
      <div class="usa-card__media-exdent">
        <div class="usa-card__img">
          <img
            :src="getImgUrl(viz.img)"
            :alt="viz.title" 
          >
          <!-- link to image and add download option -->
        </div>
      </div>
    </div>
  </li>
</template>

<script>

   export default {
        name: 'PortfolioImage',
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

<style lang="scss" >
  /* import USWDS styling */
  @import '~uswds/dist/css/uswds.css'; 

  /* style card appearance */ 
.usa-card__container {
  overflow: hidden;
  padding: 0px;
}
.usa-card__container:hover {
   transform: translate3D(0,-1px,0) scale(1.02); /* move up slightly and zoom in */
  box-shadow: 2px 2px 2px rgba(39,44,49,.07), 1px 2px 2px rgba(39,44,49,.04);
  transition: all .3s ease; /* zoom in */
  //cursor: pointer;
  padding: 0px;
}
.usa-card__img {
  width: 100%;
  overflow: hidden;
  padding: 0px;
}
.usa-card__media-exdent {
  padding: 0px;
}
.card {
  padding: 0px;
}
.usa-card:not(.usa-card--flag) .usa-card__container > :only-child {
    padding: 0rem;
}
</style>