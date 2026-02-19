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
          v-if="heroTitleLight"
          class="hero-panel__title-light"
        >
          {{ heroTitleLight }}
        </span>
      </h1>
      <p class="hero-panel__eyebrow">
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
        <template
          v-for="item in navItems"
          :key="item.id"
        >
          <li>
            <button
              class="hero-panel__nav-link"
              :class="{ active: activeSection === item.id }"
              type="button"
              @click="scrollTo(item.id)"
            >
              {{ item.label }}
            </button>
          </li>
          <li
            v-if="item.id === 'team'"
            class="hero-panel__nav-divider hero-panel__nav-external"
          >
            <a
              class="hero-panel__external-link"
              href="https://waterdata.usgs.gov"
              target="_blank"
              rel="noopener noreferrer"
            >
              Water Data for the Nation
            </a>
          </li>
           <li
            v-if="item.id === 'team'"
            class="hero-panel__nav-external"
          >
            <a
              class="hero-panel__external-link"
              href="https://www.usgs.gov/mission-areas/water-resources/science/computational-tools-water-data-users"
              target="_blank"
              rel="noopener noreferrer"
            >
              Computational Tools
            </a>
          </li>
        </template>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue"

const props = defineProps({
  title: {
    type: String,
    default: "USGS VizLab"
  },
  eyebrow: {
    type: String,
    default: "Data + Design Studio"
  },
  introText: {
    type: String,
    default: "We make visualizations for open and reproducible water science. Explore our portfolio of work:"
  }
})

const navItems = [
  { id: "series", label: "Series" },
  { id: "stories", label: "Interactive Stories" },
  { id: "sketches", label: "Illustrations & Infographics" },
  { id: "snapshots", label: "Charts & Maps" },
  { id: "blogs", label: "Water Data Blog" },
  { id: "team", label: "Meet the Team" }
]

const eyebrowText = computed(() => props.eyebrow)
const heroTitleParts = computed(() => {
  const [strong = props.title, ...rest] = (props.title || "").split(" ")
  return {
    strong,
    light: rest.join(" ")
  }
})
const heroTitleStrong = computed(() => heroTitleParts.value.strong)
const heroTitleLight = computed(() => heroTitleParts.value.light)
const introText = computed(() => props.introText)

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
  color: var(--hero-text-primary, #f8f9fb);
  border-radius: 2.4rem;
  padding: clamp(1.8rem, 3vw, 3rem);
  padding-bottom: clamp(2.6rem, 4vw, 4.2rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

.hero-panel__eyebrow {
  letter-spacing: var(--hero-letter-spacing-wide, 0.3em);
  text-transform: uppercase;
  font-size: clamp(1.15rem, 1.8vw, 1.6rem);
  color: var(--hero-text-muted, rgba(255, 255, 255, 0.78));
  font-weight: 600;
}

.hero-panel__title {
  font-size: clamp(8.6rem, 6vw, 6rem);
  line-height: 1.05;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: var(--hero-letter-spacing-tight, -0.025em);
}

.hero-panel__title-strong {
  display: block;
  font-weight: 800;
}

.hero-panel__title-light {
  display: block;
  font-weight: 200;
  color: var(--hero-text-muted, rgba(255, 255, 255, 0.78));
}

.hero-panel__intro {
  font-size: clamp(1.15rem, 2vw, 1.5rem);
  line-height: 1.6;
  color: var(--hero-text-primary, #f8f9fb);
  margin: 0 0 0.5rem;
}

.hero-panel__cta {
  align-self: flex-start;
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.65);
  letter-spacing: 0.18em;
  font-size: 1rem;
}

.hero-panel__nav {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: flex-start;
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
}

.hero-panel__nav-divider {
  width: 100%;
  padding-top: 1.4rem;
  margin-top: 0.6rem;
}

.hero-panel__nav-divider::before {
  content: "";
  display: block;
  width: 100%;
  border-top: 1px solid var(--hero-divider-color, rgba(255, 255, 255, 0.25));
  margin-bottom: 1rem;
}

.hero-panel__nav-external {
  width: 100%;
  margin-top: 0.4rem;
}

.hero-panel__external-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--hero-text-subtle, rgba(255, 255, 255, 0.85));
  text-transform: none;
  letter-spacing: var(--hero-external-letter-spacing, 0.05em);
  font-size: clamp(1rem, 1.4vw, 1.3rem);
  font-weight: 500;
  text-decoration: none;
}

.hero-panel__external-link::after {
  content: "";
  width: 0.8rem;
  height: 0.8rem;
  border: 1px solid currentColor;
  border-left: none;
  border-bottom: none;
  transform: rotate(45deg);
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
  text-transform: uppercase;
  letter-spacing: var(--hero-letter-spacing-wide, 0.3em);
  font-size: clamp(1.15rem, 1.8vw, 1.6rem);
  color: var(--hero-nav-link-color, rgba(255, 255, 255, 0.65));
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
  background: rgba(255, 149, 5, 0.7);
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
