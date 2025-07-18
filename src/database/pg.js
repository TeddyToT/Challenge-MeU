const { Pool } = require('pg')
const host = process.env.PG_HOST||'localhost'; //change to "db" when use docker-compose
const port = process.env.PG_PORT || 5432;
const user = process.env.PG_USER || 'postgres';
const password = process.env.PG_PASSWORD || 'abc123';
const database = process.env.PG_DATABASE || 'mydb';

const connectionString = 'postgresql://' + user + ':' + password + '@' + host + ':' + port + '/' + database
console.log("connect string: ", connectionString);


const pool = new Pool({
    // host: host||'db',
    // port: port||5432,
    // user: user||'postgres',
    // password: password||'abc123',
    // database: database||'testdb'
    connectionString


})


pool
  .connect()
  .then((client) => {
    console.log("Connected to PostgreSQL database");
    return client
      .query('SELECT NOW()')
      .then((res) => {
        console.log("Current time:", res.rows[0]);
      })
      .catch((err) => {
        console.error("Query error", err);
      })
      .finally(() => {
        client.release();
      });
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database", err);
  });

module.exports = pool