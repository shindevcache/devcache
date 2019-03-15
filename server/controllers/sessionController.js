const { Pool } = require("pg");
const pool = new Pool();

const uuid = require('uuid');
const sessionController = {};

// Middleware Methods
sessionController.setCookie = (req, res, next) => {
  if(res.locals.isSession) return next();

  let d = new Date(Date.now());
  const tokenOptions = {
    expires: new Date(d.getFullYear(),d.getMonth(), d.getDate()+1),
    httpOnly: true
  }
  res.cookie('ssid', res.locals.token, tokenOptions);
  next();
};

sessionController.startSession = (req, res, next) => {
  if(res.locals.isSession) return next();

  const token = uuid();
  res.locals.token = token;

  const query = {
    name: 'create-session',
    text: 'UPDATE accounts SET token = $1 where id = $2;',
    values: [res.locals.token, res.locals.accountid]
  };

  pool.query(query)
  .then(() => {
    next()
    // res.status(201).send(result);
  }).catch(e => next(new Error('Problem - starting session: ' + e)));
};

// verify session and get the account id if found
sessionController.verifySession = async (req, res, next) => {
  if(!res.locals.isSession) return next();

  const query = {
    text: 'SELECT * FROM accounts WHERE token = $1',
    values: [req.cookies.ssid]
  };
  try {
    const account = await pool.query(query);
    if (account.rowCount) {
      res.locals.accountid = account.rows[0].id;
      next();
    }else{
      res.cookie('ssid', '', {expires: new Date(0)});
      res.end('Session expired');
    }
  }
  catch (e) {
      next(new Error('Session validation issue: ' + e));
  }
};
sessionController.validateSession = async (req, res, next) => {
  const query = {
    text: 'SELECT * FROM accounts WHERE token = $1',
    values: [req.cookies.ssid]
  };
  try {
    const account = await pool.query(query);
    if (account.rowCount) {
      res.locals.accountid = account.rows[0].id;
      next();
    }else{
      next(new Error('Not authorized'));
    }
  }
  catch (e) {
      next(new Error('Session validation issue: ' + e));
  }
};

module.exports = sessionController;