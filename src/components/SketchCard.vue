<template>
  <article
    class="sketch-card"
  >
    <a
      class="sketch-card__link"
      :href="targetUrl"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div class="sketch-card__thumb-wrapper">
        <img
          class="sketch-card__thumb"
          :src="resolvedThumbnail"
          :alt="altText"
          loading="lazy"
          @load="handleThumbLoad"
          @error="handleThumbError"
        >
        <span
          v-if="thumbError"
          class="sketch-card__thumb-fallback"
        >
          Image unavailable
        </span>
      </div>
      <div class="sketch-card__overlay">
        <p class="sketch-card__title">
          {{ card.title }}
        </p>
      </div>
    </a>
  </article>
</template>

<script setup>
import { computed } from "vue"
import { useAssetPathStore } from "@/stores/AssetPathStore.js"
import { useImageLoader } from "@/composables/useImageLoader.js"

const props = defineProps({
  card: {
    type: Object,
    required: true
  },
  assetSource: {
    type: String,
    default: "illustration",
    validator: (value) => ["illustration", "chart"].includes(value)
  }
})

const assetStore = useAssetPathStore()

const thumbnailSrc = computed(() => assetStore.buildThumbUrl(props.card.image.thumbnail))

const {
  imageSrc: resolvedThumbnail,
  isLoaded: thumbLoaded,
  hasError: thumbError,
  handleLoad: handleThumbLoad,
  handleError: handleThumbError
} = useImageLoader(thumbnailSrc, {
  maxRetries: 2,
  retryDelay: 1200
})

const altText = computed(() => props.card?.image?.alt || props.card.title)

const resolveAssetBySource = (path = "") => {
  if (props.assetSource === "chart") return assetStore.resolveChartAsset(path)
  return assetStore.resolveIllustrationAsset(path)
}

// if an external link is not provided, use the hosted asset for the section
const targetUrl = computed(() => {
  const primary = props.card.links.external
  if (primary) return primary
  const asset = resolveAssetBySource(props.card?.links?.asset || "")
  return asset || "#"
})
</script>

<style scoped>
.sketch-card {
  break-inside: avoid;
  margin: 0 0 1.5rem;
  border-radius: 1.2rem;
  display: block;
}

.sketch-card--wide {
  break-inside: avoid;
}

.sketch-card__link {
  display: block;
  position: relative;
  border-radius: 1.2rem;
  overflow: hidden;
  background: var(--light-grey);
}

.sketch-card__thumb-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  background: var(--light-grey);
}

.sketch-card__thumb {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.sketch-card__thumb-fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: var(--black-400);
  padding: 1rem;
  text-align: center;
}

.sketch-card__title {
  margin: 0;
  font-weight: 700;
  color: var(--black-soft);
  padding: 1rem 1.5rem;
  text-align: center;
}

.sketch-card__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.95);
  opacity: 0;
  transition: opacity 0.1s ease;
}

.sketch-card__link:hover .sketch-card__overlay,
.sketch-card__link:focus-visible .sketch-card__overlay {
  opacity: 1;
}

.sketch-card:hover,
.sketch-card:focus-visible {
  transform: translateY(-2px);
  box-shadow: 0 12px 20px var(--light-grey);
  opacity: 1;
}
</style>
