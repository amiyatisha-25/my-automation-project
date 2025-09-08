import { ProductsPage } from '../pages/ProductsPage';

describe('Test Case 8: Verify All Products and product detail page', () => {
  const productsPage = new ProductsPage();

  it('should verify all products and product detail page', () => {
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

    // 6. The products list is visible
    productsPage.productsList.should('be.visible');

    // 7. Click on 'View Product' of first product
    productsPage.viewProductButton(1).click();

    // 8. User is landed to product detail page
    cy.url().should('include', '/product_details');

    // 9. Verify that detail detail is visible: product name, category, price, availability, condition, brand
    productsPage.productNameDetail.should('be.visible');
    productsPage.productCategoryDetail.should('be.visible');
    productsPage.productPriceDetail.should('be.visible');
    productsPage.productAvailabilityDetail.should('be.visible');
    productsPage.productConditionDetail.should('be.visible');
    productsPage.productBrandDetail.should('be.visible');
  });
});
