import { computed, ref, unref, watch } from "vue"

export function useCarouselWindow(itemsSource, options = {}) {
  const windowSize = Math.max(1, options.windowSize ?? 8)
  const stepSize = Math.max(1, options.stepSize ?? windowSize)

  const startIndex = ref(0)
  const items = computed(() => {
    const value = unref(itemsSource)
    return Array.isArray(value) ? value : []
  })

  const showControls = computed(() => items.value.length > windowSize)
  const canPrev = computed(() => showControls.value)
  const canNext = computed(() => showControls.value)

  const windowItems = computed(() => {
    const list = items.value
    const len = list.length

    if (!len) return []
    if (len <= windowSize) return list.slice()

    const start = ((startIndex.value % len) + len) % len
    const selection = []

    for (let i = 0; i < windowSize; i += 1) {
      selection.push(list[(start + i) % len])
    }

    return selection
  })

  const move = (direction = 1) => {
    const len = items.value.length
    if (len <= windowSize) return
    const delta = direction * stepSize
    startIndex.value = (startIndex.value + delta + len) % len
  }

  watch(
    () => items.value.length,
    (len) => {
      if (len <= 0) {
        startIndex.value = 0
        return
      }

      if (len <= windowSize) {
        startIndex.value = 0
        return
      }

      startIndex.value = ((startIndex.value % len) + len) % len
    },
    { immediate: true }
  )

  return {
    windowItems,
    move,
    showControls,
    canPrev,
    canNext
  }
}
