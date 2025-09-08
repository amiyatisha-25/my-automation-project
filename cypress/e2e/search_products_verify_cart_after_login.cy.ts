import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { RegistrationPage } from '../pages/RegistrationPage';

describe('Test Case 20: Search Products and Verify Cart After Login', () => {
  const loginPage = new LoginPage();
  const productsPage = new ProductsPage();
  const registrationPage = new RegistrationPage();

  let userEmail: string;
  let userPassword: string;

  before(() => {
    userEmail = `testuser_${Date.now()}@example.com`;
    userPassword = 'password123';

    // Create a user via API
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
  });

  beforeEach(() => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');
  });

  it('should search products and verify cart after login', () => {
    // 3. Click on 'Products' button
    productsPage.productsButton.click();

    // 4. Verify user is navigated to ALL PRODUCTS page successfully
    productsPage.allProductsText.should('be.visible');

    // 5. Enter product name in search input and click search button
    productsPage.searchInput.type('Blue Top');
    productsPage.searchButton.click();

    // 6. Verify 'SEARCHED PRODUCTS' is visible
    productsPage.searchedProductsText.should('be.visible');

    // 7. Verify all the products related to search are visible
    productsPage.allSearchedProducts.each(($el) => {
      cy.wrap($el).should('contain.text', 'Blue Top');
    });

    // 8. Add those products to cart
    productsPage.addProductToCartByName('Blue Top');
    productsPage.continueShoppingButton.click();

    // 9. Click 'Cart' button and verify that products are visible in cart
    productsPage.cartButton.click();
    productsPage.productOneInCart.should('be.visible');

    // 10. Click 'Signup / Login' button and submit login details
    registrationPage.signupLoginButton.click();
    loginPage.login(userEmail, userPassword);

    // 11. Again, go to Cart page
    productsPage.cartButton.click();

    // 12. Verify that those products are visible in cart after login as well
    productsPage.productOneInCart.should('be.visible');

    // 13. Click 'Delete Account' button
    cy.contains('Delete Account').click();

    // 14. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    registrationPage.accountDeletedText.should('be.visible');
    registrationPage.continueButton.click();
  });
});