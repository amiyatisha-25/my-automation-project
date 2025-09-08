# Kinetik QA Engineer (Level 3) Assessment

This project contains automated tests for the Kinetik QA Engineer (Level 3) assessment.

## Framework

*   **Framework:** Cypress
*   **Language:** TypeScript
*   **Design Pattern:** Page Object Model (POM)

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

## CI/CD

[![Cypress Tests](https://github.com/<your-github-username>/<your-repo-name>/actions/workflows/playwright.yml/badge.svg)](https://github.com/<your-github-username>/<your-repo-name>/actions/workflows/playwright.yml)

A successful CI/CD run with artifacts can be found here: [Link to CI/CD run]

## Notes

*   The tests are designed to be run against the live website: `https://automationexercise.com`
*   A new user is created via API for each test run to ensure test independence.
*   The downloaded invoice is stored in the `cypress/downloads` directory and uploaded as an artifact in the CI/CD run.
*   **API Discrepancy:** The assessment instructions state that the `/api/createAccount` endpoint should return a `201` status code for successful user creation and `400` for a duplicate user. However, the API currently returns a `200` status code in both scenarios. The tests have been updated to reflect this actual behavior.

## Parallel and Cross-Browser Execution

To run tests in parallel, you can use the `--parallel` flag with the `cypress run` command. You will need to set up a Cypress Dashboard project for this.

To run tests on a different browser, you can use the `--browser` flag:

```bash
npx cypress run --browser firefox
```
