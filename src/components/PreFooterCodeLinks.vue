<template>
  <div id="code-repository-link-container">
    <a
      :href="gitHubRepositoryLink"
      target="_blank"
      aria-label="github link"
    >Get the code behind this site
      <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'github' }" />
    </a>
  </div>
</template>

<script>
  export default {
      name: 'PreFooterCodeLinks',
      data() {
          return {
              gitHubRepositoryLink: import.meta.env.VUE_APP_GITHUB_REPOSITORY_LINK
          }
      }
  }

</script>

<style scoped lang="scss">
$nearBlack: #181a1a;
  #code-repository-link-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: auto;
    background-color: $nearBlack;
    margin: 0 auto;
    padding: 0.4rem;
    a {
      color: white;
      font-family: 'Source Sans Pro',sans-serif;
      font-size: 14px;
      text-decoration: none
    }
  }

</style>
