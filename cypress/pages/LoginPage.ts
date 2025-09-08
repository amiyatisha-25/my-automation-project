export class LoginPage {
  get emailInput() {
    return cy.get('[data-qa="login-email"]');
  }

  get passwordInput() {
    return cy.get('[data-qa="login-password"]');
  }

  get loginButton() {
    return cy.get('[data-qa="login-button"]');
  }

  get loginToYourAccountText() {
    return cy.contains('Login to your account');
  }

  get incorrectLoginError() {
    return cy.get('p[style="color: red;"]');
  }

  login(email, password) {
    this.emailInput.type(email);
    this.passwordInput.type(password);
    this.loginButton.click();
  }
}
