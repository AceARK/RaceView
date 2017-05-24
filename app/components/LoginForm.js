var React = require('react');

var helpers = require('../utils/helpers.js');

// Component definition
var LoginForm = React.createClass({
	getInitialState: function() {
		return {
			sessionObject: {},
			userSignedIn: false,
			unregisteredUser: true,
			email: "",
			password: ""
		}
	},

	handleChange: function(event) {
	  	var value = event.target.value;
	  	if(event.target.id === "email") {
	  		this.setState({
	  			email: value
	  		});
	  	}else {
	  		this.setState({
	  			password: value
	  		});
	  	}
	},

	handleLoginButtonClick: function(event) {
		// Show loginForm and set formVisible to true
		event.preventDefault();
		console.log("User clicked Login");
		var loginEmail = this.state.email;
		var loginPassword = this.state.password;
		var loginData = {
			email: loginEmail,
			password: loginPassword
		}
		helpers.authenticateUser(loginData).then(function(result) {
			var errMsg = result.data;
			if(result.data === "Login failed") {
				this.props.showErrorMessage(true, errMsg);
			}else {
				var sessionObject = {
					"email" : result.data.email,
					"id" : result.data.id,
					"username" : result.data.username
				}
				// Setting parent with new session object
				this.props.userLoggedIn(sessionObject, result.data.voted);
			}
		}.bind(this));
	},

	render: function() { 
		return (
			<form onSubmit={this.handleLoginButtonClick}>
				<div className="loginForm">
					<div className="form-group">
						<label for="email">Email: </label>
						<input type="email" id="email" onChange={this.handleChange} value={this.state.email} className="form-control" placeholder="Email" name="email" required />
					</div>
					<div className="form-group">
						<label for="password">Password: </label>
						<input type="password" id="password" onChange={this.handleChange} value={this.state.password} className="form-control" placeholder="Password" name="password" required />
					</div>
					<button id="loginToVoteButton" className="btn btn-success">Login</button>
				</div>
			</form>
		);
	}
});

module.exports = LoginForm;