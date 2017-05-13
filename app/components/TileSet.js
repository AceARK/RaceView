/*
* Parent component to contain all the tiles per candidate.
* On mount, gets data on all candidates and generates tiles by passing props to each tile.
* Tiles are sorted based on votes received via willUpdate when socket.io emits votes.
*/

import React from 'react';
import Tile from './Tile.js';

import helpers from '../utils/helpers.js';

var TileSet = React.createClass ({
	getInitialState: function() {
		return {
			candidatesArray: []
		}
	},

	// Get required data right before mounting
	componentWillMount: function() {
		console.log("WILLMOUNT")
		console.log(this.state.candidatesArray);
		// Also set up io.emit reception here TODO
	},

	componentDidMount: function() {
		console.log("SHORTY DID MOUNT YO");
		var tempCandidatesArray = [];
		// var componentThis = this;
		// Get list of candidates in array format
		helpers.getCandidateList().then(function(result) {
			// console.log(result);
			// var tempCandidatesArray = [];
			result.data.forEach((candidate) => {
				var candidateId = candidate.id;
				var candidateName = candidate.name;
				var candidatePhotoSrc = candidate.photoSrc;
				var candidateParty = candidate.party;
				helpers.getVotesPerCandidate(candidateId).then(function(voteData) {
					// console.log(voteData);
					var candidateVotes = voteData.data;
					var candidateObject = {
						id: candidateId,
						name: candidateName,
						photoSrc: candidatePhotoSrc,
						party: candidateParty,
						votes: candidateVotes
					};
					console.log(candidateObject);
					tempCandidatesArray.push(candidateObject);
					console.log(tempCandidatesArray);

					this.setState({
						candidatesArray: tempCandidatesArray
					});
				}.bind(this));
			});

		}.bind(this));
	},

	// Based on emit, update votes for tiles
	componentDidUpdate: function(prevProps, prevState) {
		// TODO
		// if(prevState.candidatesArray !== this.state.candidatesArray) {
			console.log(this.state.candidatesArray);
		// }
		console.log("PATTTIII");
	},

	render: function() {
		return (
			<div>
				{(this.state.candidatesArray.length) ? this.state.candidatesArray.map((candidate, index) => {
						return (
							<Tile key={index} id={candidate.id} name={candidate.name} photoSrc={candidate.photoSrc} party={candidate.party} votes={candidate.votes} />
						);
				}): null}
			</div>
		);		
	}
});

module.exports = TileSet;
