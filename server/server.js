require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

// Import Controllers
const accountController = require('./controllers/accountController.js');
const sessionController = require('./controllers/sessionController.js');
const snippetController = require('./controllers/snippetController.js');

// Blanket Calls
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/build', express.static(path.join(__dirname, '../build')));
 
// Domain root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// POST Endpoints
/**
 * LOGIN
 * 
 * 1. Verify account
 * 2. Get account
 * 3. Create session
 * 4. Set cookie
 */
app.post('/login', //sessionController.verifySession, 
    accountController.verifyAccount, accountController.getAccount,
    sessionController.startSession, sessionController.setCookie,
    snippetController.getSnippets,
    (req, res, next) => {
        res.send({account: res.locals.account, snippets: res.locals.snippets});
    });

/**
 *  SIGN UP route
 * 
 * 1. Create account
 * 2. Get account
 * 3. Create session
 * 4. Set cookie
 */
app.post('/signup', accountController.createAccount, accountController.getAccount,
        sessionController.startSession, sessionController.setCookie,
        snippetController.getSnippets,
        (req, res, next) => {
            res.send({ account: res.locals.account, snippets: res.locals.snippets});
        });

/**
 * LOG OUT route
 * 
 * 1. TODO: clear account
 */
app.post('/logout', accountController.logoutAccount, (req, res, next) => {
    res.send();
});

/**
 *  SNIPPET route
 *  Post
 *  TODO: Verify account
 */
app.post('/api/snippet', sessionController.verifySession, snippetController.createSnippet, (req, res, next) => {
    res.send('Snippet created');
});
app.put('/api/snippet', sessionController.verifySession, snippetController.updateSnippet, (req, res, next) => {
    res.send('Snippet updated');
});
app.delete('/api/snippet', sessionController.verifySession, snippetController.deleteSnippet, (req, res, next) => {
    res.send('Snippet deleted');
});
app.get('/api/snippet', sessionController.verifySession, snippetController.getSnippets, (req, res, next) => {
    res.send(res.locals.snippets);
});


// Catch all error handling
app.use((err, req, res, next) => {
    res.status(418).send({msg: err.message});
})

// Server Port
app.listen(3000, () => console.log('Listening on Port: 3000'));