const postgres = require('postgres')

const sql = postgres(process.env.PG_DATABASE_URL, {})

module.exports = sql