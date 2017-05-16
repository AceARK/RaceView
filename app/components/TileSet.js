/*
* Parent component to contain all the tiles per candidate.
* On mount, gets data on all candidates and generates tiles by passing props to each tile.
* Tiles are sorted based on votes received via willUpdate when socket.io emits votes.
*/

import React from 'react';
import Tile from './Tile.js';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// import { Shuffle } from 'react-shuffle';

// Socket.io client code
const io = require('socket.io-client');
const socket = io();

var TileSet = React.createClass ({
	getInitialState: function() {
		return {
			candidatesArray: [],
			votesArray: [],
			order: [],
			animationTrigger: 0,
			style: ""
		}
	},

	 componentDidMount: function() {
	  // var socket = io.connect('/');
	    socket.on('broadcast', function(voteData) {
	//         console.log('Somebody Voted Yo!', voteData);
			var orderedVoteData = voteData.sort((a,b) => b.VoteCount -a.VoteCount);
			var order = orderedVoteData.map((data) => data.CandidateId);
	       	// Setting vote Data
	        this.setState({
	        	votesArray: orderedVoteData,
	        	order: order
	        });

	    }.bind(this));
	  },

	shouldComponentUpdate: function(nextProps, nextState) {
		// console.log(nextProps);
		// console.log(nextState);
		return true;
	},

	areArraysEqual: function(one, two) {
		for(var i=0; i<one.length; i++) {
			if(one[i] !== two[i]) {
				return false;
			}
		}
		return true;
	},

	// Based on emit, update votes for tiles
	componentDidUpdate: function(prevProps, prevState) {
		// console.log(this.props.candidatesArray);
		console.log(this.state.candidatesArray);
		// Avoiding max call stack error
		if(prevProps !== this.props) {
			var parentArray = this.props.candidatesArray;
			this.setState({
				candidatesArray: parentArray
			});
		} 

		if(!this.areArraysEqual(prevState.order, this.state.order) ) {
			console.log(prevState.order);
			console.log(this.state.order);
			console.log("ORDER CHANGED!!!!!!!!!!!!!!");
			var newRandom = Math.random()*100;
			// this.setState = {
			// 	animationTrigger : newRandom,
			// 	style: `${this.state.style} animateTile`
			// }
		}

		// console.log("TileSET UPDATED");
	},

	filterFunction: function(item) {
		var filteredArray = this.state.votesArray.filter((voteItem) => voteItem.CandidateId === item.id);
		if(!filteredArray.length) {
			return 0;
		}

		return filteredArray[0].VoteCount;
	},

// {(this.state.votesArray.filter((item) =>  item.CandidateId === candidate.id)).votes}
	render: function() {
		var candidateVotesData = this.state.candidatesArray.map((candidate) => {
	 		return {
	 			"id": candidate.id,
	 			"name": candidate.name,
	 			"photo": candidate.photoSrc,
	 			"party": candidate.party,
	 			"votes": this.filterFunction(candidate)
	 		}
	 	});
	 	// console.log(candidateVotesData);
		return (
			<div className="tileSet">
				{(candidateVotesData.length) ? candidateVotesData.sort((a,b) => b.votes - a.votes).map((candidate, index) => {
						return (
							<Tile style={this.state.style} key={index} name={candidate.name} photoSrc={candidate.photo} party={candidate.party} votes={candidate.votes} />
						);
				}): null }
			</div>
		);		
	}
});

module.exports = TileSet;
