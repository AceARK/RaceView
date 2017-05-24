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
			newUserLogin: false,
			loginError: "",
			sessionObject: {}
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

	showErrorMessage: function(value, errmsg) {
		this.setState({
			errorMessageVisible: value,
			loginError: errmsg
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

	userLoggedIn: function(sessionObj) {
		this.setState({
			formVisible: false,
			sessionObject: sessionObj,
			userSignedIn: true
		});
	},

	registrationComplete: function() {
		this.setState({
			formVisible: true,
			registerFormVisible: false,
			newUserLogin: true
		});
	},

	handleVoteClick: function(event) {
		var candidateId = event.target.id;
		console.log(candidateId);
		var voteData = {
			"userId" : this.state.sessionObject.id,
			"candidateId" : candidateId
		}
		helpers.addVoteByUser(voteData).then(function(result) {
			console.log(result);
			if(result.data.id == undefined || result.data.id == null) {
				// Error handling
			}else {
				this.setState({
					userVoted: true
				});
			}
			// Set userVoted flag
		}.bind(this));
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
					 {(this.state.errorMessageVisible) ? 
					 	<div className="row">
							<div className="col-xs-10 col-xs-offset-1 text-center">
								<div className="alert alert-danger">
									<p>{this.state.loginError}</p>
								</div>
							</div>
						</div>
					 :null}
					<div className="row">
						<div className="col-xs-8 col-xs-offset-2">
							<h3>Login to Vote</h3>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-6 col-xs-offset-3">
							<LoginForm showErrorMessage={this.showErrorMessage} userLoggedIn={this.userLoggedIn} />
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
		}else if(this.state.userSignedIn && !this.state.formVisible && !this.state.registerFormVisible){
			// var candidatesArray = this.state.candidatesArray;
			var username = this.state.sessionObject.username;
			var userId = this.state.sessionObject.id;
			var candidatesArray = this.state.candidatesArray;
			return(
				<div className="row">
					<div className="col-xs-10 col-xs-offset-1">
						<h3>Greetings {username}</h3>
						{(!this.state.userVoted ) ? 
							<div>
								<h3>Cast your vote for your candidate.</h3>
								<h5>Please note that you may only vote once.</h5>
								{candidatesArray.map((candidate) => {
									var photoSrc = `/assets/images/${candidate.photoSrc}`;
									return (
										<div className="voteTile text-center col-xs-6">
											<div className='row'>
												<div className='col-xs-5'>
													<div className='row'>
														<div className='col-xs-12'>
															<img className='voteImage' src={photoSrc} />
														</div>
													</div>
													<div className='row'>
														<div className='col-xs-12'>
															<h4 className='candidateName'>{candidate.name}</h4>
														</div>
													</div>
												</div>
												<div className='col-xs-7'>
													<button id={candidate.id} onClick={this.handleVoteClick} className='vote btn btn-lg btn-danger'>Vote</button>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						: 
							<h2>You have cast your vote. Please visit the Dashboard page to view the race.</h2>
						}
						
					</div>
				</div>
			);
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