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
      <p class="hero-panel__intro">
        {{ introText }}
      </p>
    </div>

    <nav
      class="hero-panel__nav"
      aria-label="Section navigation"
    >
      <ul class="hero-panel__nav-list">
        <li
          v-for="item in navItems"
          :key="item.id"
        >
          <button
            class="hero-panel__nav-link"
            :class="{ active: activeSection === item.id }"
            type="button"
            @click="scrollTo(item.id)"
          >
            {{ item.label }}
          </button>
        </li>
      </ul>
      <div class="hero-panel__nav-external-group">
        <div
          class="hero-panel__nav-divider"
          aria-hidden="true"
        ></div>
        <p class="hero-panel__nav-link hero-panel__external-heading">
          Get USGS Water Data:
        </p>
        <a
          class="hero-panel__nav-link hero-panel__external-link"
          href="https://waterdata.usgs.gov"
          target="_blank"
          rel="noopener noreferrer"
        >
          Water Data for the Nation
        </a>
        <a
          class="hero-panel__nav-link hero-panel__external-link"
          href="https://www.usgs.gov/mission-areas/water-resources/science/computational-tools-water-data-users"
          target="_blank"
          rel="noopener noreferrer"
        >
          Computational Tools
        </a>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue"
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
    default: "We make visualizations for open and reproducible water science. Explore our portfolio of work:"
  }
})

const sectionOrder = ["series", "stories", "sketches", "snapshots", "blogs", "team"]
const navItems = sectionOrder.map((sectionId) => {
  const meta = sectionMetadata[sectionId]
  return {
    id: meta.id,
    label: meta.title
  }
})

const eyebrowText = props.eyebrow
const introText = props.introText
const [heroTitleStrong, heroTitleLight] = (() => {
  const [strong = props.title, ...rest] = (props.title || "").split(" ")
  return [strong, rest.join(" ")]
})()

const activeSection = ref(navItems[0].id)
let observer

const SCROLL_OFFSET = 32

// set up srolling navigation
const scrollTo = (id) => {
  const target = document.getElementById(id)
  if (!target) return
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

  navItems.forEach((item) => {
    const el = document.getElementById(item.id)
    if (el) observer.observe(el)
  })
}

// use scrolling distance to know which section is active
const updateActiveSectionByScrollPosition = () => {
  if (typeof window === "undefined") return

  const threshold = window.scrollY + window.innerHeight * 0.25
  let current = navItems[0].id

  for (const item of navItems) {
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
  color: var(--white-bright);
  border-radius: 2.4rem;
  padding: clamp(1.8rem, 3vw, 3rem);
  padding-bottom: clamp(2.6rem, 4vw, 4.2rem);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2rem;
  box-shadow: 0 25px 80px rgba(2, 8, 17, 0.45);
  background: radial-gradient(circle at 15% 20%, var(--hero-glow-primary), transparent 45%),
    radial-gradient(circle at 60% 10%, var(--hero-glow-secondary), transparent 42%),
    linear-gradient(140deg, var(--hero-gradient-start), var(--hero-gradient-mid), var(--hero-gradient-end));
}

.hero-panel__content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hero-panel__title {
  font-size: clamp(8.6rem, 6vw, 6rem);
  line-height: 1.05;
  margin: 0;
}

.hero-panel__title-strong {
  display: block;
  font-weight: 800;
  font-family: 'Univers Condensed', var(--title-font), sans-serif;
}

.hero-panel__title-light {
  display: block;
  font-weight: 200;
  color: var(--white-bright);
}

.hero-panel__intro {
  font-size: clamp(1.5rem, 2vw, 2rem);
  line-height: 1.6;
  color: var(--white-bright);
  margin: 0 0 0.5rem;
}

.hero-panel__nav {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: flex-start;
  flex: 1 1 auto;
  width: 100%;
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

.hero-panel__nav-external-group {
  width: 100%;
  margin-top: auto;
  padding-top: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.hero-panel__nav-divider {
  width: 100%;
  border-top: 1px solid var(--white-soft);
  margin-bottom: 0.6rem;
}

.hero-panel__external-heading {
  font-size: clamp(1.15rem, 1.8vw, 1.6rem);
  font-weight: 600;
  color: var(--white-bright);
}

.hero-panel__external-heading::after {
  content: none;
}

.hero-panel__external-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--white-bright);
  font-size: clamp(1rem, 1.4vw, 1.3rem);
  font-weight: 500;
  text-decoration: none;
}

.hero-panel__external-link:hover,
.hero-panel__external-link:focus-visible {
  color: rgba(255, 255, 255, 1);
}

.hero-panel__nav-link {
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  padding: 0.35rem 0;
  font-size: clamp(1.15rem, 1.8vw, 1.6rem);
  color: var(--white-bright);
  transition:
    color 0.2s ease,
    transform 0.15s ease;
}

.hero-panel__nav-link::after {
  content: "";
  display: block;
  height: 3px;
  margin-top: 0.5rem;
  background: rgba(255, 149, 5, 0.3);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s ease;
}

.hero-panel__nav-link:hover,
.hero-panel__nav-link:focus-visible {
  color: var(--color-accent);
}

.hero-panel__nav-link:hover::after,
.hero-panel__nav-link:focus-visible::after {
  transform: scaleX(0.35);
  background: var(--color-accent);
}

.hero-panel__external-link.hero-panel__nav-link::after {
  content: "";
  width: 0.8rem;
  height: 0.8rem;
  border: 1px solid currentColor;
  border-left: none;
  border-bottom: none;
  transform: rotate(45deg);
  margin-top: 0;
  background: none;
}

.hero-panel__nav-link.active {
  color: var(--color-accent);
  font-weight: 600;
}

.hero-panel__nav-link.active::after {
  transform: scaleX(1);
  background: var(--color-accent);
}

@media (--bp-md) {
  .hero-panel {
    position: static;
    height: auto;
    border-radius: 1.6rem;
    width: 100%;
  }

  .hero-panel__nav-link {
    text-align: center;
  }
}
</style>
