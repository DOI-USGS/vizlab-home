<template>
  <section
    :id="sectionId"
    class="content-section"
  >
    <div class="section-header section-header--with-controls">
      <div>
        <h2
          :id="titleId"
          :data-section-anchor="sectionId"
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
        <p
          v-if="summary"
          class="section-summary"
        >
          {{ summary }}
        </p>
      </div>

      <div
        v-if="availableTags.length"
        class="section-controls section-controls--wrap"
      >
        <div class="chip-row">
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
      class="masonry"
      :class="{
        'is-faded': shouldFade,
        'is-open': isExpanded
      }"
    >
      <div class="masonry-grid">
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

const sectionId = props.id || "sketches"
const titleId = sectionId
const titleText = props.title || ""
const summary = props.summary

const cards = (props.items || []).filter((item) => !item?.archive)
const selectedTag = ref(null)
const expanded = ref(false)

const availableTags = computed(() => {
  const tags = new Set()
  cards.forEach((item) => {
    item.tags?.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
})

const filteredCards = computed(() => {
  if (!selectedTag.value) return cards
  return cards.filter((card) => card.tags?.includes(selectedTag.value))
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
.masonry {
  position: relative;
  max-height: 75rem;
  overflow: hidden;
}

.masonry-grid {
  column-count: 2;
  column-gap: 0.75rem;
}

.masonry.is-faded::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 8rem;
  pointer-events: none;
  background: linear-gradient(to bottom, rgba(245, 246, 248, 0), var(--color-background));
}

.masonry.is-open {
  max-height: none;
  overflow: visible;
}

.masonry.is-open::after {
  display: none;
}

@media (min-width: 961px) {
  .masonry-grid {
    column-count: 4;
  }
}
</style>
