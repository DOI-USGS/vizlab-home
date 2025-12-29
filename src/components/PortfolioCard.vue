<template>
  <li class="portfolio-card">
    <article class="card">
      <a
        class="card-main"
        :href="productHref"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="card-image" aria-hidden="true">
          <img
            :src="thumbnail"
            :alt="altText"
            loading="lazy"
          >
        </div>
        <div class="card-content">
          <div class="card-meta-row">
            <p v-if="released" class="card-meta">
              {{ released }}
            </p>

            <!-- <a
              v-if="codeHref"
              class="code-link inline"
              :href="codeHref"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`View the code for ${title}`"
              @click.stop
            >
              <font-awesome-icon :icon="['fas', 'code']" />
            </a> -->
          </div>

          <h3 class="card-title">
            {{ title }}
          </h3>
        </div>
      </a>
    </article>
  </li>
</template>

<script setup>
const base_url = (import.meta.env.VITE_APP_S3_PROD_URL)

const props = defineProps({
  viz: {
    type: Object,
    required: true
  }
})

const { title, released, alt, productUrl, codeUrl, thumb } = props.viz

const productHref = productUrl ?? "#"
const codeHref = codeUrl ?? ""
const altText = alt ?? title

const thumbnail = (() => {
  return `${base_url}thumbnails/${thumb}`
})()
</script>

<style scoped>
.portfolio-card {
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
  padding-top: 90%;
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

.card-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
}

.card-meta {
  font-size: 1.4rem;
  color: var(--medium-grey);
  margin-bottom: 0.4rem;
}

.code-link {
  color: inherit;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  color: var(--medium-grey);
  transition: transform 150ms ease, border-color 150ms ease;
}
</style>
