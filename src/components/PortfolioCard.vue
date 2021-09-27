<template>
  <li 
    class="card"
  >
    <div class="usa-card__container main"
    >
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
<!--       <div class="usa-card__body">
        <p>
          {{ viz.description }}
        </p>
      </div> -->
      <div class="usa-card__footer">
        <ul class="usa-button-group">
          <li class="usa-button-group__item btn-move">
            <a 
              :href="viz.url"
              target="_blank"
              class="usa-button main-link"
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
        data() {
          return {
            mainLink: null
          }
        },
        props: {
            title: {
                type: String,
                default: process.env.VUE_APP_TITLE
            },
            viz: { 
              type: Object
            } 
        },
        mounted(){
          const card = document.querySelector(".card")
          this.mainLink = document.querySelector(".main-link")

          card.addEventListener("click", this.handleClick)

        },
        methods: {
          getImgUrl(pic) {
            // TODO: alternative if image is not given or broken
            return require('../assets/images/cards/'+pic)
          },
          handleClick(event){
            this.mainLink.click();
          }
        }
    }
</script>

<style lang="scss" >
  /* import USWDS styling */
  @import '~uswds/dist/css/uswds.css'; 
  /* style card appearance */ 

.usa-card__container.main:hover {
  transform: translate3D(0,-0.5px,0) scale(1.02); 
  box-shadow: 4px 8px 4px rgba(39,44,49,.07), 1px 4px 4px rgba(39,44,49,.04);
  transition: all .3s ease; 
}
/* .btn-move {
  display:block;
  top:  0;
  left: 0;
} */
</style>