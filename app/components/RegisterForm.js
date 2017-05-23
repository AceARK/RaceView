var React = require('react');

var helpers = require('../utils/helpers.js');

// Component definition
var RegisterForm = React.createClass({
	getInitialState: function() {
		return {
			email: "",
			password: "",
			passwordConfirm: "",
			username: "",
			errorInRegistration: false,
			errorMessage: ""
		}
	},

	handleChange: function(event) {
	  	var value = event.target.value;
	  	var newState = {};
	  	newState[event.target.id] = event.target.value;
  		this.setState(newState);
	},

	handleRegisterButtonClick: function(event) {
		// Show loginForm and set formVisible to true
		event.preventDefault();
		console.log("User clicked Register");
		var registerEmail = this.state.email;
		var registerPassword = this.state.password;
		var registerPasswordConfirm = this.state.passwordConfirm;
		var registerUsername = this.state.username;
		var userData = {
			email: registerEmail,
			password: registerPassword,
			passwordConfirm: registerPasswordConfirm,
			username: registerUsername
		}
		helpers.registerUser(userData).then(function(result) {
			// Setting error message given by sequelize query check for email or username already in use
			if(result.data.includes("already in use")) {
				var errorMessage = result.data;
				this.setState({
					errorInRegistration: true,
					errorMessage: errorMessage
				});
			}else if(result.data[0].msg) {
				// Setting error message from express validator to display
				var errorMessage = result.data[0].msg;
				this.setState({
					errorInRegistration: true,
					errorMessage: errorMessage
				});
				
			}else {
				this.props.registrationComplete();
			}
		}.bind(this));
	},

	resetForm: function() {
		this.setState({
			email: "",
			password: "",
			passwordConfirm: "",
			username: "",
			errorInRegistration: false,
			errorMessage: ""
		});
	},

	render: function() { 
		return (
			<form method="post" onSubmit={this.handleRegisterButtonClick} id="registerForm">
				<div className="form-group">
					<label>Username</label>
					<input type="text" onChange={this.handleChange} id="username" value={this.state.username} className="form-control" placeholder="Username" name="username" />
				</div>
				<div className="form-group">
					<label>Email</label>
					<input type="email" onChange={this.handleChange} id="email" value={this.state.email} className="form-control" placeholder="Email" name="email" />
				</div>
				<div className="form-group">
					<label>Password</label>
					<input type="password" onChange={this.handleChange} id="password" value={this.state.password} className="form-control" placeholder="Password" name="password" />
				</div>
				<div className="form-group">
					<label>Confirm Password</label>
					<input type="password" onChange={this.handleChange} id="passwordConfirm" value={this.state.passwordConfirm} className="form-control" placeholder="Confirm password" name="passwordConfirm" />
				</div>
				<button type="submit" className="btn btn-info">Submit</button>
				{(this.state.errorInRegistration) ? 
					<div className="alert alert-danger">
						<p>{this.state.errorMessage}</p>
					</div>
				: null}
			</form> 
		);
	}
});

module.exports = RegisterForm;