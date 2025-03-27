const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'secret',
  database: 'bd_lab2_ej2',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

function handleDisconnect() {
  connection.connect(err => {
    if (err) {
      console.log('Error al conectar a la base de datos:', err.message);
      console.log('Reintentando en 5 segundos...');
      setTimeout(handleDisconnect, 5000);
      return;
    }
    console.log('Conectado a MySQL correctamente');
  });

  connection.on('error', err => {
    console.log('Error de MySQL:', err.message);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = connection;