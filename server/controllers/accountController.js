const { Pool } = require("pg");
const pool = new Pool();

const uuid = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 3;

const accountController = {};

// Middleware Methods

// accountController.verifyUser = (req, res, next) => {
//   const { username, password } = req.body;
//   const query = {
//     name: 'verify-user',
//     text: 'SELECT * FROM accounts WHERE username = $1;',
//     values: [username]
//   };

//   pool.query(query)
//   .then(result => {
//     const account = result.rows[0];
//     const hash = result.rows[0].password;

//     bcrypt.compare(password, hash, function(err, judgement){
//       if (judgement) {
//         const session_id = uuid();
//         res.locals.session_id = session_id;
//         res.locals.accountid = result.rows[0].accountid;
//         res.locals = { account };
//         next();
//       } else {
//         res.status(403).send('wrong pass :(');
//       };
//     });
//   })
//   .catch(err => console.error(err.stack));
// };

/**
 * SETS: the newly inserted record to res.locals.accountid
 */
accountController.createAccount = (req, res, next) => {
  const { fullname, username, email, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    const query = {
      name: 'create-user',
      text: 'INSERT INTO accounts(fullname, username, email, password, date_created) VALUES($1, $2, $3, $4, current_timestamp) RETURNING id;',
      values: [fullname, username, email, hash]
    };

    pool.query(query)
    .then(result => {
      if(result.rowCount > 0){
        res.locals.accountid = result.rows[0].id;
        next();
      }else{
        next(new Error('User not created'));
      }
    })
    .catch(err => console.error(err.stack));
  });
};

/**
 * RETURNS: account object
 * {id, fullname, username, email, password, token, date_create}
 */
accountController.getAccount = async (req, res, next) => {
  let id = res.locals.accountid;
  try{
    const record = await pool.query('SELECT * FROM accounts WHERE id = $1', [id]);
    res.locals.account = record.rows[0];
    next();
  }
  catch(e){
    next(new Error('Trouble retriving account'));
  }
}
/**
 * SETS: the verified record to res.locals.id
 * 
 * Check: 
 * TODO: Session/Cookies? 
 * TODO: Login?
 */
accountController.verifyAccount = async (req, res, next) => {
  const {username, password} = req.body;

  try{
    const result = await pool.query('SELECT * FROM accounts WHERE username = $1', [username]);

    if(result.rowCount > 0){
      const match = bcrypt.compareSync(password, result.rows[0].password);
      if(match){
        res.locals.accountid = result.rows[0].id;
        next();
      }else
        next(new Error('Wrong user/password, please try again'));
      
    }else
      next(new Error('Wrong user/password, please try again')); 
  }
  catch(e){
    next(new Error('Encountered an issue verifying and account'))
  }
}

accountController.logoutAccount = async (req, res, next) => {
  const { ssid } = req.cookies;
  const query = {
    text: 'UPDATE accounts SET token = null WHERE token = $1',
    values: [ssid]
  }

  try{
    await pool.query(query);
    res.cookie('ssid', '', {expires: new Date(0)});
    next();
  }catch(e){
    next(new Error('Problem on logout: ' + e));
  }
}

module.exports = accountController;