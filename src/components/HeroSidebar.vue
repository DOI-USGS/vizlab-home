<template>
  <aside
    ref="panel"
    class="hero-panel"
    aria-labelledby="hero-title"
  >
    <div class="hero-panel__content">
      <h1
        id="hero-title"
        class="hero-panel__title"
      >
        <span class="hero-panel__title-strong">{{ heroTitleStrong }}</span>
        <span
          class="hero-panel__title-light"
        >
          {{ heroTitleLight }}
        </span>
      </h1>
      <p class="hero-slogan">
        {{ eyebrowText }}
      </p>
    </div>

    <nav
      class="hero-panel__nav"
      aria-label="Section navigation"
    >
      <div class="hero-panel__group">
        <button
          class="ui-button ui-button--disclosure hero-panel__disclosure"
          :class="{ active: isPortfolioActive }"
          type="button"
          :aria-expanded="portfolioOpen.toString()"
          @click="togglePortfolio"
        >
          <span>Visualization portfolio</span>
          <span aria-hidden="true">{{ portfolioOpen ? "−" : "+" }}</span>
        </button>
        <div
          v-if="portfolioOpen"
          class="hero-panel__subnav"
        >
          <button
            v-for="item in portfolioNavItems"
            :key="item.id"
            class="ui-button ui-button--disclosure hero-panel__disclosure hero-panel__sub"
            :class="{ active: activeSection === item.id }"
            type="button"
            @click="scrollTo(item.id)"
          >
            {{ item.label }}
          </button>
        </div>
      </div>

      <div class="hero-panel__group">
        <button
          class="ui-button ui-button--disclosure hero-panel__disclosure"
          type="button"
          :aria-expanded="otherLinksOpen.toString()"
          @click="toggleOtherLinks"
        >
          <span>Access USGS Water Data</span>
          <span aria-hidden="true">{{ otherLinksOpen ? "−" : "+" }}</span>
        </button>
        <div
          v-if="otherLinksOpen"
          class="hero-panel__subnav"
        >
          <a
            v-for="link in otherLinks"
            :key="link.href"
            class="ui-button ui-button--disclosure hero-panel__disclosure hero-panel__sub"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ link.label }}
          </a>
        </div>
      </div>

      <div class="hero-panel__group">
        <button
          class="ui-button ui-button--disclosure hero-panel__disclosure"
          :class="{ active: isAboutActive }"
          type="button"
          :aria-expanded="aboutOpen.toString()"
          @click="toggleAbout"
        >
          <span>About</span>
          <span aria-hidden="true">{{ aboutOpen ? "−" : "+" }}</span>
        </button>
        <div
          v-if="aboutOpen"
          class="hero-panel__subnav"
        >
          <button
            class="ui-button ui-button--disclosure hero-panel__disclosure hero-panel__sub"
            :class="{ active: isAboutActive }"
            type="button"
            @click="scrollTo(teamSectionId)"
          >
            Meet the Team
          </button>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue"
import sections from "@/assets/content/sections.json"

const props = defineProps({
  title: {
    type: String,
    default: "USGS VizLab"
  },
  eyebrow: {
    type: String,
    default: "data + design studio"
  }
})

const sectionOrder = ["series", "stories", "sketches", "snapshots", "blogs", "team"]
const desktopNavItems = sectionOrder.map((sectionId) => {
  const meta = sections[sectionId]
  return {
    id: meta.id,
    label: meta.title
  }
})
const teamSectionId = sections.team.id
const portfolioNavItems = desktopNavItems.filter((item) => item.id !== teamSectionId)
const otherLinks = [
  {
    label: "Water Data for the Nation",
    href: "https://waterdata.usgs.gov"
  },
  {
    label: "Computational Tools",
    href: "https://www.usgs.gov/mission-areas/water-resources/science/computational-tools-water-data-users"
  }
]

const eyebrowText = props.eyebrow
const [heroTitleStrong, heroTitleLight] = (() => {
  const [strong = props.title, ...rest] = (props.title || "").split(" ")
  return [strong, rest.join(" ")]
})()

const activeSection = ref(desktopNavItems[0].id)
const portfolioOpen = ref(false)
const otherLinksOpen = ref(false)
const aboutOpen = ref(false)
let observer

const SCROLL_OFFSET = 32
const isPortfolioActive = computed(() => portfolioNavItems.some((item) => item.id === activeSection.value))
const isAboutActive = computed(() => activeSection.value === teamSectionId)

const closeMenus = () => {
  portfolioOpen.value = false
  otherLinksOpen.value = false
  aboutOpen.value = false
}

const togglePortfolio = () => {
  const nextValue = !portfolioOpen.value
  portfolioOpen.value = nextValue
  if (nextValue) {
    otherLinksOpen.value = false
    aboutOpen.value = false
  }
}

const toggleOtherLinks = () => {
  const nextValue = !otherLinksOpen.value
  otherLinksOpen.value = nextValue
  if (nextValue) {
    portfolioOpen.value = false
    aboutOpen.value = false
  }
}

const toggleAbout = () => {
  const nextValue = !aboutOpen.value
  aboutOpen.value = nextValue
  if (nextValue) {
    portfolioOpen.value = false
    otherLinksOpen.value = false
  }
}

