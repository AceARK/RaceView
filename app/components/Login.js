var React = require('react');

// Importing child components
var LoginForm = require('./LoginForm.js');

// Component definition
var Login = React.createClass({
	getInitialState: function() {
		return {
			formVisible: false,
			userSignedIn: false,
			errorMessageVisible: false
		}
	},

	setLoginFormVisibility: function(value) {
		this.setState({
			formVisible: value
		});
	},

	showErrorMessage: function(value) {
		this.setState({
			errorMessageVisible: value
		});
	},

	handleLoginButtonClick: function() {
		// Show loginForm and set formVisible to true
		console.log("Show login from");
		this.setState({
			formVisible: true
		});
	},

	resetLogin: function() {
		this.setState({
			formVisible: false,
			userSignedIn: false,
			errorMessageVisible: false
		});
	},

	render: function() {
		if(!this.state.formVisible && !this.state.userSignedIn) {
			return (
				<div className="loginDiv">
					<a id="loginToVoteButton" onClick={this.handleLoginButtonClick} >Login to Vote</a>
				</div>
			);
		}else if(this.state.errorMessageVisible && !this.state.userSignedIn) {
			setTimeout(this.resetLogin, 2500);
			return(
				<div className="loginDiv">
					<div className="alert alert-danger">
						<p>Login Failed</p>
					</div>
				</div>
			);
		}else {
			return(
				<LoginForm showErrorMessage={this.showErrorMessage} hideForm={this.setLoginFormVisibility} />
			);
		}		
	}
});

module.exports = Login;