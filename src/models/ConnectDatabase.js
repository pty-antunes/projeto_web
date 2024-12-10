const mysql = require("mysql2/promise");

const client = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "admin",
  database: "bookmanager",
});

const testConnection = async () => {
  try {
    await client.query("SELECT 1");
    console.log("MySQL conectado com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    throw error;
  }
};


exports.query = async (_query, values) => {
  try {
    console.log("Query executada:", _query);
    console.log("Valores:", values);

    const [rows] = await client.execute(_query, values);
    console.log("Resultado da consulta:", rows); 
    return rows;
  } catch (error) {
    console.error("Erro na consulta ao banco de dados:", error);
    throw error;
  }
}


exports.testConnection = testConnection;
