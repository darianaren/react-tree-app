describe("E2E test of the about page", () => {
  beforeEach(() => {
    cy.visit("/about");
  });

  it("It must load the home path with the correct information", () => {
    cy.get("h1").should("contain", "Desafío React 🚀");
  });

  it("You must display the section headings", () => {
    cy.get("h2").contains("Descripción");
    cy.get("h2").contains("Características Clave");
    cy.get("h2").contains("Funcionalidades Adicionales");
    cy.get("h2").contains("Tecnologías Utilizadas");
  });

  it("Must show all features and functionalities", () => {
    // We verify that the key characteristics are listed.
    cy.get("ul").contains("Interactividad");
    cy.get("ul").contains("Modo de Vista y Edición");
    cy.get("ul").contains("Formulario de Agregado");
    cy.get("ul").contains("Persistencia en localStorage");
    cy.get("ul").contains("Uso de Material-UI");

    // Verify that the additional functionalities are in the list
    cy.get("ul").contains("Notificaciones con Snackbar");
    cy.get("ul").contains("Colapsar/Desplegar Nodos");
    cy.get("ul").contains("Desplegar/Colapsar Todo");
    cy.get("ul").contains("Uso de React Router");
    cy.get("ul").contains("Pruebas E2E con Cypress");
    cy.get("ul").contains("Storybook");
  });

  it("You must have a link to the GitHub repository.", () => {
    cy.get("a")
      .contains("repositorio en GitHub")
      .should(
        "have.attr",
        "href",
        "https://github.com/darianaren/react-tree-app"
      );
  });
});
