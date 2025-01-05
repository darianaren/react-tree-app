describe("E2E test of the main page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("It must load the home path with the correct information", () => {
    cy.get("h1").should("contain", "Welcome to the Tree App");
  });

  it('Must change the state of "Toggle editable tree" on click', () => {
    // Verify that the switch is in its initial state (unchecked).
    cy.get('input[name="editableTreeSwitch"]').should("not.be.checked");

    // Click on the switch to change the state
    cy.get('input[name="editableTreeSwitch"]').click();

    // Verify that the switch is now checked
    cy.get('input[name="editableTreeSwitch"]').should("be.checked");
  });

  it('Must change the state of "Toggle expand tree" on click', () => {
    // Verify that the switch is in its initial state (checked).
    cy.get('input[name="expandTreeSwitch"]').should("be.checked");

    // Click on the switch to change the state
    cy.get('input[name="expandTreeSwitch"]').click();

    // Verify that the switch is now unchecked
    cy.get('input[name="expandTreeSwitch"]').should("not.be.checked");
  });
});
