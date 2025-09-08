describe('Add review on product', () => {
  it('should add a review on a product', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('http://automationexercise.com');
    
    cy.url().should('eq', 'https://automationexercise.com/');

    // 3. Click on 'Products' button    
    cy.get('a[href="/products"]').click();

    // 4. Verify user is navigated to ALL PRODUCTS page successfully
    cy.get('h2.title.text-center').should('contain', 'All Products');

    // 5. Click on 'View Product' button
    cy.get('a[href="/product_details/1"]').click();

    // 6. Verify 'Write Your Review' is visible
    cy.get('h2').should('contain', 'Write Your Review');

    // 7. Enter name, email and review
    cy.get('a[href="#reviews"]').should('be.visible');    
    cy.get('input#name').type('Tisha');
    cy.get('input#email').type('tisha@example.com');
    cy.get('textarea#review').type('This is a great product!');
    
    // 8. Click 'Submit' button 
    cy.get('button#button-review').click();
    // 9. Verify success message 'Thank you for your review.' is visible
    cy.get('div.alert-success span').should('contain', 'Thank you for your review.');
  });
});