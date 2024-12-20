// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.on("uncaught:exception", (err, runnable) => {
  // Aquí puedes filtrar las excepciones específicas que deseas ignorar
  if (
    err.message.includes(
      "Failed to execute 'getInstalledRelatedApps' on 'Navigator'"
    )
  ) {
    // Si el error contiene este mensaje, omítelo
    return false; // No falla la prueba, y Cypress continúa la ejecución
  }

  // Si el error es diferente, lo dejamos para que falle la prueba
  return true; // Continúa con el comportamiento por defecto (falla la prueba)
});
Cypress.on("uncaught:exception", (err, runnable) => {
  return false; // Ignora todas las excepciones
});




