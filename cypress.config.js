const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    experimentalStudio: true,  // 🔥 aktifkan Cypress Studio
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: "cypress/support/e2e.js",
    defaultCommandTimeout: 30000, //dalam milisecond (30 detik)
    baseUrl : "https://opensource-demo.orangehrmlive.com/"
  },
});
