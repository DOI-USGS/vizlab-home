# vue3-template

This project serves as a template for our site builds. It uses Vue 3 and Vite (currently version 5), and is configured to be built from GitLab using Jenkins.

## To build the website locally
Clone the repo. In the directory, run `npm install` to install the required modules. This repository requires `npm v20` to run. If you are using a later version of `npm`, you may [try using `nvm` to manage multiple versions of npm](https://betterprogramming.pub/how-to-change-node-js-version-between-projects-using-nvm-3ad2416bda7e).

Once the dependencies have been installed, run `npm run dev` to run locally from your browser.

## Project name handling
The environment variable `VITE_APP_TITLE` (set in `'.env'`) is a key variable. **The value for `VITE_APP_TITLE` must match the repo name** (here `vue3-template`). Note that our repo naming convention is to use dashes ('-') instead of underscores ('_') to separate words, as it looks better in the final url. 

The value for `name` in `'package.json'` should be set to match `VITE_APP_TITLE`. 

This `VITE_APP_TITLE` parameter also needs to be set up as a parameter in the Jenkins configuration (in the `'jenkins/Jenkinsfile.build'` file). Once set up, it will be used to set all of the build paths used in `'Jenkinsfile.build'` and `'Dockerfile'`, including the repo url (`"https://code.usgs.gov/wma/vizlab/${params.VITE_APP_TITLE}.git"`, or `"https://github.com/DOI-USGS/${params.VITE_APP_TITLE}.git"`) and website extension (`labs.waterdata.usgs.gov/visualizations/{VITE_APP_TITLE}`). 

`VITE_APP_TITLE` is also used to set the base path for the vite build in `'vite.config.mjs'`. 

It is also used to configure the metadata and to set the path for the meta tag image in `'index.html'`. 

The environment variables `VITE_APP_LONG_TITLE` and `VITE_APP_DESCRIPTION` are also used to configure the metadata.

When preparing to migrate a repo built from this template to DGEC, the name of the GitHub repo (`vizlab-{project_name}`) in the DGEC required files `'code.json'` and `'CONTRIBUTING.md'` will need to be updated, so that the value of `VITE_APP_TITLE` is used to replace `{project_name}`, e.g., a `VITE_APP_TITLE` of `vue3-template` would mean a GitHub repo named `vizlab-vue3-template`

## New Vue syntax for components
This website template uses Vue 3 and the `<script setup>` composition API syntax to build components, which requires less boilerplate. See the [`<script setup>` guide](https://vuejs.org/api/sfc-script-setup.html). Any top-level defined variables or imported components are directly available for use in the `<template>`. Components now no longer need to be explicitly named, and can be imported directly by name using the filename, e.g. `import HeaderUSWDSBanner from "./components/HeaderUSWDSBanner.vue"`.

## Jenkins setup
The Jenkins setup has been adjusted slightly to use the new `VITE_{}` environment variables. Note that the website extension template set up in `'jenkins/Jenkinsfile.build'` points to GitLab (`labs.waterdata.usgs.gov/visualizations/{VITE_APP_TITLE}`). This works with our new development workflow, where repos are developed on GitLab and mirrored to GitHub (e.g., ['vizlab-bottled-water'](https://github.com/DOI-USGS/vizlab-bottled-water)) once reviewed, but for old products that are hosted entirely on GitHub (e.g., [what-is-drought](https://github.com/DOI-USGS/what-is-drought)) and must be built from the GitHub repo, the beginning of this url needs to be revised to point to GitHub instead of GitLab (e.g., `"https://github.com/usgs-vizlab/${params.VITE_APP_TITLE}.git"`, or `"https://github.com/DOI-USGS/${params.VITE_APP_TITLE}.git"`). Instructions for setting up the website build on Jenkins are [here](https://doimspp.sharepoint.com/:w:/r/sites/IIDDStaff/Shared%20Documents/Function%20-%20Vizlab/Process%20Guides/Jenkins_GitLab_WebsiteBuild.docx?d=w8fea5277ecbc40579de24656284bc3e8&csf=1&web=1&e=7w38oB). Hayley or Cee should complete this step.

## Example components
At the moment this repo contains two example components, both of which use `D3`. 
  * `RegionalViolins.vue` pulls in part of the regional section from [Drought timeline](https://labs.waterdata.usgs.gov/visualizations/drought-timeline/index.html#/). Here, a R-generated svg is loaded into the component, and `D3` is used to layer on interaction, showing and hiding map images and violin charts for different regions. The images were added using a `v-for` pattern and dynamic filepath urls. This component also has a mobile-specific layout.
  * `BarChartExample.vue` pulls in the water bottling facility bar chart and state dropdown from [Bottled water](https://labs.waterdata.usgs.gov/visualizations/bottled-water/index.html). It loads in a csv and uses it to build an updating `D3` bar chart.

## Steps when using as template for new project
When setting up a new project you'll need to take the following steps:
 
1. Update project-specific environment variables, titles, and paths
    * [ ] Update `VITE_APP_TITLE`, `VITE_APP_LONG_TITLE`, `VITE_APP_DESCRIPTION`, and `VITE_APP_GITHUB_REPOSITORY_LINK`, in `'.env'`. Be sure to read [the section on project name handling](#project-name-handling), above.
    * [ ] Update `"name"` in `'package.json'`.
    * [ ] Update project name parameter (line 11) in `'jenkins/Jenkinsfile.build'`
    * [ ] Update `userRemoteConfigs` repo `url` in `'jenkins/Jenkinsfile.build'`
    * [ ] Update the `{project-name}` variable throughout the DGEC required files `'code.json'` and `'CONTRIBUTING.md'`, using the value of `VITE_APP_TITLE` to replace `{project_name}`
      * [ ] Note that the template repo urls provided in these files follow the convention we use when repos are mirrored from GitLab to GitHub, where the GitLab repo name (identical to `%VITE_APP_TITLE%`) is prefixed with `vizlab-`, e.g., `"https://github.com/DOI-USGS/vizlab-{project_name}.git"`.
2. Delete example components and remove them from the site
    * [ ] Delete `'src/components/BarChartExample.vue'` and `'public/state_facility_type_summmary.csv'`
    * [ ] Delete `'src/components/RegionalViolins.vue'`, the 16 associated `'.png'` files in `'src/assets/images'`, and the two `'.svg'` files in `'src/assets/svgs'`
    * [ ] In `'src/views/VisualizationView.vue'` delete the import statements for both components in the `<script setup>` section and the references to the components in the html `<template>`
3. Update project-specific attributions and references
    * [ ] Update content of `'src/text/authors.js'` to list project authors. Do not edit the structure of this file
    * [ ] Update content of `'src/text/references.js'` to list project references. Do not edit the structure of this file
    * [ ] List contributors in `'index.html'`
    * [ ] Update keywords in `'index.html'`
4. Update README.md for project. Be sure that it is presentable to the public - minimally include project overview and build instructions.
5. Consult the [Vizlab website release checklist](https://doimspp.sharepoint.com/:w:/r/sites/IIDDStaff/_layouts/15/Doc2.aspx?action=edit&sourcedoc=%7B3c0899c4-cc87-4c82-a7e2-3f8e78439083%7D&wdOrigin=TEAMS-MAGLEV.teamsSdk_ns.rwc&wdExp=TEAMS-TREATMENT&wdhostclicktime=1714053079214&web=1) for more development guidelines related to compliance, performance testing, analytics, and public release. Key steps that relate to template content include:
    * [ ] To work with the template set up in `'index.html'`, the meta card image for the site must be saved as a `.webp` image to the _prod_ `S3` bucket in the following location: `visualizations/images/%VITE_APP_TITLE%_metacard.webp`, e.g., `visualizations/images/vue3-template_metacard.webp`.
    * [ ] Once known, be sure to add the release date to `'index.html'` - the `datePublished` attribute in the metadata.
    * [ ] Before migration to DGEC, update `'code.json'` to have `"status": "Production"` and to specify the `"metadataLastUpdated"` date.
    * [ ] After migration to DGEC, update the `version` attribute in `'package.json'` to match the release version on _GitHub_. Push the change to the repo on _GitLab_. The change will be mirrored to the repo on GitHub.
 
## Notes for development when using this template
1. Please do not delete or make any modifications to the following components/files:
    * The `node_modules` directory
    * `'public/favicon.ico'`
    * In `'src/assets'`:
      * The USGS Viz ID Stylesheets in `'src/assets/css'`:
        * `'common.css'`
        * `'custom.css'` 
      * The contents of the `'src/assets/usgsHeaderAndFooter'` directory
    * In `'src/components/'`
        * `'AuthorshipSection.vue'`
        * `'FooterUSGS.vue'`
        * `'HeaderUSGS.vue'`
        * `'HeaderUSWDSBanner.vue'`
        * `'PreFooterCodeLinks.vue'`
        * `'ReferencesSection.vue'`
        * `'WindowSize.vue'`
        * `'WorkInProgressWarning.vue'`
    * `'src/router/index.js'`
    * `'src/stores/WindowSizeStore.js'`
    * `'src/views/Error404Page.vue'`
    * `'src/App.vue'`
    * `'.env.beta_tier'`
    * `'.env.prod_tier'`
    * `'.env.test_tier'`
    * `'.eslintrc.cjs'`
    * `'.prettierrc.json'`
    * `'build.sh'`
    * `'CODE_OF_CONDUCT.md'`
    * `'DISCLAIMER.md'`
    * `'Dockerfile'`
    * `'LICENSE.md'`
    * `'package-lock.json'` _Note: will be modified indirectly by edits to `'package.json'`, and should be committed and pushed, but should not be edited directly_
2. The following files should have only limited edits, as specified in [Steps when using as template for new project](#steps-when-using-as-template-for-new-project), above:
    * `'jenkins/Jenkinsfile.build'`
    * In `'src/assets/text'`:
      * `'authors.js'`
      * `'references.js'`
    * `'.env'`
    * `'code.json'`
    * `'contributing.md'`
    * `'index.html'` (will also need to edit to modify analytics setup, per the [Vizlab website release checklist](https://doimspp.sharepoint.com/:w:/r/sites/IIDDStaff/_layouts/15/Doc2.aspx?action=edit&sourcedoc=%7B3c0899c4-cc87-4c82-a7e2-3f8e78439083%7D&wdOrigin=TEAMS-MAGLEV.teamsSdk_ns.rwc&wdExp=TEAMS-TREATMENT&wdhostclicktime=1714053079214&web=1))
    * `'package.json'` (may need additional edits if more packages are needed, see 3., below) 
3. Depending on what visualization tools you are using, you may need to add additional packages, which will require edits to some or all of the following files (reach out to Hayley with questions):
    * `'package.json'`
    * `'src/main.js'` 
    * `'vite.config.mjs'`. 

4.  Any edits to `'package.json'` will require re-running `npm install`, which will update `'package-lock.json'`. **Be sure to commit and push any changes to `'package-lock.json'`**.
5.  Development conventions/best practices
    * Use existing folder structure for assets - e.g., images in `'src/assets/images'`, svgs in `'src/assets/svgs'`.
    * Place data files (e.g., `.csv` or `.json` files) in the `public` directory.
    * Page styling with `css`
      * Import all fonts and set **global css color variables** and body and html element styling (including **global font sizing**) in `'src/assets/css/base.css'`
        * Note that we use a [fixed `:root` font size of `62.5%`](https://blog.hubspot.com/website/css-rem#:~:text=By%20setting%20the%20root%20font,%2C%20and%202.0rem%2C%20respectively.), and all `css` font sizes should be specified in units of `rem`, where `1 rem` is equivalent `10 px`.
      * Use `'main.css'` for global page content styling that is exclusive of the USGS header and footer and is not component-specific (e.g., defining styles for standard text or figure container `<div>` elements, styling all section titles, etc.). For all colors, remember to reference color variables set in `'src/assets/css/base.css'`, e.g., `color: var(--color-title-text);`
      * Put component-specific styling in the `<style>` tags of specific components. Again, for all colors, remember to reference color variables set in `'src/assets/css/base.css'`, e.g., `color: var(--color-title-text);`
    * Page text setup
      * TBD 
    * Class and ID naming conventions
      * TBD
    * JavaScript conventions
      * TBD  
6.  Import and use any new components in `src/views/VisualizationView.vue`, and import subcomponents directly in components.