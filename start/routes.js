'use strict'

const UserController = require('../app/Controllers/Http/UserController');
const User = require('../app/Models/User');

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/api/user', 'UserController.register').validator('register');
Route.post('/api/login', 'UserController.login').validator('login');
Route.patch('/api/logout', 'UserController.logout').middleware(['isLoggedIn']);
Route.patch('/api/user/:userId', 'UserController.update').middleware(['isLoggedIn', 'isAdmin']).validator('updateUser');
Route.get('/api/requests', 'RequestController.index').middleware(['isLoggedIn']).validator('indexRequests');
Route.get('/api/request/:requestId', 'RequestController.show').middleware(['isLoggedIn']).validator('showRequest');
Route.post('/api/book/:bookId/issue', 'RequestController.issue').middleware(['isLoggedIn']).validator('issueBook');
Route.post('/api/book/:bookId/return', 'RequestController.return').middleware(['isLoggedIn']).validator('returnBook');
Route.patch('/api/request/:requestId/reject', 'RequestController.reject').middleware(['isLoggedIn', 'isAdmin']).validator('rejectRequest');
Route.patch('/api/request/:requestId/accept', 'RequestController.accept').middleware(['isLoggedIn', 'isAdmin']).validator('acceptRequest');
Route.get('/api/books', 'BookController.index').middleware(['isLoggedIn']);
Route.get('/api/book/:bookId', 'BookController.show').middleware(['isLoggedIn']).validator('showBook');
Route.post('/api/book', 'BookController.create').middleware(['isLoggedIn', 'isAdmin']).validator('createBook');;
Route.patch('/api/book/:bookId', 'BookController.update').middleware(['isLoggedIn', 'isAdmin']).validator('updateBook');
