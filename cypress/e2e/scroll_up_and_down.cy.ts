describe('Test Case 25: Verify Scroll Up using \'Arrow\' button and Scroll Down functionality', () => {
  it('should scroll up and down and verify visibility of elements', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');

    // 4. Scroll down page to bottom
    cy.scrollTo('bottom');

    // 5. Verify 'SUBSCRIPTION' is visible
    cy.contains('Subscription').should('be.visible');

    // 6. Click on arrow at bottom right side to move upward
    cy.get('#scrollUp').click();

    // 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
    cy.contains('Full-Fledged practice website for Automation Engineers').should('be.visible');
  });
});
