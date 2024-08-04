describe('template spec', () => {
  beforeEach(() => {
    cy.login("admin@bcr.io", "123456");
    cy.visit("http://213.210.37.162:3000");
  });
  it("should display the dashboard page", () => {
    
    cy.get("#table").should("exist").and("be.visible");
    // cy.get("input[type='password']").should("exist").and("be.visible").type("123456");
    // cy.get("button").should("exist").and("be.visible").click();

    // cy.get("#formBasicEmail").should("exist").and("be.visible");
    // cy.get("#formBasicPassword").should("exist").and("be.visible");
    // cy.get("button[type='submit']").should("exist").and("be.visible");
    // cy.get("#formBasicEmail").should("exist").type("admin@bcr.io");
    // cy.get("#formBasicPassword").should("exist").type("123456");
    // cy.get("button[type='submit']").should("exist").click();
  });
})