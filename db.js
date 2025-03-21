const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuração da conexão com o MySQL RDS
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'seu-endpoint-rds.amazonaws.com',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'sua-senha',
  database: process.env.DB_NAME || 'tarefas_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Função para testar a conexão
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    connection.release();
    return true;
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    return false;
  }
}

module.exports = {
  pool,
  testConnection
};
