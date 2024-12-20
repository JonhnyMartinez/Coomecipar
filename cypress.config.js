const { defineConfig } = require("cypress");
const oracledb = require("oracledb");

// Inicializar cliente Oracle Instant Client
oracledb.initOracleClient({ libDir: "C:\\Oracle\\instantclient_23_6" });

const dbConfig = {
  user: "coomecipar",
  password: "d3sa01",
  connectString: "172.31.120.2:1521/TEST",
};

module.exports = defineConfig({
  e2e: {
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      embeddedScreenshots: true,
      html: true,
      json: true,
    },
    video: true,
    retries: 1,
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);

      // Tarea para ejecutar consultas en la base de datos
      on("task", {
        async executeQuery(query) {
          let connection;
          try {
            // Establecer la conexión con autoCommit desactivado
            connection = await oracledb.getConnection({
              ...dbConfig,
              autoCommit: false,
            });

            // Ejecutar la consulta SQL
            const result = await connection.execute(query, [], {
              outFormat: oracledb.OUT_FORMAT_OBJECT,
            });

            // Confirmar la transacción manualmente
            await connection.commit();

            return result.rows;
          } catch (err) {
            console.error("❌ Error al ejecutar consulta:", err);
            throw new Error(`Database query failed: ${err.message}`);
          } finally {
            // Cerrar la conexión después de la consulta
            if (connection) {
              try {
                await connection.close();
              } catch (closeErr) {
                console.error("❌ Error al cerrar la conexión:", closeErr);
              }
            }
          }
        },
      });
    },
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
    fixturesFolder: "cypress/e2e/",
  },

  env: {
    ORACLE_USER: "coomecipar",
    ORACLE_PASSWORD: "d3sa01",
    ORACLE_CONNECTION: "172.31.120.2:1521/TEST",
    tesoreriaUrl:
      "https://siga-d1.coomecipar.coop.py/ords/f?p=164:1:13180828029202:::::",
    creditoUrl:
      "https://siga-d1.coomecipar.coop.py/ords/f?p=188:LOGIN_DESKTOP:11228941593465:::::&tz=-3:00",
  },
});
