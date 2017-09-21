import {Connection, Request, TYPES, ConnectionConfig} from 'tedious';

// Create connection to database
const config : ConnectionConfig = {
  userName: process.env.DB_USER, // update me
  password: process.env.DB_PASSWORD, // update me
  server: process.env.DB_SERVER,
  options: {
      database: process.env.DB_NAME
  }
};

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {

  if (err) {
    console.log(err);
  } else {
    console.log('Connected');
  }
});