require('dotenv').config();
const pg = require('pg');

const client = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'banco-pw2',
  password: process.env.DATABASE_PASSWORD,
  port: 5432
});

  module.exports = client