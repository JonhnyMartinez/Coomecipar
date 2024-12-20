///<reference types="cypress"/>
import { DatabaseService } from "../../services/database_service";
import { LoginPage } from "../../login/loginPage";
import { TesaPage1114 } from "../Formulario-Tesa-1114/tesaPage1114";
import { TesaPage2150 } from "./tesaPage2150";

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
  it.only(`Prueba Aceptar Orden de Pago  del ${scenarioName} con el nro de informe ${module} `, () => {
    cy.fixture(`${module}/${scenarioName}-${testCaseId}/data`).then((data) => {
      cy.viewport(1280, 800);
      tesaPage1114.clickMenuPrincipalButton();
      tesaPage2150.clickGiraduriaCajaButton(data.rutaFormulario.menuTesoreria);
      tesaPage2150.clickOperacionGiraduriaButtonnameButton(
        data.rutaFormulario.subMenuTesoreria
      );
      tesaPage2150.clickOrdenesPagoButton(data.rutaFormulario.menuOrdenPago);
      tesaPage2150.clickAutorizacionOPButton(
        data.rutaFormulario.subMenuOrdenPago
      );
      tesaPage2150.clickNroModuloButton();
      // Seleccionar un módulo específico por su data-id (puedes parametrizar esto)
      // Reutiliza la generación de consultas SQL
      const getQuery = (id) => `
                SELECT op.*, dop.*
                FROM ordenes_pago op
                JOIN detalles_orden_pago dop ON op.identificador = dop.id_opago
                WHERE op.identificador = '${id}'
                `;

      // Función para formatear fechas SQL
      const formatDateSQL = (fechaSQL) => {
        const [year, month, day] = fechaSQL.split("-");
        return `${day}/${month}/${year}`;
      };

      // Identificadores configurables
      const targetDataId = "1"; // Módulo objetivo
      const orderId = "1386101"; // ID de orden de pago

      // Haz clic en el módulo objetivo

      tesaPage2150.clickModuloId(targetDataId);

      // Ejecuta la consulta inicial y verifica el estado
      cy.task("executeQuery", getQuery(orderId)).then((result) => {
        if (!result || result.length === 0) {
          throw new Error("No se encontraron resultados.");
        }

        // Verifica que el estado inicial sea 1
        expect(result[0].ESTADO).to.equal(1);

        // Marca el checkbox relacionado y confirma la acción
        tesaPage2150.clickTextoModulo(data.beneficiario.nombre);

        tesaPage2150.clickConfirmarButton();

        // Verifica el estado actualizado
        cy.task("executeQuery", getQuery(orderId)).then((updatedResult) => {
          if (!updatedResult || updatedResult.length === 0) {
            throw new Error(
              "No se encontraron resultados después de la actualización."
            );
          }

          // Verifica que el estado sea 2
          expect(updatedResult[0].ESTADO).to.equal(2);

          // Verifica la fecha formateada en la interfaz
          const fechaFormateada = formatDateSQL(
            updatedResult[0].FECHA_ESTADO.split("T")[0]
          );
          tesaPage2150.obtenerFechaSistema(fechaFormateada);
        });
      });
    });
  });
  it(`Prueba Rechazar Orden de Pago  del ${scenarioName} con el nro de informe ${module} `, () => {
    cy.fixture(`${module}/${scenarioName}-${testCaseId}/data`).then((data) => {
      cy.viewport(1280, 800);
      tesaPage1114.clickMenuPrincipalButton();
      tesaPage2150.clickGiraduriaCajaButton(data.rutaFormulario.menuTesoreria);
      tesaPage2150.clickOperacionGiraduriaButtonnameButton(
        data.rutaFormulario.subMenuTesoreria
      );
      tesaPage2150.clickOrdenesPagoButton(data.rutaFormulario.menuOrdenPago);
      tesaPage2150.clickAutorizacionOPButton(
        data.rutaFormulario.subMenuOrdenPago
      );
      tesaPage2150.clickNroModuloButton();
      const getQuery = (id) => `
                SELECT op.*, dop.*
                FROM ordenes_pago op
                JOIN detalles_orden_pago dop ON op.identificador = dop.id_opago
                WHERE op.identificador = '${id}'
                `;

      // Función para formatear fechas SQL
      const formatDateSQL = (fechaSQL) => {
        const [year, month, day] = fechaSQL.split("-");
        return `${day}/${month}/${year}`;
      };

      // Identificadores configurables
      const targetDataId = "1"; // Módulo objetivo
      const orderId = "1386101"; // ID de orden de pago

      // Haz clic en el módulo objetivo

      tesaPage2150.clickModuloId(targetDataId);

      // Ejecuta la consulta inicial y verifica el estado
      cy.task("executeQuery", getQuery(orderId)).then((result) => {
        if (!result || result.length === 0) {
          throw new Error("No se encontraron resultados.");
        }

        // Verifica que el estado inicial sea 1
        expect(result[0].ESTADO).to.equal(1);

        // Marca el checkbox relacionado y confirma la acción
        tesaPage2150.clickTextoModulo(data.beneficiario.nombre);

        tesaPage2150.clickNroModuloButton();
        cy.get("#P380_B2_DSP_NUMERO_ANULACION").select(
          "2 - ANULACION POR DESEMBOLSO DE CREDITOS"
        );
        cy.wait(3000);
        tesaPage2150.clickRechazarButton();

        // Verifica el estado actualizado
        cy.task("executeQuery", getQuery(orderId)).then((updatedResult) => {
          if (!updatedResult || updatedResult.length === 0) {
            throw new Error(
              "No se encontraron resultados después de la actualización."
            );
          }

          // Verifica que el estado sea 2
          expect(updatedResult[0].ESTADO).to.equal(4);

          // Verifica la fecha formateada en la interfaz
          const fechaFormateada = formatDateSQL(
            updatedResult[0].FECHA_ESTADO.split("T")[0]
          );
          tesaPage2150.obtenerFechaSistema(fechaFormateada);
        });
      });
    });
  });
});
