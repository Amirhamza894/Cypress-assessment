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
    .click();

    loginPage
    .getLoginWithEmail()
    .click();

    loginPage
    .getEmailInput()
    .should('be.visible')
    .type(Cypress.env('TEST_USERNAME'));

    loginPage
    .getPasswordInput()
    .should('be.visible')
    .type(Cypress.env('TEST_PASSWORD'));

    loginPage
    .getPasswordContinueButton()
    .click();

    loginPage
    .getNoAccountText()
    .should('have.text', "No account associated with this email address")
    // cy
    // .get('.alert-danger')
    // .should('contain', 'Invalid Email or Password');
  });

  it('should show an error message with an invalid password (negative)', () => {
    loginPage
    .getLoginButton()
    .click();

    loginPage
    .getLoginWithEmail()
    .click();

    loginPage
    .getEmailInput()
    .should('be.visible')
    .type(Cypress.env('VALID_EMAIL'));

    loginPage
    .getPasswordInput()
    .should('be.visible')
    .type(Cypress.env('INVALID_PASS'));

    loginPage
    .getPasswordContinueButton()
    .click();

    loginPage
    .getInvalidCredentialsMessage()
    .should('have.text', 'Invalid password');
  });
});