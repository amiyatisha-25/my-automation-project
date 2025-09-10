import { faker } from '@faker-js/faker';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { LoginPage } from '../pages/LoginPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ProductsPage } from '../pages/ProductsPage';

describe('Test Case 24: Download Invoice after purchase order', () => {
  const homePage = new HomePage();
  const registrationPage = new RegistrationPage();
  const loginPage = new LoginPage();
  const checkoutPage = new CheckoutPage();
  const productsPage = new ProductsPage();

  const name = faker.person.firstName();
  const email = faker.internet.email();
  const password = faker.internet.password();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const company = faker.company.name();
  const address1 = faker.location.streetAddress();
  const address2 = faker.location.secondaryAddress();
  const state = faker.location.state();
  const city = faker.location.city();
  const zipCode = faker.location.zipCode();
  const mobileNumber = faker.phone.number();

  it('should download invoice after purchase order', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('http://automationexercise.com');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');

    // 4. Add products to cart
    productsPage.addFirstProductToCart();
    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-title').should('contain.text', 'Added!');
    cy.get('button.close-modal').click();

    // 5. Click 'Cart' button
    homePage.clickCartButton();

    // 6. Verify that cart page is displayed
    cy.url().should('include', '/view_cart');
    cy.contains('Shopping Cart').should('be.visible');

    // 7. Click Proceed To Checkout
    checkoutPage.clickProceedToCheckout();

    // 8. Click 'Register / Login' button
    registrationPage.registerLoginButton.click();

    // 9. Fill all details in Signup and create account
    registrationPage.signup(name, email);
    registrationPage.fillAccountDetails(
      'Mr',
      password,
      '1',
      'January',
      '1990',
      firstName,
      lastName,
      company,
      address1,
      address2,
      'United States',
      state,
      city,
      zipCode,
      mobileNumber
    );
    registrationPage.createAccount();

    // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    registrationPage.accountCreatedText.should('be.visible');
    registrationPage.continueButton.click();

    // 11. Verify ' Logged in as username' at top
    cy.contains('Logged in as ' + name).should('be.visible');

    // 12. Click 'Cart' button
    homePage.clickCartButton();

    // 13. Click 'Proceed To Checkout' button
    checkoutPage.clickProceedToCheckout();

    // 14. Verify Address Details and Review Your Order
    checkoutPage.verifyAddressDetails(firstName, lastName, company, address1, address2, city, state, zipCode, mobileNumber);
    checkoutPage.verifyReviewOrder();

    // 15. Enter description in comment text area and click 'Place Order'
    checkoutPage.enterComment('This is a test order comment.');
    checkoutPage.clickPlaceOrder();

    // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    checkoutPage.enterPaymentDetails(
      faker.finance.accountName(),
      faker.finance.creditCardNumber(),
      faker.finance.creditCardCVV(),
      faker.date.future().getMonth().toString(),
      faker.date.future().getFullYear().toString()
    );

    // 17. Click 'Pay and Confirm Order' button
    checkoutPage.clickPayAndConfirmOrder();

    // 18. Verify success message 'Your order has been placed successfully!'
    checkoutPage.verifyOrderPlacedSuccessMessage();

    // 19. Click 'Download Invoice' button and verify invoice is downloaded successfully.
    cy.contains('Download Invoice', { timeout: 10000 })
      .should('be.visible')
      .then(($el) => {
        const invoiceUrl = $el.attr('href')!;
        cy.downloadFile(`http://automationexercise.com${invoiceUrl}`, 'cypress/downloads', 'invoice.txt');
      });

    cy.readFile('cypress/downloads/invoice.txt').should('exist').and('not.be.empty');

    // 20. Click 'Continue' button
    checkoutPage.clickContinueButton();

    // 21. Click 'Delete Account' button
    homePage.clickDeleteAccountButton();

    // 22. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    registrationPage.verifyAccountDeleted();
    registrationPage.clickContinueButton();
  });
});