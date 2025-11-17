class HomePage {
  getChatLogo() {
    return cy.get('@locators').then((locators) => {
      return cy.get(locators.chatLogo);
    });
  }

  getVerticals() {
    return cy.get('@locators').then((locators) => {
      return cy.get(locators.verticals);
    });
  }

  getHorizontalCategory() {
    return cy.get('@locators').then((locators) => {
      return cy.get(locators.horizontalCategory);
    });
  }

  getCategoryHeading() {
    return cy.get('@locators').then((locators) => {
      return cy.get(locators.categoryHeading);
    });
  }

  getSearchBar() {
    return cy.get('@locators').then((locators) => {
      return cy.get(locators.searchBar);
    });
  }

  getCategoryList() {
    return cy.get('@locators').then((locators) => {
      return cy.get(locators.categoryList);
    });
  }

  getSearchHeading() {
    return cy.get('@locators').then((locators) => {
      return cy.get(locators.searchHeading);
    });
  }

  getAdsInCategory() {
    return cy.get('@locators').then((locators) => {
      return cy.get(locators.adsInCategory);
    });
  }

  getCategoryName() {
    return cy.get('@locators').then((locators) => {
      return cy.get(locators.searchHeading);
    });
  }

}

export default HomePage;