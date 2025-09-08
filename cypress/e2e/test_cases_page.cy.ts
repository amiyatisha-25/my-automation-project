import { RegistrationPage } from '../pages/RegistrationPage';

describe('Test Case 7: Verify Test Cases Page', () => {
  const registrationPage = new RegistrationPage();

  it('should navigate to the test cases page', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');

    // 4. Click on 'Test Cases' button
    registrationPage.testCasesButton.click();

    // 5. Verify user is navigated to test cases page successfully
    cy.url().should('include', '/test_cases');
  });
});
