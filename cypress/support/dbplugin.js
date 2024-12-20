// https://www.sitepoint.com/javascript-design-patterns-singleton/
// https://github.com/cypress-io/cypress/issues/2914
const DbPluginUtil = {
  async setupDb(user, password, connectionString, connection) {
    // has to be in this method or even importing this file will break stuff in cypress
    const oracledb = require("oracledb");
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    oracledb.autoCommit = true;
    // oracledb.initOracleClient({configDir: config['TNS_ADMIN_LOCATION']});

    connection = await oracledb.getConnection({
      user,
      password,
      connectString: connectionString,
    });
    return connection;
  },

  async testConnection(user, password, connectionString, connection) {
    if (!connection) {
      return await this.setupDb(user, password, connectionString, connection);
    }
    return connection;
  },

  async executeInIntermediateDB(statement, binding, connection) {
    return this.execute(statement, binding, connection);
  },

  async execute(statement, binding, connection) {
    console.log(`la conexion: ${connection}`);
    try {
      console.log(`----------------------------`);
      console.log(
        `Running query:\n${statement}\nBindings:\n${JSON.stringify(binding)}`
      );
      console.log(`----------------------------`);
      return await connection.execute(statement, binding);
    } catch (e) {
      throw new Error("failed to execute: " + statement + "\n" + e.message);
    }
  },

  async closeConnection(connection) {
    try {
      if (connection) {
        await connection.close();
        console.log("Connection closed successfully.");
      }
    } catch (e) {
      console.error("Error while closing connection:", e);
    }
  },
};

Object.freeze(DbPluginUtil);

function loadDBPlugin() {
  return {
    async executeInIntermediateDB({ statement, binding = {} }) {
      let intermediateDB;
      intermediateDB = await DbPluginUtil.testConnection(
        "coomecipar",
        "d3sa01",
        "172.31.120.2:1521/TEST",
        intermediateDB
      );
      const result = await DbPluginUtil.executeInIntermediateDB(
        statement,
        binding,
        intermediateDB
      );
      await DbPluginUtil.closeConnection(intermediateDB);
      return result;
    },
  };
}

module.exports = {
  loadDBPlugin,
};
