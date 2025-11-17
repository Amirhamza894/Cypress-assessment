class LoginPage {
  visit() {
    cy.visit('/');
  }

  getLoginButton() {
    return cy.get('@locators').then((locators) => {
      return cy.get(locators.loginButton);
    });
  }

  getLoginWithEmail() {
    return cy.get('@locators').then((locators) => {
      return cy.get(locators.loginWithEmail);
    });
  }

  getEmailInput() {
    return cy.get('@locators').then((locators) => {
      return cy.get(locators.emailInput);
    });
  }

  getPasswordInput() {
    return cy.get('@locators').then((locators) => {
      return cy.get(locators.passwordInput);
    });
  }

  getPasswordContinueButton() {
    return cy.get('@locators').then((locators) => {
      return cy.get(locators.passwordContinueButton);
    });
  }

  getInvalidCredentialsMessage() {
    return cy.get('@locators').then((locators) => {
      return cy.get(locators.invalidErrorMessage);
    });
  }

  getNoAccountText() {
    return cy.get('@locators').then((locators) => {
      return cy.get(locators.noAccount);
    });
  }
}

export default LoginPage;