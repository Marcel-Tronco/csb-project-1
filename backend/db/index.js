const { Pool } = require('pg')
const pool = new Pool(/*{
    user: 'user',
    host: 'pp-db-svc.main-ns',
    database: 'pp-db',
    password: 'example',
    port: 5432,
}*/)
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
  syncquery: (text, params) => {
    return pool.query(text, params)
  },
}