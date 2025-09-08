export class RegistrationPage {
  get signupLoginButton() {
    return cy.get('a[href="/login"]').first();
  }

  get newUserSignupText() {
    return cy.contains('New User Signup!');
  }

  get signupNameInput() {
    return cy.get('[data-qa="signup-name"]');
  }

  get signupEmailInput() {
    return cy.get('[data-qa="signup-email"]');
  }

  get signupButton() {
    return cy.get('[data-qa="signup-button"]');
  }

  signup(name: string, email: string) {
    this.signupNameInput.should('be.visible').type(name);
    this.signupEmailInput.type(email);
    this.signupButton.click();
  }

  get enterAccountInformationText() {
    return cy.contains('Enter Account Information');
  }

  get titleRadioButton() {
    return cy.get('[name="title"]');
  }

  get passwordInput() {
    return cy.get('[data-qa="password"]');
  }

  get daysDropdown() {
    return cy.get('[data-qa="days"]');
  }

  get monthsDropdown() {
    return cy.get('[data-qa="months"]');
  }

  get yearsDropdown() {
    return cy.get('[data-qa="years"]');
  }

  get newsletterCheckbox() {
    return cy.get('#newsletter');
  }

  get partnersCheckbox() {
    return cy.get('#optin');
  }

  get firstNameInput() {
    return cy.get('[data-qa="first_name"]');
  }

  get lastNameInput() {
    return cy.get('[data-qa="last_name"]');
  }

  get companyInput() {
    return cy.get('[data-qa="company"]');
  }

  get address1Input() {
    return cy.get('[data-qa="address"]');
  }

  get address2Input() {
    return cy.get('[data-qa="address2"]');
  }

  get countryDropdown() {
    return cy.get('[data-qa="country"]');
  }

  get stateInput() {
    return cy.get('[data-qa="state"]');
  }

  get cityInput() {
    return cy.get('[data-qa="city"]');
  }

  get zipcodeInput() {
    return cy.get('[data-qa="zipcode"]');
  }

  get mobileNumberInput() {
    return cy.get('[data-qa="mobile_number"]');
  }

  get createAccountButton() {
    return cy.get('[data-qa="create-account"]');
  }

  get accountCreatedMessage() {
    return cy.contains('Account Created!');
  }

  get accountCreatedText() {
    return cy.contains('Account Created!');
  }

  get continueButton() {
    return cy.get('[data-qa="continue-button"]');
  }

  get loggedInAsText() {
    return cy.contains('Logged in as');
  }

  get deleteAccountButton() {
    return cy.get('a[href="/delete_account"]');
  }

  get accountDeletedText() {
    return cy.contains('Account Deleted!');
  }

  get logoutButton() {
    return cy.get('a[href="/logout"]');
  }

  get emailAlreadyExistError() {
    return cy.contains('Email Address already exist!');
  }

  get testCasesButton() {
    return cy.get('a[href="/test_cases"]').first();
  }

  createAccount() {
    this.createAccountButton.click();
  }

  clickContinueButton() {
    this.continueButton.click();
  }

  verifyAccountCreated() {
    this.accountCreatedText.should('be.visible');
  }

  verifyAccountDeleted() {
    this.accountDeletedText.should('be.visible');
  }

  fillAccountDetails(
    title: string,
    password: string,
    day: string,
    month: string,
    year: string,
    firstName: string,
    lastName: string,
    company: string,
    address1: string,
    address2: string,
    country: string,
    state: string,
    city: string,
    zipCode: string,
    mobileNumber: string
) {
    this.titleRadioButton.filter(`[value="${title}"]`).click();
    this.passwordInput.type(password);
    this.daysDropdown.select(day);
    this.monthsDropdown.select(month);
    this.yearsDropdown.select(year);
    this.newsletterCheckbox.check();
    this.partnersCheckbox.check();
    this.firstNameInput.type(firstName);
    this.lastNameInput.type(lastName);
    this.companyInput.type(company);
    this.address1Input.type(address1);
    this.address2Input.type(address2);
    this.countryDropdown.select(country);
    this.stateInput.type(state);
    this.cityInput.type(city);
    this.zipcodeInput.type(zipCode);
    this.mobileNumberInput.type(mobileNumber);
  }
}

export default new RegistrationPage();
