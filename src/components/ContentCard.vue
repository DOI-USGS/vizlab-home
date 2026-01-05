<template>
  <li class="content-card">
    <article class="card">
      <a
        class="card-main"
        :href="externalHref"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="card-image" aria-hidden="true">
          <img
            :src="thumbnailSrc"
            :alt="imageAlt"
            loading="lazy"
          >
        </div>

        <div class="card-content">
          <h3 class="card-title">
            {{ title }}
          </h3>
        </div>
      </a>
    </article>
  </li>
</template>

<script setup>
import { useAssetPathStore } from "@/stores/AssetPathStore.js"

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  imageRatio: {
    type: Number,
    default: 90
  }
})

const assetStore = useAssetPathStore()

const title = props.item.title
const externalHref = props.item.links.external

const thumbnail = props.item.image.thumbnail
const thumbnailSrc = assetStore.buildThumbUrl(thumbnail)
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
.card-main:focus-visible {
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
}

.card-content {
  padding: 0 1.6rem 1.6rem;
}

.card-title {
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.3;
}

</style>
