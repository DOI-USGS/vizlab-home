import { computed, onBeforeUnmount, ref, unref, watch } from "vue"

const appendRetryParam = (src = "", attempt = 0) => {
  if (!src || attempt === 0) return src
  const separator = src.includes("?") ? "&" : "?"
  return `${src}${separator}retry=${attempt}`
}

export const useImageLoader = (source, options = {}) => {
  const maxRetries = Math.max(0, options.maxRetries ?? 2)
  const retryDelay = Math.max(0, options.retryDelay ?? 800)

  const attempt = ref(0)
  const isLoaded = ref(false)
  const hasError = ref(false)
  let retryTimerId = null

  const normalizedSource = computed(() => {
    const raw = unref(source)
    return typeof raw === "string" ? raw : raw?.toString() ?? ""
  })

  const imageSrc = computed(() => appendRetryParam(normalizedSource.value, attempt.value))

  const clearTimer = () => {
    if (retryTimerId) {
      clearTimeout(retryTimerId)
      retryTimerId = null
    }
  }

  const reset = () => {
    clearTimer()
    attempt.value = 0
    isLoaded.value = false
    hasError.value = false
  }

  watch(
    normalizedSource,
    () => {
      reset()
    },
    { immediate: true }
  )

  const scheduleRetry = () => {
    if (attempt.value >= maxRetries) {
      hasError.value = true
      return
    }

    clearTimer()
    retryTimerId = setTimeout(() => {
      attempt.value += 1
      isLoaded.value = false
      hasError.value = false
    }, retryDelay)
  }

  const handleLoad = () => {
    clearTimer()
    isLoaded.value = true
    hasError.value = false
  }

  const handleError = () => {
    isLoaded.value = false
    scheduleRetry()
  }

  onBeforeUnmount(() => {
    clearTimer()
  })

  return {
    imageSrc,
    isLoaded,
    hasError,
    retryCount: computed(() => attempt.value),
    handleLoad,
    handleError
  }
}
