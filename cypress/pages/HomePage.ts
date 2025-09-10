export class HomePage {
  get subscriptionText() {
    return cy.contains('Subscription');
  }

  get subscriptionEmailInput() {
    return cy.get('#susbscribe_email');
  }

  get subscribeButton() {
    return cy.get('#subscribe');
  }

  get subscriptionSuccessMessage() {
    return cy.contains('You have been successfully subscribed!');
  }

  get categorySidebar() {
    return cy.get('.left-sidebar');
  }

  get womenCategory() {
    return cy.get('a[href="#Women"]');
  }

  get womenDressCategory() {
    return cy.get('#Women').find('a[href="/category_products/1"]');
  }

  get menCategory() {
    return cy.get('a[href="#Men"]');
  }

  get menTshirtsCategory() {
    return cy.get('#Men').find('a[href="/category_products/3"]');
  }

  getRecommendedItems() {
    return cy.get('.recommended_items');
  }

  getAddToCartFromRecommended() {
    return cy.get('.recommended_items .add-to-cart');
  }

  verifyHomePageIsVisible() {
    cy.get('#slider').should('be.visible');
  }

  get cartButton() {
    return cy.get('a[href="/view_cart"]').first();
  }

  clickCartButton() {
    this.cartButton.click();
  }

  get loggedInAsText() {
    return cy.contains('Logged in as');
  }

  verifyLoggedInAs(name: string, p0: { timeout: number; }) {
    this.loggedInAsText.should('be.visible').and('contain', name);
  }

  get deleteAccountButton() {
    return cy.get('a[href="/delete_account"]');
  }

  clickDeleteAccountButton() {
    this.deleteAccountButton.click();
  }
}

export default new HomePage();
