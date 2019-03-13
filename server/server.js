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
app.use('/', express.static(path.join(__dirname, '../build')));
 
// GET Endpoints
app.get('/gettags', snippetController.getAllUserTags);
app.get('/getsnippetsbytag', snippetController.getSnippetIdsByTag, snippetController.getSnippetsBySnippetIds);
app.get('/deletesnippetbyid', snippetController.deleteSnippet);

// POST Endpoints

// app.post('/login', accountController.verifyUser, sessionController.setCookie, sessionController.startSession);
app.post('/login', accountController.verifyUser, (req, res, next) => {
    //console.log('RES SEND: ', res.locals.account);
    res.send(res.locals.account);
});
// app.post('/signup', accountController.createUser, sessionController.setCookie, sessionController.startSession);
app.post('/signup', accountController.createUser, (req, res, next) => {
    res.send("Sign up!");
});

app.post('/createsnippet', snippetController.createSnippet, snippetController.createTags);

// Server Port

app.listen(3000, () => console.log('Listening on Port: 3000 .-.'));