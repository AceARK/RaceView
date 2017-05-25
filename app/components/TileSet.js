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
			tileStyle: ""
		}
	},

	 componentDidMount: function() {
	    socket.on('broadcast', function(voteData) {
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
		return true;
	},

	// Based on emit, update votes for tiles
	componentDidUpdate: function(prevProps, prevState) {
		// Avoiding max call stack error
		if(prevProps !== this.props) {
			var parentArray = this.props.candidatesArray;
			this.setState({
				candidatesArray: parentArray
			});
		} 

		if(prevState.order !== this.state.order) {
			this.setState({
				tileStyle: "animateTile"
			});
		}
	},

	// Filtering voteCount of a particular candidate
	filterFunction: function(item) {
		var filteredArray = this.state.votesArray.filter((voteItem) => voteItem.CandidateId === item.id);
		if(!filteredArray.length) {
			return 0;
		}

		return filteredArray[0].VoteCount;
	},

	componentWillUnmount(){
    	socket.close();
  	},

	// Render function
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
			<div className="tileSet text-center">
				{(candidateVotesData.length) ? candidateVotesData.sort((a,b) => b.votes - a.votes).map((candidate) => {
						return (
							<div className="row">
								<div className="col-xs-12">
									<Tile style={this.state.tileStyle} key={candidate.id} name={candidate.name} photoSrc={candidate.photo} party={candidate.party} votes={candidate.votes} />
								</div>
							</div>
						);
				}): null }
			</div>
		);		
	}
});

module.exports = TileSet;
