<template>
  <div
    ref="shell"
    class="nav-shell"
  >
    <div class="nav-inner">
      <h1
        v-if="subtitle"
        class="nav-subtitle"
      >
        {{ subtitle }}
      </h1>

      <div class="nav-actions">
        <nav
          class="nav-links"
          aria-label="Primary navigation"
        >
          <div class="nav-scroller">
            <span
              class="fade left"
              aria-hidden="true"
            />
            <ul
              id="nav-menu"
              class="nav-list"
            >
              <li
                v-for="item in navItems"
                :key="item.id"
              >
                <button
                  class="nav-link"
                  :class="{ active: activeSection === item.id }"
                  type="button"
                  @click="scrollTo(item.id)"
                >
                  {{ item.label }}
                </button>
              </li>
            </ul>
            <span
              class="fade right"
              aria-hidden="true"
            />
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue"

import viz from "@/assets/content/viz-list.json"

const navItems = [
  { id: "stories", label: "stories" },
  { id: "series", label: "series" },
  { id: "sketches", label: "sketches" },
  { id: "blogs", label: "blog" },
  { id: "team", label: "about" }
]

const subtitle = viz?.site?.tagline || "water data visualizations"

const activeSection = ref(navItems[0].id)
const shell = ref(null)

let observer

const setupObserver = () => {
  observer?.disconnect()
  if (typeof window === "undefined") return

  const shellHeight = shell.value?.offsetHeight ?? 0
  observer = new IntersectionObserver(handleIntersect, {
    root: null,
    threshold: [0.15, 0.35, 0.6],
    rootMargin: `-${shellHeight}px 0px -60% 0px`
  })

  navItems.forEach((item) => {
    const el = document.getElementById(item.id)
    if (el) observer.observe(el)
  })
}

const handleResize = () => {
  setupObserver()
}

const handleScroll = () => {
  const shellHeight = shell.value?.offsetHeight ?? 0
  if (window.scrollY <= shellHeight + 4) {
    activeSection.value = navItems[0].id
  }
}

onMounted(() => {
  setupObserver()
  window.addEventListener("resize", handleResize)
  window.addEventListener("scroll", handleScroll, { passive: true })
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize)
  window.removeEventListener("scroll", handleScroll)
  observer?.disconnect()
})

function handleIntersect(entries) {
  const shellHeight = shell.value?.offsetHeight ?? 0
  if (window.scrollY <= shellHeight + 4) {
    activeSection.value = navItems[0].id
    return
  }

  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

  if (visible.length) {
    activeSection.value = visible[0].target.id
  }
}

function scrollTo(id) {
  const target = document.getElementById(id)
  if (!target) return

  activeSection.value = id

  const shellHeight = shell.value?.offsetHeight ?? 0
  const offset = target.getBoundingClientRect().top + window.scrollY - shellHeight + 2

  window.scrollTo({
    top: offset,
    behavior: "smooth"
  })
}
</script>

<style scoped>
.nav-shell {
  position: sticky;
  top: 0;
  z-index: 15;
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  padding: 1rem 0;
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.nav-subtitle {
  margin: 0;
  font-size: clamp(3.4rem, 3vw, 5.2rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: nowrap;
  max-width: min(60vw, 600px);
}

.nav-links {
  margin-left: auto;
  flex: 0 0 auto;
  display: flex;
  justify-content: flex-end;
}

.nav-list {
  list-style: none;
  display: flex;
  gap: 0.5rem;
  padding: 0;
  margin: 0;
  overflow-x: auto;
  scrollbar-width: none;
}

.nav-list::-webkit-scrollbar {
  display: none;
}

.nav-list li {
  flex: 0 0 auto;
  display: flex;
}

.nav-link {
  border: 1px solid currentColor;
  background: transparent;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-size: 1.3rem;
  padding: 0.4rem 1.2rem;
  cursor: pointer;
  color: inherit;
  border-radius: 999px;
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.1s ease;
}

.nav-link:hover,
.nav-link:focus-visible {
  color: #fff;
  background: var(--color-link);
  border-color: var(--color-link);
}

.nav-link:active {
  transform: translateY(1px);
}

.nav-link.active {
  background: var(--color-link);
  color: #fff;
  border-color: var(--color-link);
  font-weight: 700;
  letter-spacing: 0em;
}

/* on mobile the navigation bar scrolls horizontally if it doesn't fit on one lin */
.nav-scroller {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
}

/* using a slight fade appearance to indicate horizontal scroll */
.fade {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 14px;
  pointer-events: none;
  background: linear-gradient(to right, var(--color-background), transparent);
}

.fade.left {
  left: 0;
  background: linear-gradient(to right, var(--color-background), transparent);
}

.fade.right {
  right: 0;
  background: linear-gradient(to left, var(--color-background), transparent);
}

@media (max-width: 700px) {
  .nav-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
    padding: 0 1.5rem;
    width: 100%;
  }

  .nav-actions {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }

  .nav-subtitle {
    font-size: clamp(2.1rem, 6vw, 3.2rem);
    letter-spacing: 0.05em;
    width: 100%;
    white-space: nowrap;
  }

  .nav-links {
    width: 100%;
    margin-left: 0;
  }
}
</style>
