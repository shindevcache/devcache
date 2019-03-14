const { Pool } = require("pg");
const pool = new Pool();

const snippetController = {};

// Middleware Methods

// ------ SHIN devcache ------
/**
 * POST, create snippet
 * EXPECTS: {snippet: '', comments: '', accountid: #}
 */
snippetController.createSnippet = async (req, res, next) => {
  const { snippet, comments, accountid } = req.body;

  const query = {
    text: 'INSERT into snippets (snippet, comments, date_created, accountid) values ($1, $2, current_timestamp, $3) RETURNING id;',
    values: [snippet, comments, accountid]
  };

  try{
    const result = await pool.query(query);
   if(result.rowCount > 0) next();
   else
    next(new Error('Did not add a snippet to your account'));

  }catch(e){
    next(new Error('Insert snippet Error: ' + e));
  }
}
/**
 * GET, create snippet
 * EXPECTS: {accountid: #}
 */

snippetController.getSnippets = async (req, res, next) => {
  if (!req.cookies.ssid) {
    next(new Error('Not authorized'));
    return;
  } 
  const accountid = res.locals.accountid;

  const query = {
    text: 'SELECT * FROM snippets WHERE accountid = $1',
    values: [accountid]
  };

  try {
    const snippets = await pool.query(query);
    if (snippets.rowCount > 0) {
      res.locals.snippets = snippets.rows;
      next();
    } else {
      res.locals.snippets = [];
      next();
    }
  } catch (e) {
    next(new Error('Insert snippet Error: ' + e));
  }
}
snippetController.updateSnippet = async (req, res, next) => {
  const {snippetid, snippet, comments} = req.body;
  const query = {
    text: 'UPDATE snippets SET snippet = $1, comments = $2 WHERE id = $3',
    values: [snippet, comments, snippetid]
  };

  try{
   const result = await pool.query(query);
   next();
  }
  catch(e){
    next(new Error('Problem with updating snippet: ' + e));
  }
}
snippetController.deleteSnippet = (req, res, next) => {
  const {snippetid} = req.body;
  const query = {
    text: 'DELETE FROM snippets WHERE id = $1',
    values: [snippetid]
  };

  try{
   const result = await pool.query(query);
   next();
  }
  catch(e){
    next(new Error('Problem with deleting snippet: ' + e));
  }
}

module.exports = snippetController;