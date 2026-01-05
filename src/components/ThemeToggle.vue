<template>
  <button
    class="theme-toggle"
    type="button"
    :aria-pressed="isDark"
    :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
    @click="toggleTheme"
  >
    <span class="theme-toggle__label">
      {{ isDark ? "Dark mode" : "Light mode" }}
    </span>
  </button>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue"

const STORAGE_KEY = "vizlab-theme-preference"
const theme = ref("light")
const hasUserPreference = ref(false)
let mediaQuery

const applyTheme = (value) => {
  if (typeof document === "undefined") return
  document.documentElement.dataset.theme = value
}

const readStoredPreference = () => {
  if (typeof window === "undefined") return null
  return window.localStorage.getItem(STORAGE_KEY)
}

const savePreference = (value) => {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEY, value)
}

const handleSystemPreferenceChange = (event) => {
  if (hasUserPreference.value) return
  const nextTheme = event.matches ? "dark" : "light"
  theme.value = nextTheme
  applyTheme(nextTheme)
}

const initializeTheme = () => {
  if (typeof window === "undefined") return

  const stored = readStoredPreference()
  hasUserPreference.value = Boolean(stored)
  mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  const initial = stored || (mediaQuery.matches ? "dark" : "light")
  theme.value = initial
  applyTheme(initial)

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", handleSystemPreferenceChange)
  } else if (mediaQuery.addListener) {
    mediaQuery.addListener(handleSystemPreferenceChange)
  }
}

onMounted(() => {
  initializeTheme()
})

onBeforeUnmount(() => {
  if (!mediaQuery) return
  if (mediaQuery.removeEventListener) {
    mediaQuery.removeEventListener("change", handleSystemPreferenceChange)
  } else if (mediaQuery.removeListener) {
    mediaQuery.removeListener(handleSystemPreferenceChange)
  }
})

const isDark = computed(() => theme.value === "dark")

const toggleTheme = () => {
  const nextTheme = isDark.value ? "light" : "dark"
  theme.value = nextTheme
  applyTheme(nextTheme)
  hasUserPreference.value = true
  savePreference(nextTheme)
}
</script>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  border: 1px solid var(--color-border);
  background: transparent;
  color: inherit;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  font-size: 1.3rem;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.1s ease;
}

.theme-toggle:hover,
.theme-toggle:focus-visible {
  background: var(--color-link);
  border-color: var(--color-link);
  color: #fff;
}

.theme-toggle:active {
  transform: translateY(1px);
}

.theme-toggle__label {
  font-weight: 600;
  letter-spacing: 0.02em;
}
</style>
