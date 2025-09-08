import { faker } from '@faker-js/faker';
import RegistrationPage from '../pages/RegistrationPage';
import ProductsPage from '../pages/ProductsPage';
import CheckoutPage from '../pages/CheckoutPage';

describe('Verify address details in checkout page', () => {
  const name = faker.person.firstName();
  const email = faker.internet.email();
  const password = faker.internet.password();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const company = faker.company.name();
  const address1 = faker.location.streetAddress();
  const address2 = faker.location.secondaryAddress();
  const country = 'United States';
  const state = faker.location.state();
  const city = faker.location.city();
  const zipcode = faker.location.zipCode();
  const mobileNumber = faker.phone.number();

  it('should verify that the delivery and billing addresses are the same as the registration address', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('http://automationexercise.com');
    // 3. Verify that home page is visible successfully
    cy.get('body').should('be.visible');
    // 4. Click 'Signup / Login' button
    RegistrationPage.signupLoginButton.click();
    // 5. Fill all details in Signup and create account
    RegistrationPage.signup(name, email);
    cy.wait(2000);
    RegistrationPage.fillAccountDetails(
      'Mrs',
      password,
      '1', // day (example value)
      'January', // month (example value)
      '1990', // year (example value)
      firstName,
      lastName,
      company,
      address1,
      address2,
      country,
      state,
      city,
      zipcode,
      mobileNumber
    );
    RegistrationPage.createAccount();
    // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    RegistrationPage.accountCreatedMessage.should('be.visible');
    RegistrationPage.continueButton.click();
    // 7. Verify ' Logged in as username' at top
    cy.contains('Logged in as ' + name).should('be.visible');
    // 8. Add products to cart
    ProductsPage.addFirstProductToCart();
    ProductsPage.continueShoppingButton.click();
    // 9. Click 'Cart' button
    ProductsPage.cartButton.click();
    // 10. Verify that cart page is displayed
    cy.url().should('include', '/view_cart');
    // 11. Click Proceed To Checkout
    CheckoutPage.proceedToCheckoutButton.click();
    // 12. Verify that the delivery address is same address filled at the time registration of account
    CheckoutPage.deliveryAddress.should('contain', address1);
    CheckoutPage.deliveryAddress.should('contain', address2);
    CheckoutPage.deliveryAddress.should('contain', city);
    CheckoutPage.deliveryAddress.should('contain', state);
    CheckoutPage.deliveryAddress.should('contain', zipcode);
    CheckoutPage.deliveryAddress.should('contain', country);
    // 13. Verify that the billing address is same address filled at the time registration of account
    CheckoutPage.billingAddress.should('contain', address1);
    CheckoutPage.billingAddress.should('contain', address2);
    CheckoutPage.billingAddress.should('contain', city);
    CheckoutPage.billingAddress.should('contain', state);
    CheckoutPage.billingAddress.should('contain', zipcode);
    CheckoutPage.billingAddress.should('contain', country);
    // 14. Click 'Delete Account' button
    RegistrationPage.deleteAccountButton.click();
    // 15. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    RegistrationPage.accountDeletedText.should('be.visible');
    RegistrationPage.continueButton.click();
  });
});