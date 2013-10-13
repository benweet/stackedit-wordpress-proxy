StackEdit WordPress Proxy
=========================

WordPress proxy for StackEdit. Supports WordPress REST API v1.

**Usage:**

	npm install
	node server.js


Deploy on Heroku
----------------

 - Create the application:

		heroku create

 - Rename the application:

		heroku apps:rename stackedit-wordpress-proxy

 - Specify application's consumer key / secret key:

		heroku config:add OAUTH_CLIENT_ID=abc OAUTH_CLIENT_SECRET=xyz REDIRECT_URI=https://stackedit.io/html/wordpress-oauth-client.html

 - Push changes to Heroku:

		git push heroku master


> Written with [StackEdit](http://benweet.github.io/stackedit/).