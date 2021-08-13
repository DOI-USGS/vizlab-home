<template>
    <div id="portfolio-container">
        <h2>This is a test!</h2>
    </div>
</template>

<script>
    // make sure that the prop for the viz cards is passed in, not sure if this needs to be imported or piped
   
   export default {
        name: 'PortfolioCards'
    }
</script>

<style>
    #portfolio-container { 
        height: 50vh;
        width: 100%;
        background-color: orchid;
        text-align: center;
    }
</style>