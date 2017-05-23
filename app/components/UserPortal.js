/*
*	After user (or admin) signs in with login modal/ register form, this page gives user 
*	choices to vote for candidates standing for election
*/

import React from 'react';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import helpers from '../utils/helpers';

var UserPortal = React.createClass({
	getInitialState: function() {
		return {
			formVisible: true,
			userSignedIn: false,
			errorMessageVisible: false,
			userVoted: false,
			candidatesArray: [],
			registerFormVisible: false,
			newUserLogin: false
		}
	},

	componentDidMount: function() {
		// Get list of candidates in array format
		helpers.getCandidateList().then(function(result) {
			// Temporary array variable to push to
			var tempCandidatesArray = [];
			// console.log(result);
			// var tempCandidatesArray = [];
			result.data.forEach((candidate) => {
				var candidateId = candidate.id;
				var candidateName = candidate.name;
				var candidatePhotoSrc = candidate.photoSrc;
				var candidateParty = candidate.party;
				// Creating candidate object for each
				var candidateObject = {
					id: candidateId,
					name: candidateName,
					photoSrc: candidatePhotoSrc,
					party: candidateParty
				};
				// console.log(candidateObject);
				tempCandidatesArray.push(candidateObject);
				// console.log(tempCandidatesArray);
			});
			// Set component's candidates array state
			this.setState({
				candidatesArray: tempCandidatesArray
			});

		}.bind(this));
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

	showRegisterComponent: function() {
		console.log("New user. Show register component");
		this.setState({
			formVisible: false,
			registerFormVisible: true
		});
	},

	showForm: function(value) {
		this.setState({
			formVisible: value
		});
	},

	resetLogin: function() {
		this.setState({
			formVisible: false,
			userSignedIn: false,
			errorMessageVisible: false
		});
	},

	registrationComplete: function() {
		this.setState({
			formVisible: true,
			registerFormVisible: false,
			newUserLogin: true
		});
	},

	render: function() {
		if(!this.state.userSignedIn && !this.state.userVoted && this.state.formVisible) {
			return(
				<div className="row">
					{(this.state.newUserLogin) ? 
						<div className="row">
							<div className="col-xs-10 col-xs-offset-1 text-center">
								<div className="alert alert-success">
									<p>Registration complete. Login below to vote.</p>
								</div>
							</div>
						</div>
					 : null}
					<div className="row">
						<div className="col-xs-8 col-xs-offset-2">
							<h3>Login to Vote</h3>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-6 col-xs-offset-3">
							<LoginForm showForm = {this.showForm} />
						</div>
					</div>
					{(!this.state.newUserLogin) ? 
						
						<div className="row">
							<div className="col-xs-8 col-xs-offset-2">
								<h4 className="pull-right">No Account? <a onClick={this.showRegisterComponent}>Sign up</a> to Vote</h4>
							</div>
						</div>
						
					:null}
				</div>
			);
		}else if(this.state.userSignedIn && !this.state.userVoted && !this.state.formVisible && !this.state.registerFormVisible){
			// var candidatesArray = this.state.candidatesArray;
			return(
				<h1>User voting area</h1>
			);
			// candidatesArray.map((candidate) => {
			// 		return (
			// 			<div className="col-xs-6">
			// 				<div class='row'>
			// 					<div class='col-xs-5'>
			// 						<div class='row'>
			// 							<div class='col-xs-12'>
			// 								<img class='voteImage' src='/assets/images/{candidate.photoSrc}' />
			// 							</div>
			// 						</div>
			// 						<div class='row'>
			// 							<div class='col-xs-12'>
			// 								<h4 class='candidateName'>{candidate.name}</h4>
			// 							</div>
			// 						</div>
			// 					</div>
			// 					<div class='col-xs-7'>
			// 						<button id={candidate.id} class='vote btn btn-lg btn-danger'>Vote</button>
			// 					</div>
			// 				</div>
			// 			</div>
			// 		);
			// 	});
			// Call helpers.getCandidates method to get all candidates, and populate below with id for each
			// so clicking vote once will update vote and hide this voting section
		} else if(this.state.registerFormVisible && !this.state.formVisible && !this.state.userSignedIn) {
			return(
				<div className="row">
					<div className="row">
						<div className="col-xs-8 col-xs-offset-2">
							<h3>Register to Vote</h3>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-6 col-xs-offset-3">
							<RegisterForm registrationComplete = {this.registrationComplete}/>
						</div>
					</div>
				</div>
			);
		}
	}
});

module.exports = UserPortal;