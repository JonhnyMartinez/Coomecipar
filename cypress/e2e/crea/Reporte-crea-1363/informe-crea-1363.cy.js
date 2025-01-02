import { LoginPage } from "../../login/loginPage";
import { CreaPage1363 } from "./creaPage1363";

const directorioName = __dirname.replaceAll("\\", "/");
const module = directorioName.split(/[/]/)[2];
const scenarioName = directorioName
  .slice(directorioName.lastIndexOf("/") + 1)
  .split("-")
  .slice(0, -1)
  .join("-");
const testCaseId = directorioName.split(/[-]/).pop();

describe(`Casos de Pruebas del ${scenarioName} - ${module} `, () => {
  //#region  OBTENER FECHA ACTUAL
  const obtenerFechaActual = () => {
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = fecha.getFullYear();
    //const anio = String(fecha.getFullYear()).slice(-2);
    return `${dia}/${mes}/${anio}`;
  };
  const fechaActual = obtenerFechaActual();
  //#endregion

  let pagina = "home";
  let dataLogin;
  const loginPage = new LoginPage();
  const creaPage1363 = new CreaPage1363();

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
    cy.viewport(1280, 800);
    cy.visit(Cypress.env("creditoUrl"));
    loginPage.completarLogin(
      dataLogin.usuario1.username,
      dataLogin.usuario1.password
    );
  });
  it(`Visualizar el informe ${module} - ${scenarioName}`, () => {
    creaPage1363.clickMenuPrincipalButton();
    creaPage1363.clickMenuProcesoButton();
    creaPage1363.clickInformeCrea1363();
    creaPage1363.clickSucursalDesde("1 - ASUNCION");
    creaPage1363.clickSucursalHasta("13 - AGENCIA ITAUGUA");
    creaPage1363.clickFechaDesde("03112023");
    creaPage1363.clickFechaHasta("05112023");
    creaPage1363.clickNroSocioButton();
    creaPage1363.clickInputNroSocio("45057");
    creaPage1363.clickContenedorDatosTable("SILVIA OVANDO");
    creaPage1363.clickConfirmarButton();
  });

  it("Validaciones de los campos del formulario", () => {
    creaPage1363.clickMenuPrincipalButton();
    creaPage1363.clickMenuProcesoButton();
    creaPage1363.clickInformeCrea1363();
    creaPage1363.obtenerCabeceraNombre("Módulo de Créditos");
    creaPage1363.obtenerSucursalDesdeLabel("Sucursal Desde:");
    creaPage1363.obtenerSucursalHastaLabel("Sucursal Hasta:");
    creaPage1363.obtenerFechaDesdeLabel("Fecha Desde:");
    creaPage1363.obtenerNroSocioLabel("Número de Socio:");
    creaPage1363.obtenerTipoServicioLabel("Tipo de Servicio:");
  });
  it("Validacion que la fecha desde no sea mayor a fecha hasta", () => {
    creaPage1363.clickMenuPrincipalButton();
    creaPage1363.clickMenuProcesoButton();
    creaPage1363.clickInformeCrea1363();
    cy.get("#P157_FECHA_D input").then(($input) => {
      $input.val("03/11/2023");
    });

    cy.get("#P157_FECHA_H input").then(($input) => {
      $input.val("01/11/2023");
    });
    cy.get('#P157_FECHA_D input', { timeout: 10000 }).type('03112023{enter}');
    cy.get('#P157_FECHA_H input', { timeout: 10000 }).type('01112023{enter}');
    //cy.get('#P157_FECHA_D input', { timeout: 10000 }).should('be.visible').type('03112023{enter}');

    //creaPage1363.clickFechaDesdeInput("03112023");
    //creaPage1363.clickFechaDesdeInput("03112023");
    //cy.get("#P157_FECHA_D input").trigger("change");

    //creaPage1363.clickFechaHastaInput("01112023");

    creaPage1363.clickConfirmarButton();
    creaPage1363.obtenerNotificacionError();
    creaPage1363.obtenerPrimerMensajeError("Se ha producido 1 error");
    creaPage1363.obtenerSegundoMensajeError(
      "Fecha Desde no debe ser mayor a Fecha Hasta"
    );

  });
  it(`Validaciones de Fechas Invalido ${module}`, () => {
    creaPage1363.clickMenuPrincipalButton();
    creaPage1363.clickMenuProcesoButton();
    creaPage1363.clickInformeCrea1363();

    cy.get("#P157_FECHA_D input").then(($input) => {
      $input.val("03/02/2023");
    });

    cy.get("#P157_FECHA_H input").then(($input) => {
      $input.val("31/02/2023");
    });
    cy.get('#P157_FECHA_D input', { timeout: 10000 }).type('31022021{enter}');
    cy.get('#P157_FECHA_H input', { timeout: 10000 }).type('31022021{enter}');
    //creaPage1363.clickFechaDesdeInput("31022021");
    //creaPage1363.clickFechaHastaInput("31022021");
    creaPage1363.clickConfirmarButton();
    creaPage1363.obtenerNotificacionError();
    creaPage1363.obtenerPrimerMensajeError("Se han producido 2 errores");
    creaPage1363.obtenerAlertaFechaDesde(
      `Fecha Desde: debe ser una fecha válida, por ejemplo: ${fechaActual}.`
    );
    creaPage1363.obtenerAlertaFechaHasta(
      `Fecha Hasta: debe ser una fecha válida, por ejemplo: ${fechaActual}.`
    );

    creaPage1363.obtenerTextoAlertaFechaDesde(
      `Fecha Desde: debe ser una fecha válida, por ejemplo: ${fechaActual}.`
    );
    creaPage1363.obtenerTextoAlertaFechaHasta(
      `Fecha Hasta: debe ser una fecha válida, por ejemplo: ${fechaActual}.`
    );
  });
  it("Validacion del Campo Sucursal desde no debe ser mayor Sucursal Hasta", () => {
    creaPage1363.clickMenuPrincipalButton();
    creaPage1363.clickMenuProcesoButton();
    creaPage1363.clickInformeCrea1363();

    creaPage1363.obtenerSucursalDesde("13");
    creaPage1363.obtenerSucursalHasta("1");
    creaPage1363.clickConfirmarButton();
    creaPage1363.obtenerError("Se ha producido 1 error");
    creaPage1363.obtenerErrorSucursal(
      "Sucursal Desde no debe ser mayor a Sucursal Hasta"
    );
  });
});
