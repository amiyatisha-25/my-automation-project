import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';

describe('Test Case 2: Login User with correct email and password', function() {
  const loginPage = new LoginPage();
  const registrationPage = new RegistrationPage();

  beforeEach(function() {
    cy.createNewUser().then(user => {
      this.user = user;
    });
  });

  it('should login with correct credentials', function() {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');

    // 4. Click on 'Signup / Login' button
    registrationPage.signupLoginButton.click();

    // 5. Verify 'Login to your account' is visible
    loginPage.loginToYourAccountText.should('be.visible');

    // 6. Enter correct email address and password
    loginPage.login(this.user.email, this.user.password);

    // 7. Click 'login' button is handled by loginPage.login

    // 8. Verify that 'Logged in as username' is visible
    registrationPage.loggedInAsText.should('be.visible').and('contain', this.user.name);

    // 9. Click 'Delete Account' button
    registrationPage.deleteAccountButton.click();

    // 10. Verify that 'ACCOUNT DELETED!' is visible
    registrationPage.accountDeletedText.should('be.visible');
  });
});
