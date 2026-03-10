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
      <p class="section-summary hero-panel__intro">
        {{ introText }}
      </p>
    </div>

    <nav
      class="hero-panel__nav"
      aria-label="Section navigation"
    >
      <div class="hero-panel__nav-desktop">
        <ul class="hero-panel__nav-list">
          <li
            v-for="item in desktopNavItems"
            :key="item.id"
          >
            <button
              class="hero-panel__nav-link hero-panel__nav-link--light"
              :class="{ active: activeSection === item.id }"
              type="button"
              @click="scrollTo(item.id)"
            >
              {{ item.label }}
            </button>
          </li>
        </ul>
        <div
          class="section-divider"
          aria-hidden="true"
        ></div>
        <button
          class="hero-panel__mobile-link hero-panel__mobile-link--toggle"
          type="button"
          :aria-expanded="desktopOtherLinksOpen.toString()"
          @click="toggleDesktopOtherLinks"
        >
          <span>Other links</span>
          <span aria-hidden="true">{{ desktopOtherLinksOpen ? "−" : "+" }}</span>
        </button>
        <div
          v-if="desktopOtherLinksOpen"
          class="hero-panel__mobile-submenu"
        >
          <a
            v-for="link in otherLinks"
            :key="link.href"
            class="hero-panel__mobile-sublink"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ link.label }}
          </a>
        </div>
      </div>

      <div class="hero-panel__nav-mobile">
        <button
          class="hero-panel__mobile-link hero-panel__mobile-link--toggle"
          :class="{ active: isPortfolioActive }"
          type="button"
          :aria-expanded="mobilePortfolioOpen.toString()"
          @click="toggleMobilePortfolio"
        >
          <span>Portfolio</span>
          <span aria-hidden="true">{{ mobilePortfolioOpen ? "−" : "+" }}</span>
        </button>
        <div
          v-if="mobilePortfolioOpen"
          class="hero-panel__mobile-submenu"
        >
          <button
            v-for="item in portfolioNavItems"
            :key="item.id"
            class="hero-panel__mobile-sublink"
            :class="{ active: activeSection === item.id }"
            type="button"
            @click="scrollTo(item.id)"
          >
            {{ item.label }}
          </button>
        </div>

        <button
          class="hero-panel__mobile-link hero-panel__mobile-link--toggle"
          :class="{ active: isAboutActive }"
          type="button"
          :aria-expanded="mobileOtherLinksOpen.toString()"
          @click="toggleMobileOtherLinks"
        >
          <span>Other links</span>
          <span aria-hidden="true">{{ mobileOtherLinksOpen ? "−" : "+" }}</span>
        </button>
        <div
          v-if="mobileOtherLinksOpen"
          class="hero-panel__mobile-submenu"
        >
          <a
            v-for="link in otherLinks"
            :key="link.href"
            class="hero-panel__mobile-sublink"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ link.label }}
          </a>
          <button
            class="hero-panel__mobile-sublink"
            :class="{ active: isAboutActive }"
            type="button"
            @click="scrollTo(teamSectionId)"
          >
            About
          </button>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue"
import sectionMetadata from "@/assets/content/section-metadata.json"

const props = defineProps({
  title: {
    type: String,
    default: "USGS VizLab"
  },
  eyebrow: {
    type: String,
    default: "data + design studio"
  },
  introText: {
    type: String,
    default: "Visualizations for open and reproducible water science."
  }
})

const sectionOrder = ["series", "stories", "sketches", "snapshots", "blogs", "team"]
const desktopNavItems = sectionOrder.map((sectionId) => {
  const meta = sectionMetadata[sectionId]
  return {
    id: meta.id,
    label: meta.title
  }
})
const teamSectionId = sectionMetadata.team.id
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
const introText = props.introText
const [heroTitleStrong, heroTitleLight] = (() => {
  const [strong = props.title, ...rest] = (props.title || "").split(" ")
  return [strong, rest.join(" ")]
})()

const activeSection = ref(desktopNavItems[0].id)
const desktopOtherLinksOpen = ref(false)
const mobilePortfolioOpen = ref(false)
const mobileOtherLinksOpen = ref(false)
let observer

const SCROLL_OFFSET = 32
const isPortfolioActive = computed(() => portfolioNavItems.some((item) => item.id === activeSection.value))
const isAboutActive = computed(() => activeSection.value === teamSectionId)

