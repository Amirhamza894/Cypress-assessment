class LoginPage {

    getChatLogo() {
        cy.reload();
        return cy.get('@homeLocators').then((locators) => {
            return cy.get(locators.chatLogo);
        });
    }
}

export default LoginPage;