# vue3-template

This project serves as a template for our site builds. It uses Vue 3 and Vite (currently version 5), and is configured to be built from GitLab using Jenkins.

## To build the website locally
Clone the repo. In the directory, run `npm install` to install the required modules. This repository requires `npm v20` to run. If you are using a later version of `npm`, you may [try using `nvm` to manage multiple versions of npm](https://betterprogramming.pub/how-to-change-node-js-version-between-projects-using-nvm-3ad2416bda7e).

Once the dependencies have been installed, run `npm run dev` to run locally from your browser.

## Project name handling
The environment variable `VITE_APP_TITLE` (set in `'.env'`) is a key variable. **The value for `VITE_APP_TITLE` must match the repo name** (here `vue3-template`). Note that our repo naming convention is to use dashes ('-') instead of underscores ('_') to separate words, as it looks better in the final url. 

The value for `name` in `'package.json'` should be set to match `VITE_APP_TITLE`. 

This `VITE_APP_TITLE` parameter also needs to be set up as a parameter in the Jenkins configuration (in the `'jenkins/Jenkinsfile.build'` file). Once set up, it will be used to set all of the build paths used in `'Jenkinsfile.build'` and `'Dockerfile'`, including the rep url (`"https://github.com/usgs-vizlab/${params.VITE_APP_TITLE}.git"`, or `"https://github.com/DOI-USGS/${params.VITE_APP_TITLE}.git"`) and website extension (`labs.waterdata.usgs.gov/visualizations/{VITE_APP_TITLE}`). 

`VITE_APP_TITLE` is also used to set the base path for the vite build in `'vite.config.mjs'`. 

It is also used to configure the metadata in `'index.html'`. 

The environment variables `VITE_APP_LONG_TITLE` and `VITE_APP_DESCRIPTION` are also used to configure the metadata.

When preparing to migrate a repo built from this template to DGEC, the name of the GitHub repo (`vizlab-{project_name}`) in the DGEC required files `'code.json'` and `'CONTRIBUTING.md'` will need to be updated, so that the value of `VITE_APP_TITLE` is used to replace `{project_name}`, e.g., a `VITE_APP_TITLE` of `vue3-template` would mean a GitHub repo named `vizlab-vue3-template`

## New Vue syntax for components
Vue syntax has changed with the shift to Vue 3. We can now use the `<script setup>` composition API syntax to build our components, which requires less boilerplate. See the [`<script setup>` guide](https://vuejs.org/api/sfc-script-setup.html). Any top-level defined variables or imported components are directly available for use in the `<template>`. Components now no longer need to be explicitly named, and can be imported directly by name using the filename, e.g. `import HeaderUSWDSBanner from "./components/HeaderUSWDSBanner.vue"`.

## Jenkins setup
The Jenkins setup has been adjusted slightly to use the new `VITE_{}` environment variables. Note that the website extension template set up in `'jenkins/Jenkinsfile.build'` points to GitLab (`labs.waterdata.usgs.gov/visualizations/{VITE_APP_TITLE}`). This works with our new development workflow, where repos are developed on GitLab and mirrored to GitHub (e.g., ['vizlab-bottled-water'](https://github.com/DOI-USGS/vizlab-bottled-water)) once reviewed, but for old products that are hosted entirely on GitHub (e.g., [what-is-drought](https://github.com/DOI-USGS/what-is-drought)) and must be built from the GitHub repo, the beginning of this url needs to be revised to point to GitHub instead of GitLab (e.g., `"https://github.com/usgs-vizlab/${params.VITE_APP_TITLE}.git"`, or `"https://github.com/DOI-USGS/${params.VITE_APP_TITLE}.git"`).

## Example components
At the moment this repo contains two example components, both of which use `D3`. 
  * `RegionalViolins.vue` pulls in part of the regional section from [Drought timeline](https://labs.waterdata.usgs.gov/visualizations/drought-timeline/index.html#/). Here, a R-generated svg is loaded into the component, and `D3` is used to layer on interaction, showing and hiding map images and violin charts for different regions. The images were added using a `v-for` pattern and dynamic filepath urls. This component also has a mobile-specific layout.
  * `BarChartExample.vue` pulls in the water bottling facility bar chart and state dropdown from [Bottled water](https://labs.waterdata.usgs.gov/visualizations/bottled-water/index.html). It loads in a csv and uses it to build an updating `D3` bar chart.

## Steps when using as template for new project
When setting up a new project you'll need to take the following steps:
 
1. Update project-specific environment variables, titles, and paths
    * [ ] Update `VITE_APP_TITLE`, `VITE_APP_LONG_TITLE`, `VITE_APP_DESCRIPTION`, and `VITE_APP_GITHUB_REPOSITORY_LINK`, in `'.env'`
    * [ ] Update `"name"` in `'package.json'`
    * [ ] Update project name parameter (line 11) in `'jenkins/Jenkinsfile.build'`
    * [ ] Update `userRemoteConfigs` repo `url` in `'jenkins/Jenkinsfile.build'`
2. Delete example components
    * [ ] Delete `'src/components/BarChartExample.vue'`
    * [ ] Delete `'src/components/RegionalViolins.vue'`
3. Update project-specific attributions and references
    * [ ] Update `'src/text/authors.js'` to list project authors
    * [ ] Update `'src/text/references.js'` to list project references
6. Update README.md for project
7. 
 
