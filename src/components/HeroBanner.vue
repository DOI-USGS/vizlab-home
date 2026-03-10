<template>
  <aside
    class="hero-panel"
    aria-labelledby="hero-title"
  >
    <div class="content">
      <h1
        id="hero-title"
        class="title"
      >
        <span class="strong">{{ heroTitleStrong }}</span>
        <span
          class="light"
        >
          {{ heroTitleLight }}
        </span>
      </h1>
      <p class="slogan">
        {{ eyebrowText }}
      </p>
    </div>

    <nav
      class="nav"
      aria-label="Section navigation"
    >
      <div
        v-for="group in navGroups"
        :key="group.id"
        class="group"
      >
        <button
          class="ui-button ui-button--disclosure"
          :class="{ active: group.active }"
          type="button"
          :aria-expanded="group.isOpen.toString()"
          @click="toggleGroup(group.id)"
        >
          <span>{{ group.label }}</span>
          <span aria-hidden="true">{{ group.isOpen ? "−" : "+" }}</span>
        </button>
        <div
          v-if="group.isOpen"
          class="subnav"
        >
          <template
            v-for="item in group.items"
            :key="item.id"
          >
            <button
              v-if="item.target"
              class="ui-button ui-button--disclosure"
              :class="{ active: item.active }"
              type="button"
              @click="scrollTo(item.target)"
            >
              {{ item.label }}
            </button>
            <a
              v-else
              class="ui-button ui-button--disclosure"
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ item.label }}
            </a>
          </template>
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
const openGroup = ref(null)
let observer

const isPortfolioActive = computed(() => portfolioNavItems.some((item) => item.id === activeSection.value))
const isAboutActive = computed(() => activeSection.value === teamSectionId)
const navGroups = computed(() => [
  {
    id: "portfolio",
    label: "Visualization portfolio",
    active: isPortfolioActive.value,
    isOpen: openGroup.value === "portfolio",
    items: portfolioNavItems.map((item) => ({
      ...item,
      target: item.id,
      active: activeSection.value === item.id
    }))
  },
  {
    id: "about",
    label: "About",
    active: isAboutActive.value,
    isOpen: openGroup.value === "about",
    items: [
      {
        id: teamSectionId,
        label: "Meet the Team",
        target: teamSectionId,
        active: isAboutActive.value
      }
    ]
  },
  {
    id: "links",
    label: "Access USGS Water Data",
    active: false,
    isOpen: openGroup.value === "links",
    items: otherLinks.map((link) => ({
      ...link,
      id: link.href
    }))
  }
])

const closeMenus = () => {
  openGroup.value = null
}

const toggleGroup = (groupId) => {
  openGroup.value = openGroup.value === groupId ? null : groupId
}

// set up srolling navigation
const scrollTo = (id) => {
  const target = document.getElementById(id)
  if (!target) return
  closeMenus()
  window.scrollTo({
    top: target.getBoundingClientRect().top + window.scrollY,
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
  width: 100%;
  color: var(--white-bright);
  padding: clamp(1.8rem, 3vw, 3rem);
  padding-bottom: clamp(2.6rem, 4vw, 4.2rem);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: var(--usgs-blue);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 78rem;
}

.slogan {
  font-size: clamp(2.4rem, 2vw, 3rem);
  font-weight: 800;
  color: var(--white-bright);
  margin: 0;
  font-family: "Source Sans Pro", var(--default-font), sans-serif;
  white-space: nowrap;
}

.title {
  font-size: clamp(5.8rem, 8vw, 8.6rem);
  line-height: 1.05;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: baseline;
}

.strong {
  font-family: "Univers Condensed", sans-serif;
  font-weight: 700;
  letter-spacing: -0.075em;
}

.light {
  font-weight: 200;
  color: var(--white-bright);
  letter-spacing: -0.02em;
}

.nav {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.8rem;
  align-items: flex-start;
  flex: 0 0 auto;
  width: 100%;
  max-width: 100%;
}

.group {
  position: relative;
  flex: 0 0 auto;
}

.hero-panel .ui-button--disclosure {
  --button-bg: rgba(255, 255, 255, 0.08);
  --button-border: rgba(255, 255, 255, 0.14);
  --button-text: var(--white-bright);
  --button-hover-bg: rgba(255, 255, 255, 0.16);
  --button-hover-border: rgba(255, 255, 255, 0.22);
  --button-hover-text: var(--white-bright);
  text-align: left;
}

.subnav {
  display: grid;
  gap: 0.8rem;
  justify-items: stretch;
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

.subnav > .ui-button--disclosure {
  --button-bg: rgba(255, 255, 255, 0.04);
  --button-border: transparent;
  --button-hover-bg: rgba(255, 255, 255, 0.12);
  --button-hover-border: transparent;
  --button-font-size: 1.6rem;
  --button-justify: flex-start;
  --button-padding: 0.9rem 1.3rem 0.9rem 1.2rem;
  width: 100%;
  justify-content: flex-start;
  text-align: left;
}

@media (max-width: 960px) {
  .hero-panel {
    padding: clamp(1.6rem, 4vw, 2.4rem);
    gap: 1.6rem;
  }

  .slogan {
    font-size: clamp(2.6rem, 6vw, 3.2rem);
  }

  .title {
    font-size: clamp(5rem, 12vw, 7rem);
  }

  .nav {
    flex-direction: column;
    flex-wrap: nowrap;
    width: 100%;
    max-width: 62rem;
  }

  .group {
    width: 100%;
  }

  .hero-panel .ui-button--disclosure {
    width: 100%;
  }

  .subnav {
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
