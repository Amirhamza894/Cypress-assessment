import LoginPage from '../../support/pageObjects/loginPage';
import HomePage from '../../support/pageObjects/homePage';

describe.skip('Visual Home Page Test', () => {
  const loginPage = new LoginPage();
  const homePage = new HomePage();

  beforeEach(() => {
    cy.eyesOpen({
      appName: 'OLX PK',
      testName: 'Home Page Visual Test',
    });
    cy.on('uncaught:exception', () => false);
    cy.fixture('homeLocators.json').as('locators');
    loginPage.visit();
  });

  afterEach(() => {
    cy.eyesClose();
  });

  context('TC-1: Verify horizontal list categories on home screen', () => {
    it('should perform visual checks on the horizontal categories', () => {
      cy.eyesCheckWindow('Home Page');
      homePage.getVerticals().first().invoke('text').then((text) => {
        expect(text.trim()).to.equal('Motors');
      });
      homePage.getVerticals().eq(1).invoke('text').then((text) => {
        expect(text.trim()).to.equal('Property');
      });
      cy.eyesCheckWindow('Verticals');
      homePage.getHorizontalCategory().should('be.visible');
      cy.eyesCheckWindow('Horizontal Categories');
    });
  });

  context('TC-2: Verify categories list showing on home page and navigation', () => {
    it('should perform visual checks on categories and navigation', () => {
      homePage.getSearchBar().should('be.visible');
      cy.eyesCheckWindow('Search Bar');
      homePage.getCategoryList().should('have.length', 14);
      cy.eyesCheckWindow('Category List');
      homePage.getCategoryList().contains('Vehicles').click();
      cy.url().should('include', '/vehicles_c5');
      cy.eyesCheckWindow('Vehicles Category Page');
    });
  });
});