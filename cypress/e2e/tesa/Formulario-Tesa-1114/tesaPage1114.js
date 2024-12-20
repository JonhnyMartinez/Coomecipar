export class TesaPage1114 {
  constructor() {
    // #region --------SELECTORES CARGAR REGISTRO EXITOSO-------------///////////
    this.menuPrincipalButton = "#t_Button_navControl";
    this.menuProcesoButton = "#t_TreeNav_2 > :nth-child(3)";
    this.informeExtraccionButton = "#t_TreeNav_10 > div.a-TreeView-content > a";
    this.nroCajaButton = "#P343_ID_CAJA_lov_btn";
    this.nroDatosTable = "tbody tr";
    this.nroSolicitudButton = "#P343_ID_REPOSICION_lov_btn";
    this.nroSolicitudDatosTable = "#P343_ID_REPOSICION_lov_btn";
    this.confirmarButton = "#btnconfirmar";
    // #endregion

    // #region --------SELECTORES VALIDACIONES DEL MENSAJE DE ERROR-------------///////////
    this.contenedorMensaje = ".t-Alert-content";
    this.mensajeErrorTitle = ".a-Notification-title";
    this.mensajeErrorItem = ".a-Notification-item";
    // #endregion

    // #region --------SELECTORESVALIDACIONES DE CAMPOS DEL FORMULARIO-------------///////////
    this.fechaSys = "#P0_FECHA_1_DISPLAY";
    this.tituloCabeceraTxt = "#P0_NOMBRE_1_DISPLAY";
    this.sucursalLabel = "#P343_ENTIDAD_NUMERO_SUCURSAL_LABEL";
    this.nroSucursalInput =
      "#P343_ENTIDAD_NUMERO_SUCURSAL_CONTAINER > div.t-Form-inputContainer";
    this.nroSucursalIdTxt = "#P343_ENTIDAD_NUMERO_SUCURSAL";
    this.nombreSucursalLabel = "#P343_SUCURSAL_NOMBRE_LABEL";
    this.containerNombresucursal =
      "#P343_SUCURSAL_NOMBRE_CONTAINER > div.t-Form-inputContainer";
    this.nombreSucursalId = "#P343_SUCURSAL_NOMBRE";
    this.idTesoreriaLabel = "#P343_ID_TESORERIA_LABEL";
    this.containerIdTesoreria =
      "#P343_ID_TESORERIA_CONTAINER > div.t-Form-inputContainer";
    this.tesoreriaId = "#P343_ID_TESORERIA";
    this.cajaNroCajaLabel = "#P343_ID_CAJA_LABEL";
    this.solicitudLabel = "#P343_ID_REPOSICION_LABEL";
    // #endregion
  }

  //--------EMPIEZA EL LLAMADO A LOS CONSTRUCTORES--------//

  // #region --------   CARGAR REGISTRO EXITOSO              ---------///////////
  clickMenuPrincipalButton() {
    cy.get(this.menuPrincipalButton).click();
  }
  clickMenuProcesoButton() {
    cy.get(this.menuProcesoButton).click();
  }
  clickInformeExtraccionButton() {
    cy.get(this.informeExtraccionButton).click();
  }
  clickNroCajaButton() {
    cy.get(this.nroCajaButton).click();
  }
  clickNroCajaDatosTabla(nombreCaja) {
    return cy.get(this.nroDatosTable).contains(nombreCaja).click();
  }
  clickNroSolicitudButton() {
    cy.get(this.nroSolicitudButton).click();
  }
  clickNroCajaDatosTabla(nroSolicitud) {
    return cy.get(this.nroDatosTable).contains(nroSolicitud).click();
  }
  clickConfirmarButton() {
    cy.get(this.confirmarButton).click();
  }
  // #endregion

  // #region --------   VALIDACIONES DEL MENSAJE DE ERROR    ---------///////////
  obtenerMensajeError(mensajeErrorTitle, mensajeErrorItem) {
    return cy.get(this.contenedorMensaje).within(() => {
      cy.get(this.mensajeErrorTitle)
        .invoke("text")
        .should("eq", mensajeErrorTitle);
      cy.get(this.mensajeErrorItem)
        .invoke("text")
        .should("include", mensajeErrorItem);
    });
  }
  // #endregion

  // #region --------   VALIDACIONES DE CAMPOS DEL FORMULARIO ---------///////////
  obtenerFechaSys(fechaSys) {
    return cy
      .get("#P0_FECHA_1_DISPLAY")
      .invoke("text")
      .then((text) => {
        expect(text).to.equal(fechaSys);
      });
  }
  obtenerTituloCabeceraTxt(tituloCabecera) {
    return cy
      .get(this.tituloCabeceraTxt)
      .invoke("text")
      .should("eq", tituloCabecera);
  }

  obtenerNombreSucursalLabel(nombreLabel) {
    cy.get(this.sucursalLabel).invoke("text").should("eq", nombreLabel);
  }
  obtenerNroSucursal(nroSucursal) {
    return cy.get(this.nroSucursalInput).within(() => {
      cy.get(this.nroSucursalIdTxt).invoke("val").should("equal", nroSucursal);
    });
  }
  obtenerSucursalLabel(nombreLabel) {
    cy.get(this.nombreSucursalLabel).invoke("text").should("eq", nombreLabel);
  }
  obtenerNombreSucursal(nombreSucursal) {
    cy.get(this.containerNombresucursal).within(() => {
      cy.get(this.nombreSucursalId)
        .invoke("val")
        .should("equal", nombreSucursal);
    });
  }
  obtenerNombreTesoreriaLabel(tesoreriaLabel) {
    cy.get(this.idTesoreriaLabel).invoke("text").should("eq", tesoreriaLabel);
  }
  obtenerValorTesoreria(valorTesoreria) {
    cy.get(this.containerIdTesoreria).within(() => {
      cy.get(this.tesoreriaId).invoke("val").should("equal", valorTesoreria);
    });
  }
  obtenerTitutoNroCaja(nrocajaLabel) {
    cy.get(this.cajaNroCajaLabel).invoke("text").should("eq", nrocajaLabel);
  }
  obtenerTituloSolicitud(solicitudLabel) {
    cy.get(this.solicitudLabel).invoke("text").should("eq", solicitudLabel);
  }
  // #endregion
}
