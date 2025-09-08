import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';

describe('Test Case 11: Verify Subscription in Cart page', () => {
  const homePage = new HomePage();
  const productsPage = new ProductsPage();

  it('should verify subscription in cart page', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');

    // 4. Click 'Cart' button
    productsPage.cartButton.click();

    // 5. Scroll down to footer
    cy.scrollTo('bottom');

    // 6. Verify text 'SUBSCRIPTION'
    homePage.subscriptionText.should('be.visible');

    // 7. Enter email address in input and click arrow button
    homePage.subscriptionEmailInput.type(`test_sub_cart_${Date.now()}@example.com`);
    homePage.subscribeButton.click();

    // 8. Verify success message 'You have been successfully subscribed!' is visible
    homePage.subscriptionSuccessMessage.should('be.visible');
  });
});
