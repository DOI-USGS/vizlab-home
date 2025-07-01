<template>
  <div id="visualization">
    <section id="viz-header">
      <viz-header id="viz-header-svg" />
    </section>
    <section id="viz-menu">
      <NavBar id="sticky-header" />
    </section>
    <div id="sticky-body">
     <!--  <section id="viz-new">
        <WhatsNew />
      </section>
      <section id="viz-cards">
        <PortfolioAccordions />
      </section> -->
      <section id="viz-about">
        <About />
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUpdated } from 'vue'
import vizHeader from '@/assets/usgsHeaderAndFooter/viz-header.svg'
import { defineAsyncComponent } from 'vue'

const NavBar = defineAsyncComponent(() => import('./../components/ContentHeader.vue'))
const About = defineAsyncComponent(() => import('./../components/AboutVizlab.vue'))
const WhatsNew = defineAsyncComponent(() => import('./../components/WhatsNew.vue'))
const PortfolioAccordions = defineAsyncComponent(() => import('./../components/PortfolioAccordions.vue'))

onMounted(() => {
  const header = document.getElementById('viz-menu')
  const sticky = header.offsetTop

  window.onscroll = () => {
    if (window.pageYOffset > sticky) {
      header.classList.add('sticky')
    } else {
      header.classList.remove('sticky')
    }
  }

  window.addEventListener('load', findCarouselContainers)
})

onUpdated(() => {
  lazyLoadImages()
})

function lazyLoadImages() {
  const loadImg = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.srcset = entry.target.dataset.srcset
        entry.target.nextElementSibling.srcset = entry.target.dataset.srcset
        const findImg = entry.target.parentElement.querySelector('img')
        findImg.addEventListener('load', () => {
          entry.target.parentElement.classList.remove('lazy')
        })
        observer.unobserve(entry.target)
      }
    })
  }

  const imgTargets = document.querySelectorAll('.lazy > source')
  const imgObserver = new window.IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '300px'
  })
  imgTargets.forEach(img => imgObserver.observe(img))
}

function findCarouselContainers() {
  const carouselContainers = document.querySelectorAll('.carouselContainer')
  carouselContainers.forEach(container => {
    container.addEventListener('click', addFooterCaption)
  })
}

function addFooterCaption(e) {
  const imgContainer = document.querySelector('.fullscreen-v-img')
  const title = document.querySelector('.title-v-img')
  const img = document.querySelector('.content-v-img img')

  const observer = new MutationObserver(changes => {
    changes.forEach(change => {
      if (change.attributeName.includes('src')) {
        switchCaptionText(title)
      }
    })
  })

  observer.observe(img, { attributes: true })

  if (e.target.classList.contains('sliderImage')) {
    const captionHTML = `
      <div id="captionArea">
        <div class="caption">${title.textContent}</div>
      </div>`
    imgContainer.insertAdjacentHTML('afterbegin', captionHTML)
  }

  img.style.maxHeight = '68vh'
  img.style.top = '-15vh'
}

function switchCaptionText(text) {
  const caption = document.querySelector('.caption')
  caption.innerHTML = text.textContent
}
</script>

<style scoped lang="scss">
$nearBlack: #212222;

section {
  margin-top: 1rem;
  margin-left: 5%;
}

#sticky-body {
  top: 150px;
  margin: 0%;
  margin-top: 0%;
  display: grid;
  width: 100vw;
  grid-template-areas:
    "whatsNew whatsNew"
    "cards cards"
    "about about"
    "follow follow";
}

#visualization {
  position: relative;
}

#viz-header {
  grid-area: logo;
  background-color: $nearBlack;
  margin: 0;
  width: 100vw;
}

#viz-menu {
  grid-area: menu-bar;
  display: fixed;
  margin-top: 0;
  margin-left: 0;
}

#viz-cards {
  grid-area: cards;
}

#viz-new {
  grid-area: whatsNew;
}

#viz-about {
  grid-area: about;
}

#viz-follow {
  grid-area: follow;
}

#viz-header-svg {
  margin-left: 5vw;
  margin-top: 1rem;
  background-color: $nearBlack;
  fill: white;
  max-width: 600px;
}

#viz-header {
  background-color: $nearBlack;
}

@media (min-width: 1024px) {
  #sticky-body {
    grid-template-areas:
      "whatsNew whatsNew"
      "cards cards"
      "about about"
      "follow follow";
  }

  #viz-header-svg {
    max-width: 600px;
  }
}

@media (max-width: 63.99em) {
  #viz-header-svg {
    width: 40vw;
    min-width: 400px;
    background-color: $nearBlack;
  }
}

.sticky {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 50;
}

#viz-menu {
  margin-left: 0;
}
</style>
