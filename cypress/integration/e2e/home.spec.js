import LoginPage from '../../support/pageObjects/loginPage';


describe("OLX.com.pk Home Page Categories", () => {
const loginPage = new LoginPage();


  beforeEach(() => {
    cy.on('uncaught:exception', () => false);
    loginPage.visit();
  });

  context("TC-1: Verify horizontal list categories on home screen", () => {
    it.only("should show Motors and Properties tabs", () => {
      // Example selectors — replace with real ones
      cy.get("span[class$='_265fbf76 a1c1940e b7af14b4']").first().invoke("text").then((text) => {
        expect(text.trim()).to.equal("Motors");
      })
      cy.get("span[class$='_265fbf76 a1c1940e b7af14b4']").eq(1).invoke("text").then((text) => {
        expect(text.trim()).to.equal("Property");
      })
    });

    it.only("should show horizontal categories list with ads", () => {
      // Assuming categories are in a horizontal scrollable container
      cy.get("div[aria-label$='Category with hits section']").should("be.visible");

      // Check there are at least some category items
      cy.get("div[aria-label$='Category with hits section']")
        .should("have.length", 8)

      // Also, verify that each category has at least one ad (or at least some content)
      cy.get("div[aria-label$='Category with hits section']").each(($cat) => {
        // For each category item, check if it contains an ad link or thumbnail
        cy.wrap($cat).find("article[class='_84ba2e24']").should("exist");
      });
    });

    it.only("should verify categories by name one by one", () => {
      // Define expected categories
      const expectedCategories = [
        "Mobile Phones", "Cars", "Bikes & Motorcycles", "Houses", "Video-Audios", "Tablets", "Land & Plots", "Jobs"
        // ... add whatever categories OLX shows
      ];

      // Get actual category elements
      cy.get("div[aria-label$='Category with hits section']")
        .should("have.length.at.least", expectedCategories.length)
        .then(($items) => {
          // Map them to their text content
          const actual = [...$items].map(item => item.innerText.trim());

          // For each expected category, check it is in actual
          expectedCategories.forEach(expected => {
            expect(actual).to.include(expected);
          });
        });
    });
  });

  context("TC-2: Verify categories list showing on home page and navigation", () => {
    it("should have search bar on home page", () => {
      cy.get('input[type="search"]').should("be.visible");
      // or specific selector if OLX uses different input
    });

    it("should show categories list on home screen", () => {
      cy.get('.horizontal-categories-container').should("be.visible");
    });

    it("clicking a category navigates to search page", () => {
      // Choose a category to click
      cy.get('.horizontal-categories-container .category-item')
        .contains("Cars")  // pick one
        .click();

      // Now verify that URL changed to a search page for that category
      cy.url().should("include", "/cars"); // or whatever path OLX uses

      // Verify category is shown on search page
      // For example, the header or a breadcrumb
      cy.get('.search-header').should("contain.text", "Cars");
    });
  });
});
