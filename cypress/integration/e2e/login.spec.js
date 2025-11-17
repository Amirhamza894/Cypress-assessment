import LoginPage from '../../support/pageObjects/loginPage';
import HomePage from '../../support/pageObjects/homePage';
import testData from '../../fixtures/testData.json';

describe('E2E Login Functionality', () => {
  const loginPage = new LoginPage();
  const homePage = new HomePage();

  beforeEach(() => {
    cy.on('uncaught:exception', () => false);
    cy.fixture('loginLocators.json').as('locators');
    cy.fixture('homeLocators.json').as('homeLocators');
    loginPage.visit();
  });

  it('should show an error message with an invalid email (negative)', () => {
    loginPage
    .getLoginButton()
    .should('be.visible', { timeout: 10000 })
    .click();

    loginPage
    .getLoginWithEmail()
    .should('be.visible', { timeout: 10000 })
    .click();

    loginPage
    .getEmailInput()
    .should('be.visible', { timeout: 10000 })
    .type(Cypress.env('TEST_USERNAME'));

    loginPage
    .getPasswordInput()
    .should('be.visible', { timeout: 10000 })
    .type(Cypress.env('TEST_PASSWORD'));

    loginPage
    .getPasswordContinueButton()
    .should('be.visible', { timeout: 10000 })
    .click();

    loginPage
    .getNoAccountText().should('be.visible', { timeout: 10000 })
    .should('have.text', "No account associated with this email address")
    // cy
    // .get('.alert-danger')
    // .should('contain', 'Invalid Email or Password');
  });

  it('should show an error message with an invalid password (negative)', () => {
    loginPage
    .getLoginButton()
    .should('be.visible', { timeout: 10000 })
    .click();

    loginPage
    .getLoginWithEmail()
    .should('be.visible', { timeout: 10000 })
    .click();

    loginPage
    .getEmailInput()
    .should('be.visible', { timeout: 10000 })
    .type(Cypress.env('VALID_EMAIL'));

    loginPage
    .getPasswordInput()
    .should('be.visible', { timeout: 10000 })
    .type(Cypress.env('INVALID_PASS'));

    loginPage
    .getPasswordContinueButton()
    .should('be.visible', { timeout: 10000 })
    .click();

    loginPage
    .getInvalidCredentialsMessage()
    .should('be.visible', { timeout: 10000 })
    .should('have.text', 'Invalid password');
  });
});