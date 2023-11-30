# vue3-template

This project serves as a template for our site builds. It uses Vue 3 and Vite (currently version 5), and is configured to be built from GitLab using Jenkins.

## To build the website locally
Clone the repo. In the directory, run `npm install` to install the required modules. This repository requires `npm v20` to run. If you are using a later version of `npm`, you may [try using `nvm` to manage multiple versions of npm](https://betterprogramming.pub/how-to-change-node-js-version-between-projects-using-nvm-3ad2416bda7e).

Once the dependencies have been installed, run `npm run dev` to run locally from your browser.

## New Vue syntax for components
Vue syntax has changed with the shift to Vue 3. We can now use the `<script setup>` composition API syntax to build our components, which requires less boilerplate. See the [`<script setup>` guide](https://vuejs.org/api/sfc-script-setup.html). Any top-level defined variables or imported components are directly available for use in the `<template>`. Components now no longer need to be explicitly named, and can be imported directly by name using the filename, e.g. `import HeaderUSWDSBanner from "./components/HeaderUSWDSBanner.vue"`.
