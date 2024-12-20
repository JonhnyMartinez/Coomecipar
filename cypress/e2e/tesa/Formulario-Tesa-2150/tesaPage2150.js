export class TesaPage2150 {
  constructor() {
    //#region
    this.giraduriaCajaButton = "#t_TreeNav_6 > :nth-child(3)";
    this.operacionGiraduriaButton = "#t_TreeNav_8 > :nth-child(3)";
    this.ordenesPagoButton = "#t_TreeNav_147 > :nth-child(3)";
    this.autorizacionOPButton = "#t_TreeNav_149 > .a-TreeView-content";
    this.nroModuloButton = "#P380_B1_DSP_NUMERO_MODULO_lov_btn";
    this.tableDatos = "[id='5480142093895909434_orig'] > tbody >tr > td";
    this.headersTable = "[headers='C5480142849467909442']";
    this.inputCheck = "a > input";
    this.confirmarButton = "#btnconfirmar";
    this.fechaSistema = "#P0_FECHA_1_DISPLAY";
    this.rechazarButton = "#btnrechazar";
    //#endregion
  }
  

  //#region
  clickGiraduriaCajaButton(nameButton) {
    return cy
      .get(this.giraduriaCajaButton)
      .filter(`:contains(${nameButton})`)
      .click();
  }
  clickOperacionGiraduriaButtonnameButton(nameButton) {
    return cy
      .get(this.operacionGiraduriaButton)
      .filter(`:contains(${nameButton})`)
      .click();
  }
  clickOrdenesPagoButton(nameButton) {
    return cy
      .get(this.ordenesPagoButton)
      .filter(`:contains(${nameButton})`)
      .click();
  }
  clickAutorizacionOPButton(nameButton) {
    return cy
      .get(this.autorizacionOPButton)
      .filter(`:contains(${nameButton})`)
      .click();
  }
  clickNroModuloButton() {
    cy.get(this.nroModuloButton).click();
  }
  clickModuloId(targetDataId) {
    return cy.get(`tr[data-id="${targetDataId}"]`).click();
  }
  clickTextoModulo(nombreBeneficiario) {
    cy.contains(this.tableDatos, nombreBeneficiario)
      .siblings(this.headersTable)
      .find(this.inputCheck)
      .check();
  }
  clickConfirmarButton() {
    cy.get(this.confirmarButton).click();
  }
  obtenerFechaSistema(fechaFormateada) {
    return cy
      .get(this.fechaSistema)
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.include(fechaFormateada);
      });
  }
  clickRechazarButton() {
    cy.get(this.rechazarButton).click();
  }
  //#endregion
}
