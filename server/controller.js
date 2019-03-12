const { Pool } = require("pg");
const pool = new Pool();

const uuid = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 3;

const controller = {};

// Middleware Methods

controller.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  const query = {
    name: 'verify-user',
    text: 'SELECT * FROM accounts WHERE username = $1;',
    values: [username]
  };

  pool.query(query)
  .then(result => {
    const hash = result.rows[0].password;

    bcrypt.compare(password, hash, function(err, judgement){
      if (judgement) {
        const session_id = uuid();
        res.locals.session_id = session_id;
        res.locals.user_id = result.rows[0].user_id;
        next();
      } else {
        res.status(403).send('wrong pass :(');
      };
    });
  })
  .catch(err => console.error(err.stack));
  next();
};

controller.createUser = (req, res, next) => {
  const { fullname, username, email, password } = req.body;

  console.log(req.body);
  bcrypt.hash(password, saltRounds, (err, hash) => {
    const query = {
      name: 'create-user',
      text: 'INSERT INTO accounts(fullname, username, email, password, date_created) VALUES($1, $2, $3, $4, current_timestamp) RETURNING id;',
      values: [fullname, username, email, hash]
    };

    pool.query(query)
    .then(result => {
      console.log('After query', result);
      console.log('RECORD', result.rows[0]);
      const session_id = uuid();
      res.locals.session_id = session_id;
      res.locals.user_id = result.rows[0].id;
      next();
    })
    .catch(err => console.error(err.stack));
  });
  next()
};

module.exports = controller;