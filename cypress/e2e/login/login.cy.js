import { LoginPage } from "./loginPage";
describe("template spec", () => {
  let pagina = "home";
  let dataLogin;
  const loginPage = new LoginPage();
  before(() => {
    // Mocks la función 'getInstalledRelatedApps' para que no ejecute nada
    cy.window().then((win) => {
      win.navigator.getInstalledRelatedApps = () => {};
    });
    cy.fixture("../e2e/login/login").then((datosFixture) => {
      dataLogin = datosFixture;
    });
  });
  it("Pruebas de Inicio de sesion exitoso", () => {
    cy.visit(
      "https://siga-d1.coomecipar.coop.py/ords/f?p=164:1:13180828029202:::::"
    );
    cy.visit(Cypress.env("tesoreriaUrl"));
    loginPage.completarLogin(
      dataLogin.usuario1.username,
      dataLogin.usuario1.password
    );
  });
  it.only("Pruebas de Inicio de sesion invalida", () => {
    cy.visit(
      "https://siga-d1.coomecipar.coop.py/ords/f?p=164:1:13180828029202:::::"
    );
    cy.visit(Cypress.env("tesoreriaUrl"));
    loginPage.completarLogin(
      dataLogin.usuario2.username,
      dataLogin.usuario2.password
    );
  });
});
