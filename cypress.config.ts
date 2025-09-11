import { defineConfig } from "cypress";
import * as fs from "fs";
const { downloadFile } = require('cypress-downloadfile/lib/addPlugin');

export default defineConfig({
  e2e: {
    baseUrl: "https://automationexercise.com",
    pageLoadTimeout: 120000,
    setupNodeEvents(on, config) {
      on("task", {
        downloadFile,
        deleteFolder(folderName) {
          console.log("deleting folder %s", folderName);
          try {
            if (fs.existsSync(folderName)) {
              fs.rmdirSync(folderName, { maxRetries: 10, recursive: true });
            }
          } catch (err) {
            console.error(err);
          }
          return null;
        },
      });    
    },
    env: {
      API_URL: "https://automationexercise.com/api",
    },
    watchForFileChanges: false,
    video: true,
    screenshotOnRunFailure: true,
    downloadsFolder: "cypress/downloads",
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true,
      charts: true,
      reportPageTitle: "Kinetik QA Assessment",
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: true
},
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
});