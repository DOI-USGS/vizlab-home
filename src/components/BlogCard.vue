<template>
  <li class="blog-card">
    <article class="card">
      <a
        class="card-main"
        :href="blog.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="card-image" aria-hidden="true">
          <img
            :src="blog.img_src"
            :alt="imageAlt"
            loading="lazy"
          >
        </div>

        <div class="card-content">
          <div class="card-meta-row">
            <p v-if="blog.date" class="card-meta">
              {{ blog.date }}
            </p>
          </div>
          <h3 class="card-title">
            {{ blog.title }}
          </h3>
        </div>
      </a>
    </article>
  </li>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  blog: {
    type: Object,
    required: true
  }
})

const imageAlt = computed(() => props.blog?.img_alt || props.blog?.title)
</script>

<style scoped>
.blog-card {
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
    transform 20ms ease,
    box-shadow 20ms ease;
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
  padding-top: 100%;
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
  font-size: 1.9rem;
  font-weight: 600;
  line-height: 1.4;
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
</style>
