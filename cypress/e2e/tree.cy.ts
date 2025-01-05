describe("E2E test of the Tree component", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.get('input[name="editableTreeSwitch"]').click();
  });

  it("El nodo principal no tiene el botón para eliminarlo", () => {
    //Encontrar el nodo principal
    cy.get('input[value="Root of the Tree"]')
      .closest("li") // Encontrar el contenedor del nodo
      .find('button[aria-label="Delete node"]') // Encontrar el botón de eliminar
      .should("not.exist"); // Verificar que no haya un botón de eliminar
  });

  it("Agregar un nuevo nodo", () => {
    // Clic en el botón de agregar nodo
    cy.get('button[aria-label="Add node"]').click();

    // Ingresar el título del nuevo nodo
    cy.get('input[placeholder="Enter title for new node"]').type("New Node");

    // Clic en el botón de agregar
    cy.get('button[aria-label="Confirm add node"]').click();

    // Verificar que el nodo fue agregado
    cy.get('input[value="New Node"]').should("exist");
  });

  it("Eliminar un nodo", () => {
    // Crear nodo para eliminar
    cy.get('button[aria-label="Add node"]').click();
    cy.get('input[placeholder="Enter title for new node"]').type("Delete Node");
    cy.get('button[aria-label="Confirm add node"]').click();

    // Encontrar un nodo
    cy.get('input[value="Delete Node"]')
      .closest("li") // Encontrar el contenedor del nodo
      .find('button[aria-label="Delete node"]') // Encontrar el botón de eliminar
      .click();

    // Verificar que el nodo fue eliminado
    cy.contains('input[value="Delete Node"]').should("not.exist");
  });

  it("Editar un nodo", () => {
    // Crear nodo para editar
    cy.get('button[aria-label="Add node"]').click();
    cy.get('input[placeholder="Enter title for new node"]').type("Node");
    cy.get('button[aria-label="Confirm add node"]').click();

    // Encontrar un nodo y editarlo
    cy.get('input[value="Node"]').type(" with New Title");

    // Salir del modo edición
    cy.wait(350);
    cy.get('input[name="editableTreeSwitch"]').click();

    // Verificar que el título del nodo haya cambiado
    cy.contains("Node with New Title").should("exist");
  });

  it("Colapsar y expandir un nodo", () => {
    // Crear nodo nuevo
    cy.get('button[aria-label="Add node"]').click();
    cy.get('input[placeholder="Enter title for new node"]').type("Node");
    cy.get('button[aria-label="Confirm add node"]').click();

    // Encontrar el nodo con hijos
    cy.get('input[value="Root of the Tree"]')
      .closest("li") // Encontrar el contenedor del nodo
      .find('button[aria-label="Hide children of the node"]') // Encontrar el botón de colapsar
      .should("exist"); // Verificar que el nodo esté expandido por defecto

    // Colapsar el nodo
    cy.get('input[value="Root of the Tree"]')
      .closest("li")
      .find('button[aria-label="Hide children of the node"]')
      .click();

    // Verificar que el nodo se haya colapsado
    cy.get('input[value="Root of the Tree"]')
      .closest("li")
      .find('button[aria-label="Show children of the node"]')
      .should("exist");

    // Expandir nuevamente el nodo
    cy.get('input[value="Root of the Tree"]')
      .closest("li")
      .find('button[aria-label="Show children of the node"]')
      .click();

    // Verificar que el nodo esté expandido
    cy.get('input[value="Root of the Tree"]')
      .closest("li")
      .find('button[aria-label="Hide children of the node"]')
      .should("exist");
  });
});
