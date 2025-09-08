import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';

describe('Test Case 3: Login User with incorrect email and password', () => {
  const loginPage = new LoginPage();
  const registrationPage = new RegistrationPage();

  it('should not login with incorrect credentials', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');

    // 4. Click on 'Signup / Login' button
    registrationPage.signupLoginButton.click();

    // 5. Verify 'Login to your account' is visible
    loginPage.loginToYourAccountText.should('be.visible');

    // 6. Enter incorrect email address and password
    loginPage.login('wrong@email.com', 'wrongpassword');

    // 7. Click 'login' button is handled by loginPage.login

    // 8. Verify error 'Your email or password is incorrect!' is visible
    loginPage.incorrectLoginError.should('be.visible');
  });
});
