const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    experimentalStudio: true,  // 🔥 aktifkan Cypress Studio
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
