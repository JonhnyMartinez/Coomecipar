import { DatabaseService } from "../../services/database_service";
import { LoginPage } from "../../login/loginPage";
import { TesaPage1114 } from "./tesaPage1114";

const directorioName = __dirname.replaceAll("\\", "/");
const module = directorioName.split(/[/]/)[2];
const scenarioName = directorioName
  .slice(directorioName.lastIndexOf("/") + 1)
  .split("-")
  .slice(0, -1)
  .join("-");
const testCaseId = directorioName.split(/[-]/).pop();

describe(`Casos de Pruebas del ${scenarioName} - ${module} `, () => {
  let dataLogin;
  let databaseService = new DatabaseService();
  const loginPage = new LoginPage();
  const tesaPage1114 = new TesaPage1114();
  const result = [["S"]];

  before(() => {
    // Mocks la función 'getInstalledRelatedApps' para que no ejecute nada
    cy.window().then((win) => {
      win.navigator.getInstalledRelatedApps = () => {};
    });
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
  it("Debe verificar que existan registros en la consulta", async () => {
    cy.wait(5000);
    const query = `
                SELECT 
                          *
                      FROM 
                          REPOSICIONES_FONDOS rf
                      WHERE 
                          rf.ENTIDAD_DATO_SUCURSAL = 1 
                          AND rf.ENTIDAD_NUMERO_SUCURSAL = 1 
                          AND rf.ID_TESORERIA = 4 
                          AND rf.id_reposicion = '178648'
    `;

    cy.task("executeQuery", query).then((result) => {
      if (result && result.length > 0) {
        // Accede a la clave `ESTADO` como un objeto
        expect(result[0].ENTIDAD_NUMERO_SUCURSAL).to.equal(1);
        expect(result[0].ESTADO).to.equal("S");
      } else {
        throw new Error("No se encontraron resultados.");
      }
    });
  });

  it.only("Pruebas en el Formulario TESA1114, carga exitosa", () => {
    tesaPage1114.clickMenuPrincipalButton();
    tesaPage1114.clickMenuProcesoButton();
    tesaPage1114.clickInformeExtraccionButton();
    cy.wait(2000);
    tesaPage1114.clickNroCajaButton();
    tesaPage1114.clickNroCajaDatosTabla("COOMECIPAR");
    tesaPage1114.clickNroSolicitudButton();
    tesaPage1114.clickNroCajaDatosTabla("178648");
    tesaPage1114.clickConfirmarButton();
    cy.get("#t_Alert_Success")
      .invoke("text")
      .then((text) => {
        expect(text).to.contains(
          "La Reposición fue procesada de manera exitosa"
        );
      });
    const query = `
    SELECT 
              *
          FROM 
              REPOSICIONES_FONDOS rf
          WHERE 
              rf.ENTIDAD_DATO_SUCURSAL = 1 
              AND rf.ENTIDAD_NUMERO_SUCURSAL = 1 
              AND rf.ID_TESORERIA = 4 
              AND rf.id_reposicion = '178648'
`;

    cy.task("executeQuery", query).then((result) => {
      if (result && result.length > 0) {
        // Accede a la clave `ESTADO` como un objeto
        expect(result[0].ENTIDAD_NUMERO_SUCURSAL).to.equal(1);
        expect(result[0].ESTADO).to.equal("E");
      } else {
        throw new Error("No se encontraron resultados.");
      }
    });
  });

  it("Pruebas de caso del mensaje de Error 'No cuenta con suficiente disponibilidad'", () => {
    tesaPage1114.clickMenuPrincipalButton();
    tesaPage1114.clickMenuProcesoButton();
    tesaPage1114.clickInformeExtraccionButton();

    cy.wait(2000);
    tesaPage1114.clickNroCajaButton();
    tesaPage1114.clickNroCajaDatosTabla("COOMECIPAR");
  
    tesaPage1114.clickNroSolicitudButton();
    tesaPage1114.clickNroCajaDatosTabla("26099");
    tesaPage1114.clickConfirmarButton();

    tesaPage1114.obtenerMensajeError(
      "Se ha producido 1 error",
      "No cuenta con suficiente disponibilidad para entregar la reposición"
    );
  });

  it(`Pruebas de validaciones del ${scenarioName} con el nro de informe ${module} `, () => {
    tesaPage1114.clickMenuPrincipalButton();
    tesaPage1114.clickMenuProcesoButton();
    tesaPage1114.clickInformeExtraccionButton();
    cy.wait(2000);

    cy.fixture(`${module}/${scenarioName}-${testCaseId}/data`).then((data) => {
      tesaPage1114.obtenerFechaSys(data.datosFormulario.fechaSistema);
      tesaPage1114.obtenerTituloCabeceraTxt(
        data.datosFormulario.cabeceraTitulo
      );
      tesaPage1114.obtenerNombreSucursalLabel(
        data.datosFormulario.labelTextoSucursal
      );
      tesaPage1114.obtenerNroSucursal(data.datosFormulario.nroSucursal);
      tesaPage1114.obtenerSucursalLabel(
        data.datosFormulario.labelTextoNombreSucursal
      );
      tesaPage1114.obtenerNombreSucursal(
        data.datosFormulario.valorNombreSucursal
      );
      tesaPage1114.obtenerNombreTesoreriaLabel(
        data.datosFormulario.labelTextoTesoreria
      );
      tesaPage1114.obtenerValorTesoreria(data.datosFormulario.valorTesoreria);
      tesaPage1114.obtenerTitutoNroCaja(data.datosFormulario.labelTextoNroCaja);
      tesaPage1114.obtenerTituloSolicitud(
        data.datosFormulario.labelTextoSolicitud
      );
    });
  });
});
