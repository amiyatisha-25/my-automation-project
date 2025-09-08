
import { ProductsPage } from '../pages/ProductsPage';

describe('Test Case 13: Verify Product quantity in Cart', () => {
  const productsPage = new ProductsPage();

  it('should verify product quantity in cart', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');

    // 4. Click 'View Product' for any product on home page
    productsPage.viewProductButton(1).click(); // Assuming we view the first product

    // 5. Verify product detail is opened
    productsPage.productNameDetail.should('be.visible');
    productsPage.productPriceDetail.should('be.visible');

    // 6. Increase quantity to 4
    cy.get('#quantity').clear().type('4');

    // 7. Click 'Add to cart' button
    cy.get('button.btn.btn-default.cart').should('be.visible').click();

    // 8. Click 'View Cart' button
    productsPage.viewCartButton.click();

    // 9. Verify that product is displayed in cart page with exact quantity
    productsPage.productOneQuantity.should('contain.text', '4');
  });
});
