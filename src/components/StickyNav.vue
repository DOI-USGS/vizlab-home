<template>
  <div
    ref="shell"
    class="nav-shell"
  >
    <div class="nav-inner">
      <h1 v-if="subtitle" class="nav-subtitle">
        {{ subtitle }}
      </h1>

      <nav class="nav-links" aria-label="Primary navigation">
        <div class="nav-scroller">
          <span class="fade left" aria-hidden="true"></span>
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
          <span class="fade right" aria-hidden="true"></span>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue"

import viz from "@/assets/content/viz-list.json"

const navItems = [
  { id: "websites", label: "stories" },
  { id: "series", label: "series" },
  { id: "illustration", label: "sketches" },
  { id: "blog", label: "blog" },
  { id: "about", label: "about" }
]

const subtitle = viz?.site?.tagline || "water data visualizations"

const activeSection = ref(navItems[0]?.id ?? "")
const shell = ref(null)

let observer

onMounted(() => {
  if (typeof window === "undefined") return

  observer = new IntersectionObserver(handleIntersect, {
    root: null,
    threshold: 0.4,
    rootMargin: "-20% 0px -50% 0px"
  })

  navItems.forEach((item) => {
    const el = document.getElementById(item.id)
    if (el) {
      observer.observe(el)
    }
  })
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

function handleIntersect(entries) {
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

  const shellHeight = shell.value?.offsetHeight ?? 0
  const offset = target.getBoundingClientRect().top + window.scrollY - shellHeight - 16

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
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 1rem 0;
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
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
  gap: 0.8rem;
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
  border: none;
  background: none;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  font-size: 1.4rem;
  padding: 0.6rem 0.8rem;
  cursor: pointer;
  color: inherit;
  border-bottom: 2px solid transparent;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.nav-link:hover,
.nav-link:focus-visible {
  color: var(--color-link);
}

.nav-link.active {
  border-color: var(--color-link);
  font-weight: 800;
  letter-spacing: 0em;
}

.nav-scroller {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
}

.fade {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 14px;
  pointer-events: none;
  background: linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
}

.fade.left {
  left: 0;
  background: linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
}

.fade.right {
  right: 0;
  background: linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
}

@media (max-width: 700px) {
  .nav-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
    padding: 0 1.5rem;
    width: 100%;
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
