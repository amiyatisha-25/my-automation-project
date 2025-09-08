import { HomePage } from '../pages/HomePage';

describe('Test Case 10: Verify Subscription in home page', () => {
  const homePage = new HomePage();

  it('should verify subscription in home page', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');

    // 4. Scroll down to footer
    cy.scrollTo('bottom');

    // 5. Verify text 'SUBSCRIPTION'
    homePage.subscriptionText.should('be.visible');

    // 6. Enter email address in input and click arrow button
    homePage.subscriptionEmailInput.type(`test_sub_${Date.now()}@example.com`);
    homePage.subscribeButton.click();

    // 7. Verify success message 'You have been successfully subscribed!' is visible
    homePage.subscriptionSuccessMessage.should('be.visible');
  });
});