// set up srolling navigation
const scrollTo = (id) => {
  const target = document.getElementById(id)
  if (!target) return
  closeMenus()
  window.scrollTo({
    top: target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET,
    behavior: "smooth"
  })
}

// observe scrolling distance on the page
const setupObserver = () => {
  observer?.disconnect()
  if (typeof window === "undefined") return

  observer = new IntersectionObserver(handleIntersect, {
    root: null,
    threshold: [0.3, 0.5, 0.75],
    rootMargin: "-35% 0px -40% 0px"
  })

  desktopNavItems.forEach((item) => {
    const el = document.getElementById(item.id)
    if (el) observer.observe(el)
  })
}

// use scrolling distance to know which section is active
const updateActiveSectionByScrollPosition = () => {
  if (typeof window === "undefined") return

  const threshold = window.scrollY + window.innerHeight * 0.25
  let current = desktopNavItems[0].id

  for (const item of desktopNavItems) {
    const el = document.getElementById(item.id)
    if (!el) continue
    const elementTop = el.getBoundingClientRect().top + window.scrollY
    if (threshold >= elementTop) {
      current = item.id
    } else {
      break
    }
  }

  activeSection.value = current
}

function handleIntersect(entries) {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

  if (visible.length) {
    activeSection.value = visible[0].target.id
    return
  }

  updateActiveSectionByScrollPosition()
}

const handleResize = () => {
  setupObserver()
}

onMounted(() => {
  document.documentElement.style.setProperty("--sticky-nav-offset", "0px")
  setupObserver()
  window.addEventListener("resize", handleResize)
  window.addEventListener("scroll", updateActiveSectionByScrollPosition, { passive: true })
})

onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener("resize", handleResize)
  window.removeEventListener("scroll", updateActiveSectionByScrollPosition)
})
</script>

<style scoped>
.hero-panel {
  position: static;
  margin-top: 0;
  width: 100%;
  max-width: none;
  margin-inline: 0;
  color: var(--white-bright);
  border-radius: 0;
  padding: clamp(1.8rem, 3vw, 3rem);
  padding-bottom: clamp(2.6rem, 4vw, 4.2rem);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2rem;
  box-shadow: none;
  background: var(--usgs-blue);
}

.hero-panel__content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 78rem;
}

.hero-slogan {
  font-size: clamp(2.4rem, 2vw, 3rem);
  font-weight: 800;
  color: var(--white-bright);
  margin: 0;
  font-family: "Source Sans Pro", var(--default-font), sans-serif;
  white-space: nowrap;
}

.hero-panel__title {
  font-size: clamp(5.8rem, 8vw, 8.6rem);
  line-height: 1.05;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: baseline;
}

.hero-panel__title-strong {
  font-family: "Univers Condensed", sans-serif;
  font-weight: 700;
  letter-spacing: -0.075em;
}

.hero-panel__title-light {
  font-weight: 200;
  color: var(--white-bright);
  letter-spacing: -0.02em;
}

.hero-panel__nav {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.8rem;
  align-items: flex-start;
  flex: 0 0 auto;
  width: 100%;
  max-width: 100%;
}

.hero-panel__group {
  position: relative;
  flex: 0 0 auto;
}

.hero-panel :is(.section-summary) {
  color: var(--white-bright);
}

.hero-panel__disclosure {
  width: auto;
  --button-bg: rgba(255, 255, 255, 0.08);
  --button-border: transparent;
  --button-text: var(--white-bright);
  --button-hover-bg: rgba(255, 255, 255, 0.16);
  --button-hover-border: transparent;
  --button-hover-text: var(--white-bright);
}

.hero-panel__subnav {
  display: grid;
  gap: 0.8rem;
  position: absolute;
  top: calc(100% + 0.8rem);
  left: 0;
  min-width: 100%;
  padding: 0.8rem;
  border-radius: 1.6rem;
  background: rgba(4, 22, 44, 0.96);
  box-shadow: 0 20px 40px rgba(2, 8, 17, 0.3);
  z-index: 2;
}

.hero-panel__sub {
  --button-bg: rgba(255, 255, 255, 0.04);
  --button-border: transparent;
  --button-hover-bg: rgba(255, 255, 255, 0.12);
  --button-hover-border: transparent;
  --button-font-size: 1.6rem;
  justify-content: flex-start;
  padding-left: 1.2rem;
}

@media (max-width: 960px) {
  .hero-panel {
    padding: clamp(1.6rem, 4vw, 2.4rem);
    gap: 1.6rem;
  }

  .hero-slogan {
    font-size: clamp(2.6rem, 6vw, 3.2rem);
  }

  .hero-panel__title {
    font-size: clamp(5rem, 12vw, 7rem);
  }

  .hero-panel__nav {
    flex-direction: column;
    flex-wrap: nowrap;
    width: 100%;
    max-width: 62rem;
  }

  .hero-panel__group {
    width: 100%;
  }

  .hero-panel__disclosure {
    width: 100%;
  }

  .hero-panel__subnav {
    position: static;
    min-width: 0;
    padding: 0.4rem 0 0.2rem 1.2rem;
    border-radius: 0;
    background: none;
    box-shadow: none;
    border-left: 2px solid rgba(255, 255, 255, 0.24);
  }
}
</style>
