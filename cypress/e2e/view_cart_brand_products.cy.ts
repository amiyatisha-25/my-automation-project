
import { ProductsPage } from '../pages/ProductsPage';

describe('Test Case 19: View & Cart Brand Products', () => {
  const productsPage = new ProductsPage();

  beforeEach(() => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');
  });

  it('should view and cart brand products', () => {
    // 3. Click on 'Products' button
    productsPage.productsButton.click();

    // 4. Verify that Brands are visible on left side bar
    productsPage.brandsSidebar.should('be.visible');

    // 5. Click on any brand name, for example: Polo
    productsPage.poloBrand.click();

    // 6. Verify that user is navigated to brand page and brand products are displayed
    cy.url().should('include', '/brand_products/Polo');
    cy.contains('Brand - Polo Products').should('be.visible');

    // 7. On left side bar, click on any other brand link, for example: H&M
    productsPage.hmBrand.click();

    // 8. Verify that user is navigated to that brand page and can see products
    cy.url().should('include', '/brand_products/H&M');
    cy.contains('Brand - H&M Products').should('be.visible');
  });
});
