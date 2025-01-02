///<reference types="cypress"/>
import { DatabaseService } from "../../services/database_service";
import { LoginPage } from "../../login/loginPage";
import { TesaPage1114 } from "../Formulario-Tesa-1114/tesaPage1114";
import { TesaPage2150 } from "../Formulario-Tesa-2150/tesaPage2150";

const directorioName = __dirname.replaceAll("\\", "/");
const module = directorioName.split(/[/]/)[2];
const scenarioName = directorioName
  .slice(directorioName.lastIndexOf("/") + 1)
  .split("-")
  .slice(0, -1)
  .join("-");
const testCaseId = directorioName.split(/[-]/).pop();
describe("", () => {
  let dataLogin;
  const loginPage = new LoginPage();
  before(() => {
    cy.fixture("../e2e/login/login").then((datosFixture) => {
      dataLogin = datosFixture;
    });
  });
  beforeEach(() => {
    //cy.visit(Cypress.env("tesoreriaUrl"));
    cy.visit("https://siga-d1.coomecipar.coop.py/ords/f?p=164:366:27564788668761:::::")
    loginPage.completarLogin(
      dataLogin.usuario1.username,
      dataLogin.usuario1.password
    );
  });
  it(`Prueba Aceptar Orden de Pago  del ${scenarioName} con el nro de informe ${module} `, () => {
    cy.fixture(`${module}/${scenarioName}-${testCaseId}/data`).then((data) => {
      cy.viewport(1280, 800);
     
    });
  });
});
