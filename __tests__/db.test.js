const { Pool } = require('pg')
const pool = new Pool()

// pool.query()

describe('Database Test', () => {
  describe('check if user exists', () => {
    it('expect return at least one row', () => {
      pool.query("SELECT * FROM users WHERE username = 'John';")
        .then( queryResult => {
          console.log('queryResult', queryResult.rows);
          expect(queryResult.rowCount).toBe(1)
      })
      
    })
  })
})