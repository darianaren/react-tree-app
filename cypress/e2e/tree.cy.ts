describe("E2E test of the Tree component", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.get('input[name="editableTreeSwitch"]').click();
  });

  it("The root node does not have the button to delete it", () => {
    // Find the root node
    cy.get('input[value="Root of the Tree"]')
      .closest("li") // Find the node container
      .find('button[aria-label="Delete node"]') // Find the delete button
      .should("not.exist"); // Verify that there is no delete button
  });

  it("Add a new node", () => {
    // Click on the add node button
    cy.get('button[aria-label="Add node"]').click();

    // Enter the title for the new node
    cy.get('input[placeholder="Enter title for new node"]').type("New Node");

    // Click on the add button
    cy.get('button[aria-label="Confirm add node"]').click();

    // Verify that the node was added
    cy.get('input[value="New Node"]').should("exist");
  });

  it("Delete a node", () => {
    // Create node to delete
    cy.get('button[aria-label="Add node"]').click();
    cy.get('input[placeholder="Enter title for new node"]').type("Delete Node");
    cy.get('button[aria-label="Confirm add node"]').click();

    // Find a node
    cy.get('input[value="Delete Node"]')
      .closest("li") // Find the node container
      .find('button[aria-label="Delete node"]') // Find the delete button
      .click();

    // Verify that the node was deleted
    cy.contains('input[value="Delete Node"]').should("not.exist");
  });

  it("Edit a node", () => {
    // Create node to edit
    cy.get('button[aria-label="Add node"]').click();
    cy.get('input[placeholder="Enter title for new node"]').type("Node");
    cy.get('button[aria-label="Confirm add node"]').click();

    // Find a node and edit it
    cy.get('input[value="Node"]').type(" with New Title");

    // Exit edit mode
    cy.wait(350);
    cy.get('input[name="editableTreeSwitch"]').click();

    // Verify that the node title has changed
    cy.contains("Node with New Title").should("exist");
  });

  it("Collapse and expand a node", () => {
    // Create a new node
    cy.get('button[aria-label="Add node"]').click();
    cy.get('input[placeholder="Enter title for new node"]').type("Node");
    cy.get('button[aria-label="Confirm add node"]').click();

    // Find the node with children
    cy.get('input[value="Root of the Tree"]')
      .closest("li") // Find the node container
      .find('button[aria-label="Hide children of the node"]') // Find the collapse button
      .should("exist"); // Verify that the node is expanded by default

    // Collapse the node
    cy.get('input[value="Root of the Tree"]')
      .closest("li")
      .find('button[aria-label="Hide children of the node"]')
      .click();

    // Verify that the node has collapsed
    cy.get('input[value="Root of the Tree"]')
      .closest("li")
      .find('button[aria-label="Show children of the node"]')
      .should("exist");

    // Expand the node again
    cy.get('input[value="Root of the Tree"]')
      .closest("li")
      .find('button[aria-label="Show children of the node"]')
      .click();

    // Verify that the node is expanded
    cy.get('input[value="Root of the Tree"]')
      .closest("li")
      .find('button[aria-label="Hide children of the node"]')
      .should("exist");
  });
});
