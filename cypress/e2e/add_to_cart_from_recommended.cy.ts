import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';

describe('Add to cart from Recommended items', () => {
  it('should add a product to the cart from the recommended items section', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('http://automationexercise.com');

    // 3. Scroll to bottom of page
    cy.scrollTo('bottom');

    // 4. Verify 'RECOMMENDED ITEMS' are visible
    HomePage.getRecommendedItems().should('be.visible');

    // 5. Click on 'Add To Cart' on Recommended product
    HomePage.getAddToCartFromRecommended().first().click({ force: true });

    // 6. Click on 'View Cart' button
    ProductsPage.viewCartButton.click();
    // 7. Verify that product is displayed in cart page
    cy.get('#cart_info_table').should('be.visible');
  });
});


