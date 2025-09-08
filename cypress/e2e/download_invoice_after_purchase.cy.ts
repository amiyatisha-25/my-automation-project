import { faker } from '@faker-js/faker';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { LoginPage } from '../pages/LoginPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ProductsPage } from '../pages/ProductsPage';

describe('Test Case 24: Download Invoice after purchase order', () => {
    const homePage = new HomePage();
    const registrationPage = new RegistrationPage();
    const loginPage = new LoginPage();
    const checkoutPage = new CheckoutPage();
    const productsPage = new ProductsPage();

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const company = faker.company.name();
    const address1 = faker.location.streetAddress();
    const address2 = faker.location.secondaryAddress();
    const state = faker.location.state();
    const city = faker.location.city();
    const zipCode = faker.location.zipCode();
    const mobileNumber = faker.phone.number();

    before(() => {
        // Create a user and log in
        cy.visit('http://automationexercise.com/login');
        registrationPage.signup(firstName, email);
        registrationPage.enterAccountInformationText.should('be.visible');
        registrationPage.fillAccountDetails(
            'Mr', // title
            password,
            faker.date.birthdate().getDate().toString(),
            (faker.date.birthdate().getMonth() + 1).toString(), // Month is 0-indexed, so add 1
            faker.date.birthdate().getFullYear().toString(),
            firstName,
            lastName,
            company,
            address1,
            address2,
            'United States', // country (hardcoded as per previous tests)
            state,
            city,
            zipCode,
            mobileNumber
        );
        registrationPage.createAccount();
        registrationPage.verifyAccountCreated();
        registrationPage.clickContinueButton();
        homePage.verifyLoggedInAs(firstName);
    });

    it('should download invoice after purchase order', () => {
        // 4. Add products to cart
        productsPage.addFirstProductToCart();
        cy.get('.modal-content').should('be.visible');
        cy.get('.modal-title').should('contain.text', 'Added!');
        cy.get('.modal-body').contains('View Cart').should('be.visible');
        cy.get('button.close-modal').click(); // Close the modal

        // 5. Click 'Cart' button
        homePage.clickCartButton();
        // 6. Verify that cart page is displayed
        cy.url().should('include', '/view_cart');
        cy.contains('Shopping Cart').should('be.visible');

        // 7. Click Proceed To Checkout
        checkoutPage.clickProceedToCheckout();

        // 14. Verify Address Details and Review Your Order
        checkoutPage.verifyAddressDetails(firstName, lastName, company, address1, address2, city, state, zipCode, mobileNumber);
        checkoutPage.verifyReviewOrder();

        // 15. Enter description in comment text area and click 'Place Order'
        checkoutPage.enterComment('This is a test order comment.');
        checkoutPage.clickPlaceOrder();

        // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
        checkoutPage.enterPaymentDetails(
            faker.finance.accountName(),
            faker.finance.creditCardNumber(),
            faker.finance.creditCardCVV(),
            faker.date.future().getMonth().toString(),
            faker.date.future().getFullYear().toString()
        );

        // 17. Click 'Pay and Confirm Order' button
        checkoutPage.clickPayAndConfirmOrder();

        // 18. Verify success message 'Your order has been placed successfully!'
        checkoutPage.verifyOrderPlacedSuccessMessage();

        // 19. Click 'Download Invoice' button and verify invoice is downloaded successfully.
        cy.contains('Download Invoice', { timeout: 10000 })
            .should('be.visible')
            .then(($el) => {
                const invoiceUrl = $el.attr('href')!;
                cy.task('downloadFile', {
                    url: `http://automationexercise.com${invoiceUrl}`,
                    directory: 'cypress/downloads',
                    filename: 'invoice.pdf'
                });
            });

        // Verify the invoice file exists and is not empty
        cy.readFile('cypress/downloads/invoice.pdf', 'binary', { timeout: 15000 })
            .should((buffer) => {
                expect(buffer.length).to.be.greaterThan(0);
            });

        // 20. Click 'Continue' button
        checkoutPage.clickContinueButton();

        // 21. Click 'Delete Account' button
        homePage.clickDeleteAccountButton();

        // 22. Verify 'ACCOUNT DELETED!' and click 'Continue' button
        registrationPage.verifyAccountDeleted();
        registrationPage.clickContinueButton();
    });
});