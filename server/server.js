require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

// Import Controllers
const accountController = require('./controllers/accountController.js');
const sessionController = require('./controllers/sessionController.js/index.js');
const snippetController = require('./controllers/snippetController.js/index.js');

// Blanket Calls
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/build', express.static(path.join(__dirname, '../build')));
 
// GET Endpoints
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

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
    res.send(res.locals.account);
});

/**
 *  SIGN UP route
 * 
 * 1. Create account
 * 2. Get account
 * 3. // TODO: Create session
 * 4. // TODO: Set cookie
 */
// app.post('/signup', accountController.createUser, sessionController.setCookie, sessionController.startSession);
app.post('/signup', accountController.createAccount, accountController.getAccount, (req, res, next) => {
    res.send(res.locals.account);
});

/**
 *  SNIPPET route
 *  TODO: Post
 * 
 */
// app.post('/createsnippet', snippetController.createSnippet, snippetController.createTags);
app.post('/createsnippet', snippetController.createSnippet, (req, res, next) => {
    res.send('Snippet created');
});

// Catch all error handling
app.use((err, req, res, next) => {
    res.status(418).send(err);
})

// Server Port
app.listen(3000, () => console.log('Listening on Port: 3000 .-.'));