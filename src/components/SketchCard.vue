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
      <img
        class="sketch-card__thumb"
        :src="thumbnailSrc"
        :alt="altText"
        loading="lazy"
      >
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

const props = defineProps({
  card: {
    type: Object,
    required: true
  }
})

const assetStore = useAssetPathStore()

const thumbnailSrc = computed(() => {
  const src = props.card.image.thumbnail 
  return assetStore.buildThumbUrl(src)
})

const altText = computed(() => props.card?.image?.alt || props.card.title)

// if an external link is not provided, use the image hosted in s3
const targetUrl = computed(() => {
  const primary = props.card.links.external
  if (primary) return primary
  const asset = props.card?.links?.asset || ""
  if (!asset) return "#"
  if (/^https?:\/\//i.test(asset)) return asset
  return assetStore.buildIllustrationUrl(asset)
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

.sketch-card__thumb {
  width: 100%;
  height: auto;
  display: block;
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
