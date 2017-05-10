/*
* 	All sequelize queries related to User model
*	addUser, deleteUser, authenticateUser, changePassword -> some of the tentative methods for which to add routes here
*/

// Requiring all models
var db = require("../models");

module.exports = function(app) {
	// Add a user
	app.post("/add/user", function(req, res) {
		console.log(req.body);
		// TODO: Add password encryption code here 
		// to hash password and salt it before saving to db
		db.User.create(req.body
			// This will be altered to have 2 new values 
			// hash and salt in place of password in req.body
			).then(function(result) {
			console.log(result);
			res.send(result);
		}).catch(function(error) {
			console.log(error);
			res.send(error);
		});
	});

	// Delete a user
	app.delete("/delete/user", function(req, res) {
		console.log(req.body);
		db.User.destroy({
		// TODO: Figure out whether cascade delete is required or not
			where: {
				UserId: req.body.userId
			}
		}).then(function(response) {
			console.log(response);
			res.send(response);
		}).catch(function(error) {
			console.log(error);
			res.send(error);
		});
	});

	// Authenticate user
	app.post("/authenticate", function(req, res) {
		console.log(req.body);
		// TODO: Code here to use password entered to re-make hash
		// and compare it with existing hash from table
		db.User.findOne({
			attributes: ['hash','salt'],
			where: {
				email: req.body.email
			}
		}).then(function(response) {
			console.log(response);
			// TODO: Authentication
		});
	});

	// Change user password
	app.post("/change/password", function(req, res) {
		console.log(req.body);
		// TODO: If required, send new password link
		// Over-write old hash and salt entries in table
	});
}