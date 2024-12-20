const oracledb = require('oracledb');

// Configuración del cliente Oracle Instant
oracledb.initOracleClient({ libDir: 'C:\\Oracle\\instantclient_23_6' });

const dbConfig = {
  user: "coomecipar",
  password: "d3sa01",
  connectString: "172.31.120.2:1521/TEST",
};

async function testConnection() {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    console.log("✅ Conexión exitosa a Oracle DB");

    const result = await connection.execute(`
      SELECT *
      FROM REPOSICIONES_FONDOS rf
      WHERE rf.ENTIDAD_DATO_SUCURSAL = 1
        AND rf.ENTIDAD_NUMERO_SUCURSAL = 1
        AND rf.ID_TESORERIA = 4
        AND rf.id_reposicion = '178648'
    `);

    await connection.close();

    return result.rows;
  } catch (err) {
    console.error("❌ Error de conexión o consulta:", err);
    return null;
  }
}

module.exports = {
  testConnection
};
