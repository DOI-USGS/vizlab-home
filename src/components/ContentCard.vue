<template>
  <li class="content-card">
    <article class="card">
      <a
        class="card-main"
        :href="externalHref"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          class="card-image"
          aria-hidden="true"
        >
          <img
            :src="resolvedThumbnail"
            :alt="imageAlt"
            loading="lazy"
            @load="handleThumbLoad"
            @error="handleThumbError"
          >
          <span
            v-if="thumbError"
            class="card-image__fallback"
          >
            Image unavailable
          </span>
        </div>

        <div class="card-content">
          <h3 class="card-title">
            {{ title }}
          </h3>
          <p
            v-if="showReleaseDate && releaseDate"
            class="card-meta"
          >
            {{ releaseDate }}
          </p>
        </div>
      </a>
      <a
        v-if="codeHref"
        class="card-action"
        :href="codeHref"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`View ${title} code on GitHub`"
      >
        <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'github' }" />
      </a>
    </article>
  </li>
</template>

<script setup>
import { computed } from "vue"
import { useAssetPathStore } from "@/stores/AssetPathStore.js"
import { useImageLoader } from "@/composables/useImageLoader.js"

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  imageRatio: {
    type: Number,
    default: 100
  },
  showReleaseDate: {
    type: Boolean,
    default: false
  }
})

const assetStore = useAssetPathStore()

const title = props.item.title
const externalHref = props.item.links.external
const codeHref = props.item.links?.code
const releaseDate = props.item.released
const showReleaseDate = props.showReleaseDate

const thumbnailSrc = computed(() => assetStore.buildThumbUrl(props.item.image.thumbnail))
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
const imageAlt = props.item.image.alt || title

const imagePadding = `${props.imageRatio}%`
</script>

<style scoped>
.content-card {
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100%;
}

.card {
  position: relative;
  height: 100%;
  overflow: visible;
}

.card-main {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  text-decoration: none;
  color: inherit;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 0.8rem;
  overflow: hidden;
  background: var(--color-background, #fff);
  transition:
    transform 200ms ease,
    box-shadow 200ms ease;
  min-height: 100%;
}

.card-main:hover,
.card-main:focus-visible,
.card:hover .card-main,
.card:focus-within .card-main {
  transform: translateY(-2px);
  box-shadow: 0 12px 20px var(--light-grey);
}

.card-image {
  position: relative;
  width: 100%;
  padding-top: v-bind(imagePadding);
  overflow: hidden;
  background: var(--light-grey);
}

.card-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-image__fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  text-align: center;
  color: var(--black-400);
  padding: 1rem;
}

.card-content {
  padding: 0 1.6rem 1.6rem;
}

.card-title {
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.3;
}

.card-meta {
  margin: 0.4rem 0 0;
  color: var(--black-400);
  font-size: 1.4rem;
  padding-bottom: 0;
}

.card-action {
  position: absolute;
  bottom: 1.2rem;
  right: 1.2rem;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: inherit;
  text-decoration: none;
  transition:
    color 0.2s ease,
    transform 150ms ease;
  box-shadow: none;
}

.card-action :deep(svg) {
  transition: color 0.2s ease, fill 0.2s ease;
}

.card-action:hover,
.card-action:focus-visible {
  color: var(--color-link);
}

.card-action:hover :deep(svg),
.card-action:focus-visible :deep(svg) {
  color: currentColor;
  fill: currentColor;
}

.card-main:hover + .card-action,
.card-main:focus-visible + .card-action,
.card:hover .card-action,
.card:focus-within .card-action {
  transform: translateY(-2px);
}

</style>
