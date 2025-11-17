import LoginPage from '../../support/pageObjects/loginPage';
import HomePage from '../../support/pageObjects/homePage';


describe("OLX.com.pk Home Page Categories", () => {
const loginPage = new LoginPage();
const homePage = new HomePage();


  beforeEach(() => {
    cy.on('uncaught:exception', () => false);
    loginPage.visit();
  });

  context("TC-1: Verify horizontal list categories on home screen", () => {
    it("should show Motors and Properties tabs", () => {
      // Example selectors — replace with real ones
      cy.get("span[class$='_265fbf76 a1c1940e b7af14b4']").first().invoke("text").then((text) => {
        expect(text.trim()).to.equal("Motors");
      })
      cy.get("span[class$='_265fbf76 a1c1940e b7af14b4']").eq(1).invoke("text").then((text) => {
        expect(text.trim()).to.equal("Property");
      })
    });

    it("should show horizontal categories list with ads", () => {
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

    it("should verify categories by name one by one", () => {
      // Define expected categories
      const expectedCategories = [
        "Mobile Phones", "Cars", "Bikes & Motorcycles", "Houses", "Video-Audios", "Tablets", "Land & Plots", "Jobs"
        // ... add whatever categories OLX shows
      ];


        cy.get("div[aria-label$='Category with hits section']")
            // make sure there are enough of them
            .should("have.length.at.least", expectedCategories.length)
            .then(($sections) => {
                // $sections is a jQuery collection of the outer divs
                const actualNestedTexts = [];

                // Loop through each section
                Cypress._.forEach($sections, (section) => {
                // wrap the section so we can use Cypress commands on it
                cy.wrap(section)
                    // find the nested div with the class ending you mentioned
                    .find("div[class$='_948d9e0a ab75e5c3 d7383df5 _3ec8085e']")
                    .invoke("text")
                    .then((text) => {
                    actualNestedTexts.push(text.trim());
                    });
                });

            // After iterating through all, wrap the array and do assertions
            cy.wrap(null).then(() => {
            expectedCategories.forEach((expected) => {
                // check if any of the nested texts contains the expected category
                const found = actualNestedTexts.some((nestedText) =>
                nestedText.includes(expected)
                );
                expect(found, `expected to find category "${expected}" in nested texts`).to.be.true;
            });
            });
        });
    });
  });

  context("TC-2: Verify categories list showing on home page and navigation", () => {
    it("should have search bar on home page", () => {
      cy.get("input[autocomplete$='free-text-search']").should("be.visible");
      // or specific selector if OLX uses different input
    });

    it("should show categories list on home screen", () => {
      cy.get("div[class$='_0272c9dc e0339389'] a").should("have.length", 14);
    });

    it("clicking a category navigates to search page", () => {
      // Choose a category to click
      cy.get("div[class$='_0272c9dc e0339389'] a")
        .contains("Vehicles")  // pick one
        .click();

      // Now verify that URL changed to a search page for that category
      cy.url().should("include", "/vehicles_c5"); // or whatever path OLX uses

      // Verify category is shown on search page
      // For example, the header or a breadcrumb
      cy.get("h1[class='_7c57f8f7']").should("contain.text", "Vehicles");
    });
  });
});
