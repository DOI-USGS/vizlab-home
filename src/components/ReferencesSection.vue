<template>
  <section id="references">       
    <div class="text-content">
      <h2>References</h2>
      <div>
        <div
          v-for="reference in references.references"
          :key="reference.num"
        >
          <p>
            <span v-html="reference.num" />. <span v-html="reference.authors" /> (<span v-html="reference.year" />) <a
              :href="reference.link"
              target="_blank"
            ><span v-html="reference.title" /></a>. <span v-html="reference.ref" />
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import references from "@/assets/text/references";
</script>

<style scoped lang="scss">
</style>