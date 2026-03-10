<template>
  <section
    :id="computedSectionId"
    class="content-section"
  >
    <div class="section-header section-header--with-controls">
      <div>
        <div>
          <h2
            :id="titleId"
            :data-section-anchor="computedSectionId"
          >
            <template v-if="linkTitle">
              <a
                class="section-title-link"
                :href="`#${titleId}`"
              >
                {{ titleText }}
              </a>
            </template>
            <template v-else>
              <span class="section-title-link section-title-link--static">
                {{ titleText }}
              </span>
            </template>
          </h2>
        </div>
        <p
          v-if="summary"
        >
          {{ summary }}
        </p>
      </div>

      <div
        v-if="availableTags.length"
        class="section-controls section-controls--wrap"
      >
        <div class="tag-filter">
          <button
            class="ui-button ui-button--chip"
            :class="{ active: !selectedTag }"
            type="button"
            @click="selectTag(null)"
          >
            All
          </button>
          <button
            v-for="tag in availableTags"
            :key="tag"
            class="ui-button ui-button--chip"
            :class="{ active: selectedTag === tag }"
            type="button"
            @click="selectTag(tag)"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="filteredCards.length"
      class="sketch-grid-container"
      :class="{
        'sketch-grid-container--fade': shouldFade,
        'sketch-grid-container--full': isExpanded
      }"
    >
      <div class="sketch-grid">
        <SketchCard
          v-for="item in filteredCards"
          :key="item.id"
          :card="item"
          :asset-source="assetSource"
        />
      </div>
    </div>

    <div
      v-if="showExpandToggle"
      class="section-footer section-footer--expand"
    >
      <button
        class="ui-button ui-button--disclosure"
        :class="{ active: expanded }"
        type="button"
        :aria-expanded="expanded.toString()"
        @click="toggleExpanded"
      >
        <span>{{ expanded ? "Show Less" : "Show more" }}</span>
        <span aria-hidden="true">{{ expanded ? "−" : "+" }}</span>
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue"
import SketchCard from "@/components/SketchCard.vue"

const props = defineProps({
  id: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    default: ""
  },
  summary: {
    type: String,
    default: ""
  },
  items: {
    type: Array,
    default: () => []
  },
  assetSource: {
    type: String,
    default: "illustration"
  },
  showDetailLink: {
    type: Boolean,
    default: true
  },
  linkTitle: {
    type: Boolean,
    default: true
  },
  disableFade: {
    type: Boolean,
    default: false
  }
})

const computedSectionId = computed(() => props.id || "sketches")
const titleId = computed(() => `${computedSectionId.value}`)
const titleText = computed(() => props.title || "")
const summary = computed(() => props.summary)

const cards = computed(() => (props.items || []).filter((item) => !item?.archive))
const selectedTag = ref(null)
const expanded = ref(false)

const availableTags = computed(() => {
  const tags = new Set()
  cards.value.forEach((item) => {
    item.tags?.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
})

const filteredCards = computed(() => {
  if (!selectedTag.value) return cards.value
  return cards.value.filter((card) => card.tags?.includes(selectedTag.value))
})

const hasOverflow = computed(() => !props.disableFade && filteredCards.value.length > 6)
const isExpanded = computed(() => props.disableFade || expanded.value)
const shouldFade = computed(() => hasOverflow.value && !isExpanded.value)
const showExpandToggle = computed(() => props.showDetailLink && hasOverflow.value)

const selectTag = (tag) => {
  selectedTag.value = tag
  expanded.value = false
}

const toggleExpanded = () => {
  expanded.value = !expanded.value
}
</script>

<style scoped>
.section-header {
  margin-bottom: 0;
}

.sketch-grid-container {
  position: relative;
  max-height: 75rem;
  overflow: hidden;
}

.sketch-grid {
  column-count: 2;
  column-gap: 0.75rem;
}

.sketch-grid-container--fade::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 8rem;
  pointer-events: none;
  background: linear-gradient(to bottom, rgba(245, 246, 248, 0), var(--color-background));
}

.sketch-grid-container--full {
  max-height: none;
  overflow: visible;
}

.sketch-grid-container--full::after {
  display: none;
}

.tag-filter {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

@media (max-width: 960px) {
  .section-header--with-controls {
    gap: 0;
  }
}

@media (min-width: 961px) {
  .sketch-grid {
    column-count: 3;
  }
}
</style>
