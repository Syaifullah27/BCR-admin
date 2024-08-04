describe('login page', () => {
  beforeEach(() => {
    cy.visit("http://213.210.37.162:3000/login");
  });
  it("should display the login form, input fields and sign in button", () => {
    cy.get("input[type='email']").should("exist").and("be.visible").type("admin@bcr.io");
    cy.get("input[type='password']").should("exist").and("be.visible").type("123456");
    cy.get("button").should("exist").and("be.visible").click();

    // cy.get("#formBasicEmail").should("exist").and("be.visible");
    // cy.get("#formBasicPassword").should("exist").and("be.visible");
    // cy.get("button[type='submit']").should("exist").and("be.visible");
    // cy.get("#formBasicEmail").should("exist").type("admin@bcr.io");
    // cy.get("#formBasicPassword").should("exist").type("123456");
    // cy.get("button[type='submit']").should("exist").click();
  });
})


