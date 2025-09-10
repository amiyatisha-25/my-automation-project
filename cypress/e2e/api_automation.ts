describe('Task 2: API Automation - Register User', () => {
  const apiUrl = 'https://automationexercise.com/api/createAccount';
  const uniqueEmail = `apitest_${Date.now()}@example.com`;
  const userData = {
    name: 'API User',
    email: uniqueEmail,
    password: 'password123',
    title: 'Mr',
    birth_date: '01',
    birth_month: 'January',
    birth_year: '1990',
    firstname: 'API',
    lastname: 'User',
    company: 'API Company',
    address1: '123 API Street',
    address2: 'Suite 100',
    country: 'United States',
    zipcode: '10001',
    state: 'New York',
    city: 'New York',
    mobile_number: '1234567890'
  };

  it('should register a new user and validate response', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      form: true,
      body: userData,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.include('User created!');
    });
  });

  it('should fail to register with an existing email and validate response', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      form: true,
      body: userData,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.include('Email already exists!');
    });
  });
});