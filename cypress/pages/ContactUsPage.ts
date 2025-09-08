export class ContactUsPage {
  get contactUsButton() {
    return cy.get('a[href="/contact_us"]');
  }

  get getInTouchText() {
    return cy.contains('Get In Touch');
  }

  get nameInput() {
    return cy.get('[data-qa="name"]');
  }

  get emailInput() {
    return cy.get('[data-qa="email"]');
  }

  get subjectInput() {
    return cy.get('[data-qa="subject"]');
  }

  get messageInput() {
    return cy.get('[data-qa="message"]');
  }

  get uploadFileInput() {
    return cy.get('[name="upload_file"]');
  }

  get submitButton() {
    return cy.get('[data-qa="submit-button"]');
  }

  get successMessage() {
    return cy.contains('Success! Your details have been submitted successfully.');
  }

  get homeButton() {
    return cy.get('a[href="/"]').first();
  }
}
