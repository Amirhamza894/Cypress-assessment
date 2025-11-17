const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.env = {
        ...config.env,
        ...process.env,
      };
      return config;
    },
    specPattern: 'cypress/integration/**/*.spec.js',
    excludeSpecPattern: '',
    baseUrl: 'https://www.olx.com.pk/',

  },
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  // Applitools configuration
  eyes: {
    // Applitools configuration options
  },
});

require('@applitools/eyes-cypress')(module);
