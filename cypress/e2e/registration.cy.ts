import { RegistrationPage } from '../pages/RegistrationPage';

describe('Test Case 1: Register User', () => {
  const registrationPage = new RegistrationPage();
  const name = 'Test User';

  it('should register a new user', () => {
    const uniqueEmail = `testuser_${Date.now()}@example.com`;
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');

    // 4. Click on 'Signup / Login' button
    registrationPage.signupLoginButton.click();

    // 5. Verify 'New User Signup!' is visible
    registrationPage.newUserSignupText.should('be.visible');

    // 6. Enter name and email address
    registrationPage.signupNameInput.type(name);
    registrationPage.signupEmailInput.type(uniqueEmail);

    // 7. Click 'Signup' button
    registrationPage.signupButton.click();

    // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    registrationPage.enterAccountInformationText.should('be.visible');

    // 9. Fill details: Title, Name, Email, Password, Date of birth
    registrationPage.titleRadioButton.check('Mr');
    registrationPage.passwordInput.type('password123');
    registrationPage.daysDropdown.select('1');
    registrationPage.monthsDropdown.select('January');
    registrationPage.yearsDropdown.select('1990');

    // 10. Select checkbox 'Sign up for our newsletter!'
    registrationPage.newsletterCheckbox.check();

    // 11. Select checkbox 'Receive special offers from our partners!'
    registrationPage.partnersCheckbox.check();

    // 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    registrationPage.firstNameInput.type('Test');
    registrationPage.lastNameInput.type('User');
    registrationPage.companyInput.type('Test Company');
    registrationPage.address1Input.type('123 Test Street');
    registrationPage.address2Input.type('Apt 4B');
    registrationPage.countryDropdown.select('United States');
    registrationPage.stateInput.type('New York');
    registrationPage.cityInput.type('New York');
    registrationPage.zipcodeInput.type('10001');
    registrationPage.mobileNumberInput.type('1234567890');

    // 13. Click 'Create Account button'
    registrationPage.createAccountButton.click();

    // 14. Verify that 'ACCOUNT CREATED!' is visible
    registrationPage.accountCreatedText.should('be.visible');

    // 15. Click 'Continue' button
    registrationPage.continueButton.click();

    // 16. Verify that 'Logged in as username' is visible
    registrationPage.loggedInAsText.should('be.visible').and('contain', name);

    // 17. Click 'Delete Account' button
    registrationPage.deleteAccountButton.click();

    // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    registrationPage.accountDeletedText.should('be.visible');
    registrationPage.continueButton.click();
  });
});
