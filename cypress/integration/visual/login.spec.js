import LoginPage from '../../support/pageObjects/loginPage';

describe.skip('Visual Login Test', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    cy.eyesOpen({
      appName: 'OLX PK',
      testName: 'Login Page Visual Test',
    });
    loginPage.visit();
    cy.fixture('loginLocators.json').as('locators');
  });

  afterEach(() => {
    cy.eyesClose();
  });

  it('should perform visual checks on the login process', () => {
    // Visual check of the initial page
    cy.eyesCheckWindow('Main Page');

    loginPage.getLoginButton().click();
    
    // Visual check of the login modal
    cy.eyesCheckWindow('Login Modal');

    // Use credentials from .env file
    loginPage.getEmailInput().should('be.visible').type(Cypress.env('TEST_USERNAME'));
    loginPage.getPasswordInput().should('be.visible').type(Cypress.env('TEST_PASSWORD'));

    // Visual check after typing credentials
    cy.eyesCheckWindow('After Typing Credentials');
  });
});