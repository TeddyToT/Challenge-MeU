const { Pool } = require('pg')
const host ='db';
const port = process.env.PG_PORT || 5432;
const user = process.env.PG_USER || 'postgres';
const password = process.env.PG_PASSWORD || 'abc123';
const database = process.env.PG_DATABASE || 'mydb';

const connectionString = 'postgresql://' + user + ':' + password + '@' + host + ':' + port + '/' + database
console.log("connect string: ", connectionString);

// const dbConfig = {    
//     host: host||'127.0.0.1',
//     port: port||5432,
//     user: user||'postgres',
//     password: password||'abc123',
//     database: database||'testdb'
//   }
const pool = new Pool({
    // host: host||'localhost',
    // port: port||5432,
    // user: user||'postgres',
    // password: password||'abc123',
    // database: database||'testdb'
    connectionString

    // dbConfig
})
// console.log('Attempting to connect to PostgreSQL with config:', dbConfig);

pool
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database", err);
  });

module.exports = pool