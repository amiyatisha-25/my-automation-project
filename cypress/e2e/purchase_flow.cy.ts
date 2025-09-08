import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CheckoutPage } from '../pages/CheckoutPage';

describe('End-to-End Purchase Flow', function() {
  const loginPage = new LoginPage();
  const productsPage = new ProductsPage();
  const checkoutPage = new CheckoutPage();

  beforeEach(function() {
    cy.task('deleteFolder', 'cypress/downloads');
    cy.createNewUser().then(user => {
      this.user = user;
    });
  });

  it('should complete the purchase flow', function() {
    // UI Login
    cy.visit('/login');
    loginPage.login(this.user.email, this.user.password);
    cy.contains('Logged in as').should('be.visible');

    // Add products to cart
    productsPage.addFirstProductToCart();
    cy.get('.modal-footer button').click();
    productsPage.addSecondProductToCart('Men Tshirt');
    cy.get('.modal-body a[href="/view_cart"]').click({force: true});

    // Proceed to checkout
    checkoutPage.proceedToCheckoutButton.click();
    cy.get('#address_delivery').should('be.visible');
    cy.get('[name="message"]').type('Test order');
    checkoutPage.placeOrderButton.click();

    // Complete order
    cy.url().should('include', '/payment');
    checkoutPage.nameOnCardInput.should('be.visible').type('Test User');
    checkoutPage.cardNumberInput.type('1234567890123456');
    checkoutPage.cvcInput.type('123');
    checkoutPage.expiryMonthInput.type('01');
    checkoutPage.expiryYearInput.type('2026');
    checkoutPage.payAndConfirmOrderButton.click();

    // Verify order placement
    checkoutPage.orderPlacedMessage.should('be.visible');
    cy.url().should('include', '/payment_done');

    // Download invoice
    checkoutPage.downloadInvoiceButton.click();

    // Verify invoice file
    cy.readFile('cypress/downloads/invoice.txt').should('have.length.gt', 0);
  });
});
