export class CreaPage1363 {
  constructor() {
    //#region // ----- VISUALIZAR EL INFORME ------//
    this.menuPrincipalButton = "#t_Button_navControl";
    this.menuProcesoButton = "#t_TreeNav_4 > div.a-TreeView-content";
    this.informeCrea1363 = "#t_TreeNav_22 > div.a-TreeView-content";
    this.sucursalDesde = "#P157_SUCURSAL_D";
    this.sucursalHasta = "#P157_SUCURSAL_H";
    this.fechaDesde = "#P157_FECHA_D\\|input";
    this.fechaHasta = "#P157_FECHA_H\\|input";
    this.nroSocioButton = "#P157_NRO_SOCIO_lov_btn";
    this.contenedorDatosTable = "body tr";
    this.confirmarButton = "#btnconfirmar";
    this.inputNroSocio =
      "#PopupLov_157_P157_NRO_SOCIO_dlg > div.a-PopupLOV-searchBar > input";

    //#endregion

    // #region // ----- VALIDACIONES DE LOS CAMPOS DEL FORMULARIO -----//
    this.cabeceraNombre = "#P0_NOMBRES_DISPLAY";
    this.sucursalDesdeLabel = "#P157_SUCURSAL_D_LABEL";
    this.sucursalHastaLabel = "#P157_SUCURSAL_H_LABEL";
    this.fechaDesdeLabel = "#P157_FECHA_D_LABEL";
    this.nroSocioLabel = "#P157_NRO_SOCIO_LABEL";
    this.tipoServicioLabel = "#P157_TIPO_SERVICIO_LABEL";
    //#endregion

    //#region // ----- VALIDACION FECHADESDE MAYO A FECHAHASTA -----///
    this.fechaDesdeInput = "#P157_FECHA_D\\|input";
    this.fechaHastaInput = "#P157_FECHA_H\\|input";
    this.notificacionErrorAlert = ".a-Notification.a-Notification--error";
    this.notificacionErrorTitle1 = ".a-Notification-title.aErrMsgTitle";
    this.notificacionErrorTitle2 = ".a-Notification-item.htmldbStdErr";
    //#endregion

    //#region // ----- VALIDACION DE FECHA INVALIDO -----///
    this.alertaFechaDesde =
      "#t_Alert_Notification > div > div.t-Alert-content > div > div > ul > li:nth-child(1)";
    this.alertaFechaHasta =
      "#t_Alert_Notification > div > div.t-Alert-content > div > div > ul > li:nth-child(2)";
    this.textoAlertaFechaDesde = "#P157_FECHA_D_error";
    this.textpAlertaFechaHasta = "#P157_FECHA_D_error";
    //#endregion

    //#region // ----- VALIDACION CAMPO SUCURSAL DESDE NO DEBE SER MAYOR SUCURSAL HASTA -----///
    this.sucursalDesdeSelect = "#P157_SUCURSAL_D";
    this.sucursalHastaSelect = "#P157_SUCURSAL_H";
    //#endregion
  }

  //#region // ----- VISUALIZAR EL INFORME ------//
  clickMenuPrincipalButton() {
    cy.get(this.menuPrincipalButton).click();
  }
  clickMenuProcesoButton() {
    cy.get(this.menuProcesoButton).click();
  }
  clickInformeCrea1363() {
    cy.get(this.informeCrea1363).click();
  }
  clickSucursalDesde(valorDesde) {
    return cy.get(this.sucursalDesde).select(valorDesde);
  }
  clickSucursalHasta(valorHasta) {
    return cy.get(this.sucursalHasta).select(valorHasta);
  }
  clickFechaDesde(valorDesde) {
    return cy.get(this.fechaDesde).type(valorDesde).type("{enter}");
  }
  clickFechaHasta(valorHasta) {
    return cy.get(this.fechaHasta).type(valorHasta).type("{enter}");
  }
  clickNroSocioButton() {
    cy.get(this.nroSocioButton).click();
  }
  clickContenedorDatosTable(nombreSocio) {
    cy.get(this.contenedorDatosTable).contains(nombreSocio).click();
  }
  clickConfirmarButton() {
    cy.get(this.confirmarButton).click();
  }
  clickInputNroSocio(nroSocio) {
    cy.get(this.inputNroSocio).type(nroSocio).type("{ENTER}");
  }

