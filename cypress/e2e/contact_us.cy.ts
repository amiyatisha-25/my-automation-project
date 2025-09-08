import { ContactUsPage } from '../pages/ContactUsPage';

describe('Test Case 6: Contact Us Form', () => {
  const contactUsPage = new ContactUsPage();

  it('should submit the contact us form successfully', () => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit('/');

    // 3. Verify that home page is visible successfully
    cy.url().should('eq', 'https://automationexercise.com/');

    // 4. Click on 'Contact Us' button
    contactUsPage.contactUsButton.click();

    // 5. Verify 'GET IN TOUCH' is visible
    contactUsPage.getInTouchText.should('be.visible');

    // 6. Enter name, email, subject and message
    contactUsPage.nameInput.type('Test User');
    contactUsPage.emailInput.type('test@example.com');
    contactUsPage.subjectInput.type('Test Subject');
    contactUsPage.messageInput.type('This is a test message.');

    // 7. Upload file
    const fileName = 'example.txt';
    cy.fixture(fileName).then(fileContent => {
      contactUsPage.uploadFileInput.attachFile({ fileContent, fileName, mimeType: 'text/plain' });
    });

    // 8. Click 'Submit' button
    contactUsPage.submitButton.click();

    // 9. Click OK button on alert
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Press OK to proceed!');
      return true; // click OK
    });

    // 10. Verify success message 'Success! Your details have been submitted successfully.' is visible
    contactUsPage.successMessage.should('be.visible');

    // 11. Click 'Home' button and verify that landed to home page successfully
    contactUsPage.homeButton.click();
    cy.url().should('eq', 'https://automationexercise.com/');
  });
});
