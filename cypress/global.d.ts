declare namespace Cypress {
  interface Chainable {
    /**
     * Creates a new user via API request.
     * @example cy.createNewUser().then(user => { ... })
     */
    createNewUser(): Chainable<any>;
    downloadFile(url: string, directory: string, filename: string): Chainable<void>;
  }
}