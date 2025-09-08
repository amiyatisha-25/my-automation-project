describe('API - User Registration', () => {
  const uniqueEmail = `testuser_${Date.now()}@example.com`;

  it('should register a new user successfully', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/createAccount`,
      form: true,
      body: {
        name: 'Test User',
        email: uniqueEmail,
        password: 'password123',
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
      expect(response.status).to.eq(201);
      expect(response.body).to.include('User created!');
    });
  });

  it('should not allow registration with an existing email', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/createAccount`,
      form: true,
      failOnStatusCode: false,
      body: {
        name: 'Test User',
        email: uniqueEmail,
        password: 'password123',
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
      expect(response.status).to.eq(400);
      expect(response.body).to.include('Email already exists!');
    });
  });
});