  //#endregion

  //#region // ----- VALIDACIONES DE LOS CAMPOS DEL FORMULARIO -----//
  obtenerCabeceraNombre(textoCabecera) {
    cy.get(this.cabeceraNombre).invoke("text").should("eq", textoCabecera);
  }
  obtenerSucursalDesdeLabel(textoLabel) {
    return cy
      .get(this.sucursalDesdeLabel)
      .invoke("text")
      .should("eq", textoLabel);
  }
  obtenerSucursalHastaLabel(textoLabel) {
    return cy
      .get(this.sucursalHastaLabel)
      .invoke("text")
      .should("eq", textoLabel);
  }
  obtenerFechaDesdeLabel(textoLabel) {
    return cy.get(this.fechaDesdeLabel).invoke("text").should("eq", textoLabel);
  }
  obtenerNroSocioLabel(textoLabel) {
    return cy.get(this.nroSocioLabel).invoke("text").should("eq", textoLabel);
  }
  obtenerTipoServicioLabel(textoLabel) {
    return cy
      .get(this.tipoServicioLabel)
      .invoke("text")
      .should("eq", textoLabel);
  }
  //#endregion

  //#region // ----- VALIDACION FECHADESDE MAYO A FECHAHASTA -----///
  clickFechaDesdeInput(fechaDesde) {
    cy.get(this.fechaDesdeInput).type(fechaDesde).type("{enter}");
  }
  clickFechaHastaInput(fechaHasta) {
    cy.get(this.fechaHastaInput).type(fechaHasta).type("{enter}");
  }
  obtenerNotificacionError() {
    cy.get(this.notificacionErrorAlert).should("be.visible");
  }
  obtenerPrimerMensajeError(mensajeError) {
    return cy
      .get(this.notificacionErrorTitle1)
      .invoke("text")
      .should("eq", mensajeError);
  }
  obtenerSegundoMensajeError(mensajeError) {
    return cy
      .get(this.notificacionErrorTitle2)
      .invoke("text")
      .should("include", mensajeError);
  }

  //#endregion

  //#region // ----- VALIDACION DE FECHA INVALIDO -----///
  obtenerAlertaFechaDesde(fechaDesde) {
    return cy
      .get(this.alertaFechaDesde)
      .invoke("text")
      .should("include", fechaDesde);
  }
  obtenerAlertaFechaHasta(fechaHasta) {
    return cy
      .get(this.alertaFechaHasta)
      .invoke("text")
      .should("include", fechaHasta);
  }
  obtenerTextoAlertaFechaDesde(fechaDesde) {
    return cy
      .get(this.textoAlertaFechaDesde)
      .invoke("text")
      .should("include", fechaDesde);
  }

  obtenerTextoAlertaFechaHasta(fechaHasta) {
    return cy
      .get("#P157_FECHA_H_error")
      .invoke("text")
      .should("include", fechaHasta);
  }
  //#endregion

  //#region // ----- VALIDACION CAMPO SUCURSAL DESDE NO DEBE SER MAYOR SUCURSAL HASTA -----///
  obtenerSucursalDesde(nombreSucursalDesde) {
    return cy.get(this.sucursalDesdeSelect).select(nombreSucursalDesde);
  }
  obtenerSucursalHasta(nombreSucursalHasta) {
    return cy.get(this.sucursalHastaSelect).select(nombreSucursalHasta);
  }
  obtenerError(mensajeError) {
    return cy
      .get(this.notificacionErrorTitle1)
      .invoke("text")
      .should("eq", mensajeError);
  }
  obtenerErrorSucursal(mensajeError) {
    return cy
      .get(this.notificacionErrorAlert)
      .should("be.visible")
      .within(() => {
        cy.get(this.notificacionErrorTitle2)
          .invoke("text")
          .should("include", mensajeError);
      });
  }

  //#endregion
}
