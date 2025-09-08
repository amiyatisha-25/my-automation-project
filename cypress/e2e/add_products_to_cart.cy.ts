import { ProductsPage } from '../pages/ProductsPage';

describe('Test Case 12: Add Products in Cart', () => {
  const productsPage = new ProductsPage();

  it('should add products to cart and verify details', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');

    // 4. Click 'Products' button
    productsPage.productsButton.click();

    // 5. Hover over first product and click 'Add to cart'
    productsPage.addFirstProductToCart();

    // 6. Click 'Continue Shopping' button
    productsPage.continueShoppingButton.click();

    // 7. Hover over second product and click 'Add to cart'
    productsPage.addSecondProductToCart('Men Tshirt');
    cy.wait(500);

    // 8. Click 'View Cart' button
    productsPage.viewCartButton.click();

    // 9. Verify both products are added to Cart
    productsPage.productOneInCart.should('be.visible');
    productsPage.productTwoInCart.should('be.visible');

    // 10. Verify their prices, quantity and total price
    productsPage.productOnePrice.should('be.visible');
    productsPage.productOneQuantity.should('contain.text', '1'); // Assuming quantity is 1 by default
    productsPage.productOneTotalPrice.should('be.visible');

    productsPage.productTwoPrice.should('be.visible');
    productsPage.productTwoQuantity.should('contain.text', '1'); // Assuming quantity is 1 by default
    productsPage.productTwoTotalPrice.should('be.visible');
  });

  it('should remove products from cart', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');

    // 4. Click 'Products' button
    productsPage.productsButton.click();

    // 5. Hover over first product and click 'Add to cart'
    productsPage.addFirstProductToCart();

    // 6. Click 'View Cart' button
    productsPage.viewCartButton.click();

    // 7. Verify product is added to Cart
    productsPage.productOneInCart.should('be.visible');

    // 8. Click 'X' button corresponding to particular product
    productsPage.getRemoveFromCartButton(0).click();

    // 9. Verify that product is removed from the cart
    productsPage.cartEmptyMessage.should('be.visible');
  });
});
