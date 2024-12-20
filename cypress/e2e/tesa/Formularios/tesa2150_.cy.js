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

describe("Pruebas Formulario TESA2150", () => {
  let dataLogin;
  let databaseService = new DatabaseService();
  const loginPage = new LoginPage();
  const tesaPage1114 = new TesaPage1114();
  const tesaPage2150 = new TesaPage2150();
  before(() => {
    cy.fixture("../e2e/login/login").then((datosFixture) => {
      dataLogin = datosFixture;
    });
  });
  beforeEach(() => {
    cy.visit(Cypress.env("tesoreriaUrl"));
    loginPage.completarLogin(
      dataLogin.usuario1.username,
      dataLogin.usuario1.password
    );
  });
  it("Pruebas exitosa Aceptar", async () => {
    cy.fixture(`${module}/${scenarioName}-${testCaseId}/data`).then((data) => {
      cy.viewport(1280, 800);
      tesaPage1114.clickMenuPrincipalButton();
      tesaPage2150.clickGiraduriaCajaButton(data.rutaFormulario.menuTesoreria);
      tesaPage2150.clickOperacionGiraduriaButtonnameButton(
        data.rutaFormulario.subMenuTesoreria
      );
      tesaPage2150.clickOrdenesPagoButton(data.rutaFormulario.menuOrdenPago);
      tesaPage2150.clickAutorizacionOPButton(data.rutaFormulario.subMenuOrdenPago);
      cy.get("#P380_B1_DSP_NUMERO_MODULO_lov_btn").click();
      /*cy.get(
      "#PopupLov_380_P380_B1_DSP_NUMERO_MODULO_dlg > div.a-PopupLOV-searchBar > input"
    ).type("Contabilidad");*/
      cy.get(".a-PopupLOV-searchBar > .a-Button").click();

      // Buscar todos los elementos con atributo data-id
      /*cy.get('tr[data-id]').each(($row) => {
        // Obtener el data-id de la fila actual
        const dataId = $row.attr('data-id');
  
        // Obtener el texto del módulo
        cy.wrap($row)
          .find('td')
          .invoke('text')
          .then((moduleName) => {
            // Mostrar en consola el nombre del módulo y su data-id
            cy.log(`Módulo: ${moduleName.trim()}, data-id: ${dataId}`);
          });
      });*/

      // Seleccionar un módulo específico por su data-id (puedes parametrizar esto)
      const targetDataId = "1"; // Cambia esto al módulo que quieres seleccionar

      cy.get(`tr[data-id="${targetDataId}"]`).click(); // Hacer clic en el módulo

      const query = `
                 
            SELECT op.*, dop.*
                                FROM ordenes_pago op
                                JOIN detalles_orden_pago dop ON op.identificador = dop.id_opago
                                WHERE op.identificador = '1809447'
                                
                                    `;

      cy.task("executeQuery", query).then((result) => {
        if (result && result.length > 0) {
          // Accede a la clave `ESTADO` como un objeto
          const nombreBeneficiario = result[0].BENEFICIARIO;
          cy.log(`Nombre del Beneficiario: ${nombreBeneficiario}`);
          expect(result[0].ESTADO).to.equal(1);
          cy.get(':nth-child(3) > [headers="C5480142663075909440"]')
            .invoke("text")
            .then((text) => {
              expect(text).to.include(nombreBeneficiario);
            });
          cy.wait(2000);
          // cy.contains(
          //   "[id='5480142093895909434_orig'] > tbody >tr > td",
          //   nombreBeneficiario
          // )
          //   .siblings("[headers='C5480142849467909442']")
          //   .find("a > input")
          //   .check();
        } else {
          throw new Error("No se encontraron resultados.");
        }
      });

      // Verificar que la información del módulo se muestra (ajusta el selector según la aplicación)
      //cy.get('SELECTOR_DE_LA_INFORMACION').should('be.visible'); // Ajusta el selector al contenedor de información
    });
  });
});
