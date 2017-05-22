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
			console.log(result.data);
			if(result.data === "Login failed") {
				this.props.showErrorMessage(true);
			}else {
				this.props.hideForm(false);
			}
		}.bind(this));
		
	},

	render: function() {
		return (
			<form onSubmit={this.handleLoginButtonClick}>
				<div className="loginForm form-group form-inline">
					<input type="email" id="email" onChange={this.handleChange} className="form-control" placeholder="Email" name="email" required />
					<input type="password" id="password" onChange={this.handleChange} className="form-control" placeholder="Password" name="password" required />
					<button id="loginToVoteButton" className="btn btn-success">Login</button>
				</div>
			</form>
		);
	}
});

module.exports = LoginForm;