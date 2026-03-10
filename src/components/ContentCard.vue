<template>
  <li class="content-card">
    <article class="shell">
      <a
        class="main card-shell"
        :href="externalHref"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          class="image"
          aria-hidden="true"
        >
          <img
            :src="thumbnailSrc"
            :alt="imageAlt"
            loading="lazy"
          >
        </div>

        <div class="body">
          <h3 class="card-heading">
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
        class="action"
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
import { useAssetPathStore } from "@/stores/AssetPathStore.js"

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

.shell {
  position: relative;
  height: 100%;
  overflow: visible;
}

.main {
  --card-border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  text-decoration: none;
  color: inherit;
  border: 1px solid rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition:
    transform 200ms ease,
    box-shadow 200ms ease;
  min-height: 100%;
}

.main:hover,
.main:focus-visible,
.shell:hover .main,
.shell:focus-within .main {
  transform: translateY(-2px);
  box-shadow: 0 12px 20px var(--light-grey);
}

.image {
  position: relative;
  width: 100%;
  padding-top: v-bind(imagePadding);
  overflow: hidden;
  background: var(--light-grey);
}

.image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.body {
  padding: 0 1.6rem 1.6rem;
}

.action {
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

.action :deep(svg) {
  transition: color 0.2s ease, fill 0.2s ease;
}

.action:hover,
.action:focus-visible {
  color: var(--color-link);
}

.action:hover :deep(svg),
.action:focus-visible :deep(svg) {
  color: currentColor;
  fill: currentColor;
}

.main:hover + .action,
.main:focus-visible + .action,
.shell:hover .action,
.shell:focus-within .action {
  transform: translateY(-2px);
}

</style>
