/*
*	DashboardPage component contains the Dashboard component and PopularityDiv component 
*/

import React from 'react';

// Importing child components
import Dashboard from './Dashboard.js';
import PopularityDiv from './PopularityDiv.js';

// Importing helpers
import helpers from '../utils/helpers';

// Component definition
class DashboardPage extends React.Component {
	constructor(props) {
		super(props);
		// State definition here
		this.state = {
			candidatesArray: []
		}
	}

	componentDidMount() {
		// console.log("DID Mountttttt");
		
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
	}

	componentDidUpdate() {
		// console.log(this.state.candidatesArray);
	}

	render() {
		return (
			<div className="container-fluid">
				<h1 className="text-center">DashboardPage</h1>
				<div className="row">
					<Dashboard candidatesArray = {this.state.candidatesArray}/>
				</div>
				<div className="row">
					<PopularityDiv candidatesArray = {this.state.candidatesArray}/>
				</div>
			</div>	
		);
	}
}

module.exports = DashboardPage;