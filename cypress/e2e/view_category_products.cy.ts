import { HomePage } from '../pages/HomePage';

describe('Test Case 18: View Category Products', () => {
  const homePage = new HomePage();

  beforeEach(() => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');
  });

  it('should view category products', () => {
    // 3. Verify that categories are visible on left side bar
    homePage.categorySidebar.should('be.visible');

    // 4. Click on 'Women' category
    homePage.womenCategory.click();
    cy.wait(500); // Wait for sub-categories to load

    // 5. Click on any category link under 'Women' category, for example: Dress
    homePage.womenDressCategory.click();
    cy.url().should('include', '/category_products/1');

    // 6. Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
    cy.get('.title.text-center').should('contain.text', 'Women - Dress Products');

    // 7. On left side bar, click on any sub-category link of 'Men' category
    homePage.menCategory.click();
    cy.wait(500); // Wait for sub-categories to load
    homePage.menTshirtsCategory.click();
    cy.url().should('include', '/category_products/3');

    // 8. Verify that user is navigated to that category page
    cy.get('.title.text-center').should('contain.text', 'Men - Tshirts Products');
  });
});
