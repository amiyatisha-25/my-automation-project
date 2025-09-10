# Kinetik QA Engineer (Level 3) Assessment

This project contains automated tests for the Kinetik QA Engineer (Level 3) assessment.

[![Cypress Tests](https://github.com/tisha/Assesstemt/actions/workflows/cypress.yml/badge.svg)](https://github.com/tisha/Assesstemt/actions/workflows/cypress.yml)

## Framework

*   **Framework:** Cypress
*   **Language:** TypeScript
*   **Design Pattern:** Page Object Model (POM)
*   **Reporting:** Mochawesome

## Features

*   **CI/CD:** Automated test execution via GitHub Actions.
*   **Test Retries:** Flaky tests are automatically retried up to 2 times in `run` mode.
*   **Reporting:** Generates an HTML report with screenshots for each test run.
*   **Artifacts:** CI/CD runs upload the HTML report, screenshots/videos for failed tests, and the downloaded invoice.

## Setup Instructions

1.  Clone the repository.
2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Run the tests:

    ```bash
    npx cypress run
    ```

4.  To open the Cypress Test Runner:

    ```bash
    npx cypress open
    ```

## CI/CD

A successful CI/CD run with artifacts can be found here: [Link to CI/CD run]

## Notes

*   The tests are designed to be run against the live website: `https://automationexercise.com`
*   A new user is created via API for each test run to ensure test independence.
*   The downloaded invoice is stored in the `cypress/downloads` directory and uploaded as an artifact in the CI/CD run.
*   **API Discrepancy:** The assessment instructions state that the `/api/createAccount` endpoint should return a `201` status code for successful user creation and `400` for a duplicate user. 

*   **Test Data Cleanup:** The `cypress/downloads` folder is cleared before each run.

## Parallel and Cross-Browser Execution

To run tests in parallel, you can use the `--parallel` flag with the `cypress run` command. You will need to set up a Cypress Dashboard project for this.

To run tests on a different browser, you can use the `--browser` flag:

```bash
npx cypress run --browser firefox
```
