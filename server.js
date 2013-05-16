var oauth2 = require('oauth').OAuth2,
    fs    = require('fs'),
    https = require('https'),
    express = require('express');

// Load config defaults from JSON file.
// Environment variables override defaults.
function loadConfig() {
  var config = JSON.parse(fs.readFileSync(__dirname+ '/config.json', 'utf-8'));
  for (var i in config) {
    config[i] = process.env[i.toUpperCase()] || config[i];
  }
  console.log('Configuration');
  console.log(config);
  return config;
}

var config = loadConfig();
var app = express();
app.use(express.bodyParser());

// Convenience for allowing CORS on routes - GET only
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

function createOauthObject() {
	return new oauth2(
		config.oauth_client_id,
		config.oauth_client_secret,
		config.oauth_base_site,
		config.oauth_authorize_path,
		config.oauth_access_token_path);
}

app.get('/authenticate/:code', function(req, res) {
	console.log('authenticating code:' + req.params.code);
	var oa = new createOauthObject();
	oa.getOAuthAccessToken(req.params.code, {'redirect_uri': config.redirect_uri, 'grant_type': 'authorization_code'}, function(error, access_token, refresh_token, results){
		if(error) {
			console.log("Error: " + JSON.stringify(error));
			res.json({error: error});
			return;
		}
		console.log("OAuth token: " + access_token);
		// Send OAuth token back to the client
		res.json({token: access_token});
	});
});

app.post('/post', function(req, res) {
	console.log("/post");
	//var oa = new createOauthObject();
	var data = JSON.stringify({
		tags: req.body.tags,
		title: req.body.title,
		content: req.body.content
	});
	var post_options = {
		host: 'public-api.wordpress.com',
		path: "/rest/v1/sites/" + req.body.site + "/posts/" + (req.body.postId || "new") + "?http_envelope=true",
		method: 'POST',
		headers: {
			'Authorization': 'Bearer ' + req.body.token,
			"Content-Type": "application/json",
		}
	};
	// Set up the request
	var post_req = https.request(post_options, function(response) {
		response.pipe(res);
	});

	// post the data
	post_req.write(data);
	post_req.end();
});

var port = process.env.PORT || config.port || 9999;

app.listen(port, null, function (err) {
	console.log('Server started: http://localhost:' + port);
});
