import { computed, ref, unref, watch } from "vue"

export function useCarouselWindow(itemsSource, options = {}) {
  const windowSize = Math.max(1, options.windowSize ?? 8)
  const stepSize = Math.max(1, options.stepSize ?? windowSize)

  const startIndex = ref(0)
  const items = computed(() => {
    const value = unref(itemsSource)
    return Array.isArray(value) ? value : []
  })

  const maxStartIndex = computed(() => Math.max(0, items.value.length - windowSize))

  watch(
    maxStartIndex,
    (max) => {
      startIndex.value = Math.min(startIndex.value, max)
    },
    { immediate: true }
  )

  const showControls = computed(() => items.value.length > windowSize)
  const canPrev = computed(() => showControls.value && startIndex.value > 0)
  const canNext = computed(
    () => showControls.value && startIndex.value < maxStartIndex.value
  )

  const windowItems = computed(() => {
    if (!items.value.length) return []
    if (!showControls.value) return items.value.slice()

    const start = Math.min(startIndex.value, maxStartIndex.value)
    const end = Math.min(start + windowSize, items.value.length)
    return items.value.slice(start, end)
  })

  const move = (direction = 1) => {
    if (!showControls.value) return
    const nextIndex = startIndex.value + direction * stepSize
    startIndex.value = Math.max(0, Math.min(nextIndex, maxStartIndex.value))
  }

  return {
    windowItems,
    move,
    showControls,
    canPrev,
    canNext
  }
}
