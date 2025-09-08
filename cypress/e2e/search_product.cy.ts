import { ProductsPage } from '../pages/ProductsPage';

describe('Test Case 9: Search Product', () => {
  const productsPage = new ProductsPage();

  it('should search for a product and verify results', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');

    // 4. Click on 'Products' button
    productsPage.productsButton.click();

    // 5. Verify user is navigated to ALL PRODUCTS page successfully
    productsPage.allProductsText.should('be.visible');
    cy.url().should('include', '/products');

    // 6. Enter product name in search input and click search button
    const productName = 'T-Shirt'; // Example product name
    productsPage.searchInput.type(productName);
    productsPage.searchButton.click();

    // 7. Verify 'SEARCHED PRODUCTS' is visible
    productsPage.searchedProductsText.should('be.visible');

    // 8. Verify all the products related to search are visible
    productsPage.allSearchedProducts.each(($el) => {
      cy.wrap($el).should('contain.text', productName);
    });
  });
});
