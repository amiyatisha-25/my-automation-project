import { ProductsPage } from '../pages/ProductsPage';

describe('Test Case 17: Remove Products From Cart', () => {
  const productsPage = new ProductsPage();

  it('should remove products from cart', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');

    // 4. Add products to cart
    productsPage.productsButton.click(); // Navigate to products page first
    productsPage.addFirstProductToCart();

    // 5. Click 'Cart' button
    productsPage.viewCartButton.click();

    // 6. Verify that cart page is displayed
    cy.url().should('include', '/view_cart');
    productsPage.productOneInCart.should('be.visible'); // Verify product is in cart

    // 7. Click 'X' button corresponding to particular product
    productsPage.getRemoveFromCartButton(0).click();

    // 8. Verify that product is removed from the cart
    productsPage.cartEmptyMessage.should('be.visible');
  });
});
