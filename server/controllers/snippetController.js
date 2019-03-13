const { Pool } = require("pg");
const pool = new Pool();

const snippetController = {};

// Middleware Methods

// ------ SHIN devcache ------
/**
 * POST, create snippet
 * EXPECTS: {snippets: '', comments: '', accountid: #}
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
  const { accountid } = req.body;

  const query = {
    text: 'SELECT * FROM snippets WHERE id = $1',
    values: [accountid]
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



// -----  OLD devcache ------
snippetController.createTags = (req, res) => {
  const promises = [];
  const snippet_id = res.locals.snippet_id;
  const tags = req.body.tags.split(", "); // split on comma, then strip whitespace

  tags.forEach(tag => {
    const tagQuery = {
      name: 'create-tags',
      text: 'INSERT into tags (tag, snippet_id) values ($1, $2);',
      values: [tag, snippet_id]
    };

    promises.push(tagQuery);
  });

  Promise.all(promises)
  .then(values => {
    values.forEach(tagQuery => pool.query(tagQuery));
    res.status(201).send('Tags added.');
  })
  .catch(err => console.log(err.message));
}

snippetController.getAllUserTags = (req, res) => {
  const user_id = req.cookies.user_id;
  const query = {
    name: 'get-all-tags',
    text: 'SELECT tags.tag FROM tags INNER JOIN snippets ON snippets.id = tags.snippet_id WHERE snippets.user_id = $1;',
    values: [user_id]
  };

  pool.query(query)
  .then(result => {
    const tags = [];
    result.rows.forEach(obj => tags.push(obj.tag));
    res.json(tags);
  });
};

snippetController.getSnippetIdsByTag = (req, res, next) => {
  const tag = req.query.tag;
  const IdQuery = {
    name: 'getSnippetIdsByTag',
    text: 'SELECT snippet_id FROM tags WHERE tags.tag = $1;',
    values: [tag]
  };

  pool.query(IdQuery)
  .then(result => {
    const resultArr = [];
    result.rows.forEach(row => resultArr.push(row.snippet_id));
    res.locals.snippets = resultArr;
    next();
  })
  .catch(err => console.error(err.stack));
};

snippetController.getSnippetsBySnippetIds = (req, res) => {
  const snippetIds = res.locals.snippets;
  const userId = req.cookies.user_id;
  const promises = [];

  snippetIds.forEach(id =>{
    const query = {
      name: 'getSnippetsBySnippetId', 
      text: 'SELECT * FROM snippets WHERE snippets.id = $1 AND snippets.user_id = $2;',
      values: [id, userId]
    };

    promises.push(query);
  });

  Promise.all(promises)
  .then(snippetQuery => {
    const resultsArr = [];
    snippetQuery.forEach((x, y) => {
      if (y < 2) resultsArr.push(pool.query(x));
    });

    Promise.all(resultsArr)
    .then(snippets => {
      let arr = []; 
      snippets.forEach(obj => arr.push(obj.rows));
      res.json(arr);
    }) 
    .catch(err => console.error(err.stack));
  });
};

snippetController.deleteSnippet = (req, res) => {
  const id = req.query.id;
  const deleteQuery = {
    name: 'delete-snippet',
    text: 'DELETE FROM snippets WHERE snippets.id = $1;',
    values: [id]
  };

  pool.query(deleteQuery)
  .then(data => {
    res.status(200).send('Snippet deleted.')
  });
};

module.exports = snippetController;