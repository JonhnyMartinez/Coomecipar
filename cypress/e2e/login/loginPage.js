export class LoginPage {
  constructor() {
    this.usernameInput = "#P9999_USERNAME";
    this.passwordInput = "#P9999_PASSWORD";
    this.loginButton = "#LOGIN";
  }

  completarLogin(username, password) {
    cy.get(this.usernameInput).type(username);
    cy.get(this.passwordInput).type(password);
    cy.get(this.loginButton).click();
  }
}
