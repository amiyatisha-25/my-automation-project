import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { LoginPage } from '../pages/LoginPage';
import { CheckoutPage } from '../pages/CheckoutPage';

describe('Test Case 16: Place Order: Login before Checkout', () => {
  const homePage = new HomePage();
  const productsPage = new ProductsPage();
  const registrationPage = new RegistrationPage();
  const loginPage = new LoginPage();
  const checkoutPage = new CheckoutPage();

  let userEmail: string;
  let userPassword: string;

  beforeEach(() => {
    userEmail = `testuser_${Date.now()}@example.com`;
    userPassword = 'password123';

    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');
  });

  it('should place order by logging in before checkout', () => {
    // Create a user via API and write credentials to a fixture file
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/createAccount`,
      form: true,
      body: {
        name: 'Test User',
        email: userEmail,
        password: userPassword,
        title: 'Mr',
        birth_date: '01',
        birth_month: 'January',
        birth_year: '1990',
        firstname: 'Test',
        lastname: 'User',
        company: 'Test Company',
        address1: '123 Test Street',
        address2: 'Apt 4B',
        country: 'United States',
        zipcode: '10001',
        state: 'New York',
        city: 'New York',
        mobile_number: '1234567890'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });

    // 4. Click 'Signup / Login' button
    registrationPage.signupLoginButton.click();

    // 5. Fill email, password and click 'Login' button
    loginPage.login(userEmail, userPassword);

    // 6. Verify 'Logged in as username' at top
    cy.contains('Logged in as Test User').should('be.visible');

    // 8. Add products to cart
    productsPage.addFirstProductToCart();
    productsPage.continueShoppingButton.click();

    // 9. Click 'Cart' button
    productsPage.cartButton.click();

    // 10. Verify that cart page is displayed
    cy.url().should('include', '/view_cart');

    // 11. Click Proceed To Checkout
    checkoutPage.proceedToCheckoutButton.click();

    // 12. Verify Address Details and Review Your Order
    cy.get('#address_delivery').should('be.visible');
    cy.get('#address_invoice').should('be.visible');

    // 13. Enter description in comment text area and click 'Place Order'
    cy.get('[name="message"]').type('Test order comments');
    checkoutPage.placeOrderButton.click();

    // 14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    checkoutPage.nameOnCardInput.type('Test User');
    checkoutPage.cardNumberInput.type('1234567890123456');
    checkoutPage.cvcInput.type('123');
    checkoutPage.expiryMonthInput.type('01');
    checkoutPage.expiryYearInput.type('2026');

    // 15. Click 'Pay and Confirm Order' button
    checkoutPage.payAndConfirmOrderButton.click();

    // 16. Verify success message 'Your order has been placed successfully!'
    checkoutPage.orderPlacedMessage.should('be.visible');

    // 17. Click 'Delete Account' button
    cy.contains('Delete Account').click();

    // 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    registrationPage.accountDeletedText.should('be.visible');
    registrationPage.continueButton.click();
  });
});
