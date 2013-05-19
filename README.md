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

		heroku config:add WORDPRESS_CLIENT_ID=abc WORDPRESS_CLIENT_SECRET=xyz

 - Push changes to Heroku:

		git push heroku master


> Written with [StackEdit](http://benweet.github.io/stackedit/).