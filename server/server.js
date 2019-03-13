require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

// Import Controllers
const accountController = require('./controllers/accountController.js');
const sessionController = require('./sessionController.js');
const snippetController = require('./snippetController.js');

// Blanket Calls
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/build', express.static(path.join(__dirname, '../build')));
 
// GET Endpoints
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});
app.get('/gettags', snippetController.getAllUserTags);
app.get('/getsnippetsbytag', snippetController.getSnippetIdsByTag, snippetController.getSnippetsBySnippetIds);
app.get('/deletesnippetbyid', snippetController.deleteSnippet);

// POST Endpoints
/**
 * LOGIN
 * 
 * 1. Verify account
 * 2. Get account
 * 3. TODO: Create session
 * 4. TODO: Set cookie
 */
// app.post('/login', accountController.verifyUser, sessionController.setCookie, sessionController.startSession);
app.post('/login', accountController.verifyAccount, accountController.getAccount, (req, res, next) => {
    console.log('RES SEND: ', res.locals.account);
    res.send(res.locals.account);
});

/**
 *  SIGN UP route
 * 
 * 1. Create account
 * 2. Get account
 * 3. TODO: Create session
 * 4. TODO: Set cookie
 */
// app.post('/signup', accountController.createUser, sessionController.setCookie, sessionController.startSession);
app.post('/signup', accountController.createAccount, accountController.getAccount, (req, res, next) => {
    res.send(res.locals.account);
});

// app.post('/createsnippet', snippetController.createSnippet, snippetController.createTags);
app.post('/createsnippet', snippetController.createSnippet, (req, res, next) => {
    res.send('Snippet created');
});

// TODO: Catch all error handling

// Server Port
app.listen(3000, () => console.log('Listening on Port: 3000 .-.'));