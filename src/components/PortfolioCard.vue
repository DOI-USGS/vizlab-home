<template>
  <li 
    class="card"
  >
    <div
      class="usa-card__container main"
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
        data() {
          return {
            mainLink: null
          }
        },
        mounted(){
          const card = document.querySelector(".card")
          this.mainLink = document.querySelector(".main-link")

          //card.addEventListener("click", this.handleClick)

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
$nearBlack: #181a1a;
$darkGreen: #1F7564;
$lightGrey: rgb(145, 146, 145);
$coolBlue: #005ea2;
  /* style card appearance */ 
.usa-card__container.main:hover {
  transform: translate3D(0,-0.5px,0) scale(1.02); 
  box-shadow: 4px 8px 4px rgba(39,44,49,.07), 1px 4px 4px rgba(39,44,49,.04);
  transition: all .3s ease; 
}
.usa-button-group a:focus {
    outline: None;
}
a.usa-button {
  //background-color: $nearBlack;
}
a.usa-button.usa-button--outline {
  background-color: white;
  //color: $nearBlack;
  //box-shadow: inset 0 0 0 2px $nearBlack;
}
h2 {
  color: $nearBlack;
}
</style>