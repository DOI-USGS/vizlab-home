<template>
  <div>
    <!-- <WindowSize v-if="typeOfEnv === '-test build-'" /> -->
    <HeaderUSWDSBanner />
    <HeaderUSGS />
    <WorkInProgressWarning v-if="typeOfEnv !== ''" />
    <RouterView />
    <PreFooterCodeLinks />
    <FooterUSGS />
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import { useWindowSizeStore } from '@/stores/WindowSizeStore'

import HeaderUSWDSBanner from "@/components/HeaderUSWDSBanner.vue"
import HeaderUSGS from '@/components/HeaderUSGS.vue'
import WorkInProgressWarning from "@/components/WorkInProgressWarning.vue"
import PreFooterCodeLinks from "@/components/PreFooterCodeLinks.vue"
import FooterUSGS from '@/components/FooterUSGS.vue'

const windowSizeStore = useWindowSizeStore()
const typeOfEnv = import.meta.env.VITE_APP_TIER

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
})

function handleResize() {
  windowSizeStore.windowWidth = window.innerWidth
  windowSizeStore.windowHeight = window.innerHeight
}
</script>


<style scoped>
</style>
