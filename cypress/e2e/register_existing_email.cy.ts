import { RegistrationPage } from '../pages/RegistrationPage';

describe('Test Case 5: Register User with existing email', () => {
  const registrationPage = new RegistrationPage();
  const name = 'Test User';
  let existingEmail = '';

  before(() => {
    // Create a user via API to ensure an existing email is available
    const email = `existinguser_${Date.now()}@example.com`;
    const password = 'password123';
    existingEmail = email; // Store the email for use in the test

    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/createAccount`,
      form: true,
      body: {
        name: name,
        email: email,
        password: password,
        title: 'Mr',
        birth_date: '01',
        birth_month: 'January',
        birth_year: '1990',
        firstname: 'Test',
        lastname: 'User',
        company: 'Test Company',
        address1: '123 Test Street',
        address2: 'Apt 4B',
        country: 'United States',
        zipcode: '10001',
        state: 'New York',
        city: 'New York',
        mobile_number: '1234567890'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);     
    });
  });

  it('should display error when registering with existing email', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');

    // 4. Click on 'Signup / Login' button
    registrationPage.signupLoginButton.click();

    // 5. Verify 'New User Signup!' is visible
    registrationPage.newUserSignupText.should('be.visible');

    // 6. Enter name and already registered email address
    registrationPage.signupNameInput.type(name);
    registrationPage.signupEmailInput.type(existingEmail);

    // 7. Click 'Signup' button
    registrationPage.signupButton.click();

    // 8. Verify error 'Email Address already exist!' is visible
    registrationPage.emailAlreadyExistError.should('be.visible');
  });
});
