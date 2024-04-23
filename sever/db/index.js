const { Pool } = require("pg");
const db = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://localhost:8080/34d_juicebox",
});

async function query(sql, params, callback) {
  return db.query(sql, params, callback);
}

module.exports = { query };