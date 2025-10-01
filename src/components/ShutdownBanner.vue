<template>
  <div class="usa-prose">
    <p
      class="warning-open"
    >
      <Strong>
        Due to a lapse in government funding, this website is not currently being updated. For more information please visit: 
        <a 
          href="https://www.doi.gov/shutdown"
          target="_blank"
        >
          www.doi.gov/shutdown
        </a>
        .
      </Strong>
    </p>
  </div>
</template>

<script>
    export default {
        name: 'ShutdownBanner',
    }
</script>

<style scoped lang="scss">
  .usa-prose {
    background-color: #ffffff;
    color: #000000;
    padding-bottom: 0.3em;
    padding-top: 0.3em;
    p {
      max-width: 60em;
      text-align: center;
      margin: 0 auto;
      font-size: 20px;
    }
    a {
      font-size: 20px;
    }
  }
</style>
