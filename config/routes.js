//@TODO: find mongoose populate method

/**
 * Routes
 *
 * Sails uses a number of different strategies to route requests.
 * Here they are top-to-bottom, in order of precedence.
 *
 * For more information on routes, check out:
 * http://sailsjs.org/#documentation
 */

/**
 * (1) Core middleware
 *
 * Middleware included with `app.use` is run first, before the router
 */


/**
 * (2) Static routes
 *
 * This object routes static URLs to handler functions--
 * In most cases, these functions are actions inside of your controllers.
 * For convenience, you can also connect routes directly to views or external URLs.
 *
 */

module.exports.routes = {

  // By default, your root route (aka home page) points to a view
  // located at `views/home/index.ejs`
  // 
  // (This would also work if you had a file at: `/views/home.ejs`)
  '/':  'HomeController.index',
  '/install':  'HomeController.install',

  // Admin Panel
  '/admin':  'AdminController.index',
  '/admin/users':  'AdminController.users',
  '/admin/comments':  'AdminController.comments',
  '/admin/blogs':  'AdminController.blogs',
  '/admin/general':  'AdminController.general',
  '/admin/modules':  'AdminController.modules',

  '/admin/users/:id/delete':  'UserController.delete',
  '/admin/comments/:id/delete':  'CommentController.delete',
  '/admin/blogs/:id/delete':  'BlogController.delete',
  '/admin/blogs/:id':  'AdminController.blog',

  // User
  'get /user/signin':  'UserController.signin_get',
  'post /user/signin': 'UserController.signin',
  'get /user/signup':  'UserController.signup_get',
  'post /user/signup': 'UserController.signup',
  'get /user/signout': 'UserController.signout',

  'get /user/edit': 'UserController.edit_get',
  'post /user/edit': 'UserController.edit',
  '/user/edit/picture': 'UserController.avatar',

  '/user': 'UserController.index',
  '/user/me': 'UserController.me',
  '/user/delete-all': 'UserController.deleteAll',
  '/user/:name': 'UserController.view',
  '/user/:name/delete': 'UserController.delete',
  '/user/:name/make-admin': 'AdminController.makeAdmin',

  // Blog
  '/blog': 'BlogController.index',
  '/blog/find': 'BlogController.find',

  'get /blog/add': 'BlogController.add_get',
  'post /blog/add': 'BlogController.add',

  'get /blog/:id/edit': 'BlogController.edit_get',
  'post /blog/:id/edit': 'BlogController.edit',
  '/blog/delete-all': 'BlogController.deleteAll',

  '/blog/:id': 'BlogController.view',
  '/blog/:id/delete': 'BlogController.delete',

  // Comment
  '/comment/add/:pid&:ptype': 'CommentController.add',
  '/comment/:id/delete':  'CommentController.delete',
  '/comment/delete-all': 'CommentController.deleteAll',

  // Setting
  'post /setting/add': 'SettingController.add'

  /*
  // But what if you want your home page to display
  // a signup form located at `views/user/signup.ejs`?
  '/': {
    view: 'user/signup'
  }


  // Let's say you're building an email client, like Gmail
  // You might want your home route to serve an interface using custom logic.
  // In this scenario, you have a custom controller `MessageController`
  // with an `inbox` action.
  '/': 'MessageController.inbox'


  // Alternatively, you can use the more verbose syntax:
  '/': {
    controller: 'MessageController',
    action: 'inbox'
  }


  // If you decided to call your action `index` instead of `inbox`,
  // since the `index` action is the default, you can shortcut even further to:
  '/': 'MessageController'


  // Up until now, we haven't specified a specific HTTP method/verb
  // The routes above will apply to ALL verbs!
  // If you want to set up a route only for one in particular
  // (GET, POST, PUT, DELETE, etc.), just specify the verb before the path.
  // For example, if you have a `UserController` with a `signup` action,
  // and somewhere else, you're serving a signup form looks like: 
  //
  //		<form action="/signup">
  //			<input name="username" type="text"/>
  //			<input name="password" type="password"/>
  //			<input type="submit"/>
  //		</form>

  // You would want to define the following route to handle your form:
  'post /signup': 'UserController.signup'


  // What about the ever-popular "vanity URLs" aka URL slugs?
  // (you remember doing this with `mod_rewrite` in PHP)
  //
  // This is where you want to set up root-relative dynamic routes like:
  // http://yourwebsite.com/twinkletoezz993
  //
  // You still want to allow requests through to the static assets,
  // So we need to set up this route to allow URLs through that have a trailing ".":
  // (e.g. your javascript, CSS, and image files)
  'get /*(^.*)': 'UserController.profile'

  */
};



/** 
 * (3) Action blueprints
 * These routes can be disabled by setting (in `config/controllers.js`):
 * `module.exports.controllers.blueprints.actions = false`
 *
 * All of your controllers ' actions are automatically bound to a route.  For example:
 *   + If you have a controller, `FooController`:
 *     + its action `bar` is accessible at `/foo/bar`
 *     + its action `index` is accessible at `/foo/index`, and also `/foo`
 */


/**
 * (4) Shortcut CRUD blueprints
 *
 * These routes can be disabled by setting (in config/controllers.js)
 *			`module.exports.controllers.blueprints.shortcuts = false`
 *
 * If you have a model, `Foo`, and a controller, `FooController`,
 * you can access CRUD operations for that model at:
 *		/foo/find/:id?	->	search lampshades using specified criteria or with id=:id
 *
 *		/foo/create		->	create a lampshade using specified values
 *
 *		/foo/update/:id	->	update the lampshade with id=:id
 *
 *		/foo/destroy/:id	->	delete lampshade with id=:id
 *
 */

/**
 * (5) REST blueprints
 *
 * These routes can be disabled by setting (in config/controllers.js)
 *		`module.exports.controllers.blueprints.rest = false`
 *
 * If you have a model, `Foo`, and a controller, `FooController`,
 * you can access CRUD operations for that model at:
 *
 *		get /foo/:id?	->	search lampshades using specified criteria or with id=:id
 *
 *		post /foo		-> create a lampshade using specified values
 *
 *		put /foo/:id	->	update the lampshade with id=:id
 *
 *		delete /foo/:id	->	delete lampshade with id=:id
 *
 */

/**
 * (6) Static assets
 *
 * Flat files in your `assets` directory- (these are sometimes referred to as 'public')
 * If you have an image file at `/assets/images/foo.jpg`, it will be made available
 * automatically via the route:  `/images/foo.jpg`
 *
 */



/**
 * (7) 404 (not found) handler
 *
 * Finally, if nothing else matched, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 */
 