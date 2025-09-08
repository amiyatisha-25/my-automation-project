export class CheckoutPage {
  get proceedToCheckoutButton() {
    return cy.contains('Proceed To Checkout');
  }

  clickProceedToCheckout() {
    this.proceedToCheckoutButton.click();
  }

  get placeOrderButton() {
    return cy.get('.btn.btn-default.check_out');
  }

  clickPlaceOrder() {
    this.placeOrderButton.click();
  }

  get nameOnCardInput() {
    return cy.get('[data-qa="name-on-card"]');
  }

  get cardNumberInput() {
    return cy.get('[data-qa="card-number"]');
  }

  get cvcInput() {
    return cy.get('[data-qa="cvc"]');
  }

  get expiryMonthInput() {
    return cy.get('[data-qa="expiry-month"]');
  }

  get expiryYearInput() {
    return cy.get('[data-qa="expiry-year"]');
  }

  get payAndConfirmOrderButton() {
    return cy.get('[data-qa="pay-button"]');
  }

  clickPayAndConfirmOrder() {
    this.payAndConfirmOrderButton.click();
  }

  get downloadInvoiceButton() {
    return cy.contains('Download Invoice');
  }

  get orderPlacedMessage() {
    return cy.contains('Order Placed!');
  }

  verifyOrderPlacedSuccessMessage() {
    this.orderPlacedMessage.should('be.visible');
  }

  get deliveryAddress() {
    return cy.get('#address_delivery');
  }

  get billingAddress() {
    return cy.get('#address_invoice');
  }

  verifyAddressDetails(firstName: string, lastName: string, company: string, address1: string, address2: string, city: string, state: string, zipCode: string, mobileNumber: string) {
    this.deliveryAddress.should('contain', `${firstName} ${lastName}`);
    this.deliveryAddress.should('contain', company);
    this.deliveryAddress.should('contain', address1);
    this.deliveryAddress.should('contain', address2);
    this.deliveryAddress.should('contain', `${city} ${state} ${zipCode}`);
    this.deliveryAddress.should('contain', mobileNumber);
  }

  verifyReviewOrder() {
    cy.contains('Review Your Order').should('be.visible');
  }

  enterComment(comment: string) {
    cy.get('textarea[name="message"]').type(comment);
  }

  enterPaymentDetails(nameOnCard: string, cardNumber: string, cvc: string, expiryMonth: string, expiryYear: string) {
    this.nameOnCardInput.type(nameOnCard);
    this.cardNumberInput.type(cardNumber);
    this.cvcInput.type(cvc);
    this.expiryMonthInput.type(expiryMonth);
    this.expiryYearInput.type(expiryYear);
  }

  get continueButton() {
    return cy.get('[data-qa="continue-button"]');
  }

  clickContinueButton() {
    this.continueButton.click();
  }
}

export default new CheckoutPage();
