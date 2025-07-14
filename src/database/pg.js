const { Pool } = require('pg')
const host = process.env.PG_HOST;
const port = process.env.PG_PORT;
const user = process.env.PG_USER;
const password = process.env.PG_PASSWORD;
const database = process.env.PG_DATABASE;


const pool = new Pool({
    host: host||'db',
    port: port||5432,
    user: user||'user1',
    password: password||'password123',
    database: database||'db123'
})

pool
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database", err);
  });

module.exports = pool