<template>
  <article
    class="sketch-card card-shell"
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
        <p class="card-heading sketch-card__title">
          {{ card.title }}
        </p>
      </div>
    </a>
  </article>
</template>

<script setup>
import { useAssetPathStore } from "@/stores/AssetPathStore.js"

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

const thumbnailSrc = assetStore.buildThumbUrl(props.card.image.thumbnail)
const altText = props.card?.image?.alt || props.card.title

const resolveAssetBySource = (path = "") => {
  if (props.assetSource === "chart") return assetStore.resolveChartAsset(path)
  return assetStore.resolveIllustrationAsset(path)
}

// if an external link is not provided, use the hosted asset for the section
const primaryLink = props.card.links.external
const assetLink = resolveAssetBySource(props.card?.links?.asset || "")
const targetUrl = primaryLink || assetLink || "#"
</script>

<style scoped>
.sketch-card {
  --card-border-radius: 1.2rem;
  break-inside: avoid;
  margin: 0 0 1.5rem;
  display: block;
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
