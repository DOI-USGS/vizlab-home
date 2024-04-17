<template>
  <section id="visualization-container">
    <div class="text-container">
      <h1 class="title">Vue3 template</h1>
      <h2>svg import w/ d3-added interaction + v-for</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus rem eum quod. Facere ratione optio ipsa quaerat, animi aliquid harum quia unde et, labore, architecto veniam cumque temporibus voluptatem repellat!</p>
    </div>
    <div class="figure-container">
      <RegionalViolins />
    </div>
    <div class="text-container">
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit facere odio porro adipisci esse culpa. Maiores distinctio architecto nesciunt quos in deserunt ipsa nemo odit! Unde iste cupiditate amet nisi.</p>
      <h2>d3 bar chart from data</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dolor tenetur cumque deleniti provident. Officia dignissimos eveniet quos, quibusdam praesentium perspiciatis dolorum voluptate magni. At, voluptas dolorem. Voluptatum, natus explicabo.</p>
    </div>
    <div class="figure-container">
      <BarChartExample />
    </div>
    <div class="text-container">
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed aliquid a blanditiis debitis quasi mollitia molestias labore provident optio consequuntur. Odio iure adipisci magnam esse quis, minus commodi enim. Maxime.</p>
      <ReferencesSection />
      <AuthorshipSection />
    </div>
  </section>
</template>

<script setup>
  import ReferencesSection from '@/components/ReferencesSection.vue';
  import AuthorshipSection from '@/components/AuthorshipSection.vue';
  import RegionalViolins from '.././components/RegionalViolins.vue';
  import BarChartExample from '.././components/BarChartExample.vue';
</script>

<style scoped>
</style>