const closeMobileMenus = () => {
  mobilePortfolioOpen.value = false
  mobileOtherLinksOpen.value = false
}

const toggleMobilePortfolio = () => {
  mobilePortfolioOpen.value = !mobilePortfolioOpen.value
  if (mobilePortfolioOpen.value) {
    mobileOtherLinksOpen.value = false
  }
}

const toggleMobileOtherLinks = () => {
  mobileOtherLinksOpen.value = !mobileOtherLinksOpen.value
  if (mobileOtherLinksOpen.value) {
    mobilePortfolioOpen.value = false
  }
}

const toggleDesktopOtherLinks = () => {
  desktopOtherLinksOpen.value = !desktopOtherLinksOpen.value
}

// set up srolling navigation
const scrollTo = (id) => {
  const target = document.getElementById(id)
  if (!target) return
  closeMobileMenus()
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
  position: sticky;
  top: clamp(1.5rem, 4vw, 4rem);
  height: calc(100vh - clamp(1.5rem, 4vw, 8rem));
  margin-top: clamp(1.5rem, 3vw, 3rem);
  width: 100%;
  color: var(--white-bright);
  border-radius: 2.4rem;
  padding: clamp(1.8rem, 3vw, 3rem);
  padding-bottom: clamp(2.6rem, 4vw, 4.2rem);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2rem;
  box-shadow: 0 25px 50px rgba(2, 8, 17, 0.25);
  background: var(--usgs-blue);
}

.hero-panel__content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hero-slogan {
  font-size: clamp(2.2rem, 1.8vw, 2.5rem);
  font-weight: 800;
  color: var(--white-bright);
  margin: 0;
  font-family: "Source Sans Pro", var(--default-font), sans-serif;
}

.hero-panel__title {
  font-size: clamp(7rem, 5vw, 5.4rem);
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

.hero-panel__intro {
  margin: 0.5rem 0 0.5rem;
}

.hero-panel__nav {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: flex-start;
  flex: 1 1 auto;
  width: 100%;
}

.hero-panel__nav-desktop {
  display: contents;
}

.hero-panel__nav-mobile {
  display: none;
}

.hero-panel__nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  align-items: flex-start;
  height: 100%;
}

.hero-panel__nav-list .hero-panel__nav-link {
  width: 100%;
}

.hero-panel :is(.section-summary) {
  color: var(--white-bright);
}

.hero-panel__nav-note {
  font-size: clamp(1.15rem, 1.8vw, 1.6rem);
  font-weight: 600;
  margin: 0;
}

.hero-panel__mobile-link,
.hero-panel__mobile-sublink {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 1.2rem;
  background: rgba(255, 255, 255, 0.08);
  color: var(--white-bright);
  font-family: "Source Sans Pro", var(--default-font), sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  text-align: left;
  text-decoration: none;
  padding: 1.1rem 1.4rem;
}

.hero-panel__mobile-link {
  cursor: pointer;
}

.hero-panel__mobile-link.active,
.hero-panel__mobile-sublink.active {
  background: rgba(255, 255, 255, 0.16);
  border-color: rgba(255, 255, 255, 0.35);
}

.hero-panel__mobile-submenu {
  display: grid;
  gap: 0.8rem;
  padding: 0.4rem 0 0.2rem 1.4rem;
  border-left: 2px solid rgba(255, 255, 255, 0.24);
  width: 100%;
}

.hero-panel__mobile-sublink {
  width: 100%;
  justify-content: flex-start;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  border-color: rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.04);
  padding-left: 1.2rem;
}

.section-divider {
  color: var(--white-soft);
}

@media (max-width: 960px) {
  .hero-panel {
    position: static;
    height: auto;
    border-radius: 1.6rem;
    width: 100%;
    margin-top: 1.6rem;
    padding: clamp(1.6rem, 4vw, 2.4rem);
    gap: 1.6rem;
  }

  .hero-panel__nav {
    gap: 1rem;
  }

  .hero-panel__nav-desktop {
    display: none;
  }

  .hero-panel__nav-mobile {
    display: grid;
    gap: 0.8rem;
    width: 100%;
  }

  .hero-panel__mobile-link {
    width: 100%;
  }

  .hero-panel__mobile-submenu {
    padding: 0.4rem 0 0.2rem 1.2rem;
  }
}
</style>
