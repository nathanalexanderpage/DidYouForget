require('dotenv').config();
const express = require('express');


// App instance //
const app = express();


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: false}));

// Helper function: This allows our server to parse the incoming token from the client
// This is being run as middleware, so it has access to the incoming request
function fromRequest(req){

	if (!req.body.headers){

	}

  if(req.body.headers.Authorization &&
    req.body.headers.Authorization.split(' ')[0] === 'Bearer'){
    return req.body.headers.Authorization.split(' ')[1];
  }
  return null;
}

// Controllers
// TODO: Ensure all auth routes are protected except for
// POST to /auth/login and /auth/signup
// Remember to pass the JWT_SECRET to ExpressJWT (it will break without it!)
// NOTE on ExpressJWT: The unless portion is only needed if you need exceptions

// Include routes from controllers

app.use('/search', require('./controllers/search'));


// This is the catch-all route. Ideally you don't get here unless you made a mistake on your front-end
app.get('*', function(req, res, next) {
	res.status(404).send({ message: 'Not Found' });
});

// Listen on specified PORT or default to 3000
app.listen(process.env.PORT || 3000);
