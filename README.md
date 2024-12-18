# {app_long_title}

> _A newer version of the software may be available. See https://code.usgs.gov/wma/vizlab/{app_title}/-/releases to view all releases._

This repo uses ... to build a data visualization website about ...

**The data visualization website can be viewed at [https://labs.waterdata.usgs.gov/visualizations/{app_title}](https://labs.waterdata.usgs.gov/visualizations/{app_title}).**

## Building the website locally

Clone the repo. In the directory, run `npm install` to install the required modules. Once the dependencies have been installed, run `npm run dev` to run locally from your browser.

To build the website locally you'll need `npm v20` and `node v8.1` or higher installed. To manage multiple versions of `npm`, you may [try using `nvm`](https://betterprogramming.pub/how-to-change-node-js-version-between-projects-using-nvm-3ad2416bda7e).

## Citation

{Authors}. {Year}. {Website title}. U.S. Geological Survey software release. Reston, VA. [https://doi.org/{doi_of official_software_release}](https://doi.org/{doi_of_official_software_release})

## Consulting subject matter experts
Person X, person Y, and person Z consulted on the development of this website as subject matter experts.

## Additional information
* We welcome contributions from the community. See the [guidelines for contributing](https://github.com/DOI-USGS/{app_title}/) to this repository on GitHub.
* [Disclaimer](https://code.usgs.gov/wma/vizlab/{app_title}/-/blob/main/DISCLAIMER.md)
* [License](https://code.usgs.gov/wma/vizlab/{app_title}/-/blob/main/LICENSE.md)

# vue3-template [DELETE THIS SECTION AND ALL BELOW CONTENT BEFORE RELEASE]

This project serves as a template for our site builds. It uses Vue 3 and Vite (currently version 5), and is configured to be built from GitLab using Jenkins.

## To build the website locally
Clone the repo. In the directory, run `npm install` to install the required modules. This repository requires `npm v20` to run. If you are using a later version of `npm`, you may [try using `nvm` to manage multiple versions of npm](https://betterprogramming.pub/how-to-change-node-js-version-between-projects-using-nvm-3ad2416bda7e).

Once the dependencies have been installed, run `npm run dev` to run the site locally from your browser.

## Project name handling
The environment variable `VITE_APP_TITLE` (set in `'.env'`) is a key variable. **The value for `VITE_APP_TITLE` must match the repo name** (here `vue3-template`). Note that our repo naming convention is to use dashes ('-') instead of underscores ('_') to separate words, as it looks better in the final url. 

The value for `name` in `'package.json'` should be set to match `VITE_APP_TITLE`. 

This `VITE_APP_TITLE` parameter also needs to be set up as a parameter in the Jenkins configuration (in the `'jenkins/Jenkinsfile.build'` file). Once set up, it will be used to set all of the build paths used in `'Jenkinsfile.build'` and `'Dockerfile'`, including the repo url (`"https://code.usgs.gov/wma/vizlab/${params.VITE_APP_TITLE}.git"`, or `"https://github.com/DOI-USGS/${params.VITE_APP_TITLE}.git"`) and website extension (`labs.waterdata.usgs.gov/visualizations/{VITE_APP_TITLE}`). 

`VITE_APP_TITLE` is also used to set the base path for the vite build in `'vite.config.mjs'`. 

It is also used to configure the metadata and to set the path for the meta tag image in `'index.html'`. 

The environment variables `VITE_APP_LONG_TITLE` and `VITE_APP_DESCRIPTION` are also used to configure the metadata.

When preparing to migrate a repo built from this template to DGEC, the name of the GitHub repo (`{app_title}`) in the DGEC required files `'code.json'` and `'CONTRIBUTING.md'` will need to be updated, so that the value of `VITE_APP_TITLE` is used to replace `{app_title}`. The `VITE_APP_GITHUB_REPOSITORY_LINK` environment variable specified in `.env` must reflect the name of the GitHub repo, e.g., `'https://github.com/DOI-USGS/vue3-template'`.

## New Vue syntax for components
This website template uses Vue 3 and the `<script setup>` composition API syntax to build components, which requires less boilerplate. See the [`<script setup>` guide](https://vuejs.org/api/sfc-script-setup.html). Any top-level defined variables or imported components are directly available for use in the `<template>`. Components now no longer need to be explicitly named, and can be imported directly by name using the filename, e.g. `import HeaderUSWDSBanner from "./components/HeaderUSWDSBanner.vue"`.

## Jenkins setup
The Jenkins setup has been adjusted slightly to use the new `VITE_{}` environment variables. Note that the website extension template set up in `'jenkins/Jenkinsfile.build'` (the `url` parameter specified for `userRemoteConfigs`) points to GitLab (`labs.waterdata.usgs.gov/visualizations/{VITE_APP_TITLE}`). This works with our new development workflow, where repos are developed on GitLab and mirrored to GitHub (e.g., ['vizlab-bottled-water'](https://github.com/DOI-USGS/vizlab-bottled-water)) once reviewed, but for old products that are hosted entirely on GitHub (e.g., [what-is-drought](https://github.com/DOI-USGS/what-is-drought)) and must be built from the GitHub repo, the beginning of this url needs to be revised to point to GitHub instead of GitLab (e.g., `"https://github.com/usgs-vizlab/${params.VITE_APP_TITLE}.git"`, or `"https://github.com/DOI-USGS/${params.VITE_APP_TITLE}.git"`) AND the `credentialsId` parameter to `userRemoteConfigs` should be deleted. Instructions for setting up the website build on Jenkins are [here](https://doimspp.sharepoint.com/:w:/r/sites/IIDDStaff/Shared%20Documents/Function%20-%20Vizlab/Process%20Guides/Jenkins_GitLab_WebsiteBuild.docx?d=w8fea5277ecbc40579de24656284bc3e8&csf=1&web=1&e=7w38oB). Hayley or Cee should complete this step.

## Template components
This repo contains two template components, which can be used to structure page content. Template components can be used repeatedly and can easily be customized by passing content into the templates:
  * `'SectionTitle.vue'` adds full-width banner section titles with background images. It is imported in `'VisualizationView.vue'` and is used multiple times to add section titles. The content for the titles is specified in `'src/assets/text/text.js'` and is dynamically passed to the `'SectionTitle.vue'` template in `'VisualizationView.vue'`.
  * `'VizSection.vue'` sets up a simple structure for a page section, with template slots for a heading, text paragraphs, a figure, and a figure caption. The template is designed to be flexible - each element is optional. A fully custom figure can be inserted into the figure slot (as in the `'BarChartExample.vue'` and `'RegionalViolins.vue'` example components), or you can make use of existing custom classes to place figures or images (as in the `'IntroSection.vue'` example component). Note that `'VizSection.vue'` is imported directly in the components that make use of it, and is not imported directly in `'VisualizationView.vue'`.

## Example components
At the moment this repo contains three example components, two of which use `D3`. 
  * `'IntroSection.vue'` is a simple example component that demonstrates how to make use of the `'VizSection.vue'` and `'SectionTitle.vue'` template components.
  * `'RegionalViolins.vue'` pulls in part of the regional section from [Drought timeline](https://labs.waterdata.usgs.gov/visualizations/drought-timeline/index.html#/). Here, a R-generated svg is loaded into the component, and `D3` is used to layer on interaction, showing and hiding map images and violin charts for different regions. The images were added using a `v-for` pattern and dynamic filepath urls. This component also has a mobile-specific layout. It makes use of the `'VizSection.vue'` template to structure the content.
  * `'BarChartExample.vue'` pulls in the water bottling facility bar chart and state dropdown from [Bottled water](https://labs.waterdata.usgs.gov/visualizations/bottled-water/index.html). It loads in a csv and uses it to build an updating `D3` bar chart. It makes use of the `'VizSection.vue'` template to structure the content.

## Steps when using as template for new project
When setting up a new project you'll need to take the following steps:
 
1. Update project-specific environment variables, titles, and paths
    * [ ] Update `VITE_APP_TITLE`, `VITE_APP_LONG_TITLE`, `VITE_APP_DESCRIPTION`, and `VITE_APP_GITHUB_REPOSITORY_LINK`, in `'.env'`. Be sure to read [the section on project name handling](#project-name-handling), above.
    * [ ] Update `"name"` and `"description"` in `'package.json'`, using value of `VITE_APP_TITLE` for `"name"` and the value of `VITE_APP_DESCRIPTION` for `"description"`.
    * [ ] Update project name parameter (line 11) in `'jenkins/Jenkinsfile.build'`
    * [ ] If necessary (see the section on [Jenkins setup](#jenkins-setup), above), update `userRemoteConfigs` repo `url` in `'jenkins/Jenkinsfile.build'`. _Note: only necessary if using this template to migrate an existing public GitHub repo to vue3. Not necessary if using new approach of developing on GitLab and mirroring to GitHub._
    * [ ] Update the `{app_title}` variable throughout the DGEC required files `'code.json'` and `'CONTRIBUTING.md'`, using the value of `VITE_APP_TITLE` to replace `{app_title}`
    * [ ] Update the `{project_description}` in `'code.json'` to match the `VITE_APP_DESCRIPTION`
    * [ ] Update `{app_long_title}` in the first heading at the top of the the `'README.md'` to match the `VITE_APP_LONG_TITLE` 
    * [ ] Update the `{app_title}` in the releases statement at the top of `'README.md'` to match `VITE_APP_TITLE`
2. Delete example components and content and remove them from the site
    * [ ] Delete `'src/components/IntroSection.vue'`
    * [ ] Delete `'src/components/BarChartExample.vue'` and `'public/state_facility_type_summmary.csv'`
    * [ ] Delete `'src/components/RegionalViolins.vue'`, the 16 associated `'.png'` files in `'src/assets/images'`, and the two `'.svg'` files in `'src/assets/svgs'`
    * [ ] In `'src/views/VisualizationView.vue'` delete the import statements for both components in the `<script setup>` section and the references to the components in the html `<template>`
    * [ ] Also delete the two example banner images in `'src/assets/images'` used as placeholders in the example section titles
3. If not using, delete the section title template component from the site
    * [ ] `'src/components/SectionTitle.vue'`
4. Update project-specific attributions and references
    * [ ] Update content of `'src/text/authors.js'` to list project authors. Do not edit the structure of this file
    * [ ] Update content of `'src/text/references.js'` to list project references. Do not edit the structure of this file
    * [ ] List contributors in `'index.html'`
    * [ ] Update keywords in `'index.html'`
5. Update text in `'src/assets/text/text.js'`. The `sections` nested object is set up with the attributes needed to to populate section titles adding using the `'src/components/VizSection.vue'` template, but could also be used without that template. Text for each component that will be added to `'src/views/VisualizationView.vue'` should be added as a named object to the `components` nested object. It will be passed dynamically to each component (see current setup where text is passed to each of the three example components). Delete unused placeholder text.
6. Update README.md for project. Be sure that it is presentable to the public - minimally include project overview and build instructions.
7. Consult the [Vizlab website release checklist](https://doimspp.sharepoint.com/:w:/r/sites/IIDDStaff/_layouts/15/Doc2.aspx?action=edit&sourcedoc=%7B3c0899c4-cc87-4c82-a7e2-3f8e78439083%7D&wdOrigin=TEAMS-MAGLEV.teamsSdk_ns.rwc&wdExp=TEAMS-TREATMENT&wdhostclicktime=1714053079214&web=1) for more development guidelines related to compliance, performance testing, analytics, and public release, including releasing the repository as an official software release. Key steps that relate to template content include:
    * [ ] To work with the template set up in `'index.html'`, the meta card image for the site must be saved as a `.png` image to the _prod_ `S3` bucket in the following location: `visualizations/thumbnails/%VITE_APP_TITLE%_metacard.png`, e.g., `visualizations/thumbnails/vue3-template_metacard.png`.
    * [ ] Once known, be sure to add the release date to `'index.html'` - the `datePublished` attribute in the metadata.
    * [ ] The official software release process will require changes to `'disclaimer.md'`, `'code.json'`, and `'package.json'`. Refer to the [Vizlab website release checklist](https://doimspp.sharepoint.com/:w:/r/sites/IIDDStaff/_layouts/15/Doc2.aspx?action=edit&sourcedoc=%7B3c0899c4-cc87-4c82-a7e2-3f8e78439083%7D&wdOrigin=TEAMS-MAGLEV.teamsSdk_ns.rwc&wdExp=TEAMS-TREATMENT&wdhostclicktime=1714053079214&web=1) for detailed instructions.
 
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
        * `'VizSection.vue'` _(see caveat in 4., below)_
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
    * `'index.html'` 
    * `'package.json'` (may need additional edits if more packages are needed, see 3., below) 
3. Depending on what visualization tools you are using, you may need to add additional packages, which will require edits to some or all of the following files (reach out to Hayley with questions):
    * `'package.json'`
      * Any edits to `'package.json'` will require re-running `npm install`, which will update `'package-lock.json'`. **Be sure to commit and push any changes to `'package-lock.json'`**.
    * `'src/main.js'` 
    * `'vite.config.mjs'`. 
4. The template components `'src/components/SectionTitle.vue'` and `'src/components/VizSection.vue'` are designed to be flexible, but may require additional customization to work in your site. Editing them is fine, but note that `'src/components/ReferencesSection.vue'` and `'src/components/AuthorshipSection.vue'` make use of the `'VizSection.vue'` template, so please do not make breaking changes. If you think your edits could be useful in other sites, please submit a MR to the `vue3-template` repo.
5. Import and use any new components in `src/views/VisualizationView.vue`, and import subcomponents (e.g., `'src/components/VizSection.vue'`) directly in components.
6. Development conventions/best practices
    * Use existing folder structure for assets - e.g., images in `'src/assets/images'`, svgs in `'src/assets/svgs'`.
    * Place data files (e.g., `.csv` or `.json` files) in the `public` directory.
    * Page styling with `css`
      * Import all fonts and set **global css color variables** and body and html element styling (including **global font sizing**) in `'src/assets/css/base.css'`
        * Note that we use a [fixed `:root` font size of `62.5%`](https://blog.hubspot.com/website/css-rem#:~:text=By%20setting%20the%20root%20font,%2C%20and%202.0rem%2C%20respectively.), and all `css` font sizes should be specified in units of `rem`, where `1 rem` is equivalent `10 px`.
      * Use `'main.css'` for global page content styling that is exclusive of the USGS header and footer and is not component-specific (e.g., defining styles for standard text or figure container `<div>` elements, styling all section titles, etc.). For all colors, remember to reference color variables set in `'src/assets/css/base.css'`, e.g., `color: var(--color-title-text);`
      * Put component-specific styling in the `<style>` tags of specific components. Again, for all colors, remember to reference color variables set in `'src/assets/css/base.css'`, e.g., `color: var(--color-title-text);`
    * Page text setup
      * All page text should be added directly to `'src/assets/text/text.js'`. The master text object from that file is automatically imported in `'src/views/VisualizationView.vue'` and used to set the page title and pass content to populate the section titles (which make use of the 'SectionTitle.vue' template). In addition, nested objects containing text for each component are passed to each component as a prop, and then accessed in each component to place the text into the `'VizSection.vue'` template component, or directly into the component, if not using the `'VizSection.vue'` template. With this set up, all of the page text, including titles, section title image alt text, and page text is in a single .js file, which makes it easier to edit, particularly by a team member who is not familiar with Vue.
    * Class and ID naming conventions
      * TBD
      * Do not use spaces in class or ID names
    * JavaScript conventions
      * TBD  
