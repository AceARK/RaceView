/*
* Parent component to contain all the tiles per candidate.
* On mount, gets data on all candidates and generates tiles by passing props to each tile.
* Tiles are sorted based on votes received via willUpdate when socket.io emits votes.
*/

import React from 'react';
import Tile from './Tile.js';

// Socket.io client code
const io = require('socket.io-client');
const socket = io();

var TileSet = React.createClass ({
	getInitialState: function() {
		return {
			candidatesArray: [],
			votesArray: []
		}
	},

	// Get required data right before mounting
	componentWillMount: function() {
		console.log("WILLMOUNT")
		console.log(this.props.candidatesArray);
		// Also set up io.emit reception here TODO
	},

	 componentDidMount: function() {
	  // var socket = io.connect('/');
	    socket.on('broadcast', function(voteData) {
	        console.log('Somebody Voted Yo!', voteData);
	       	// Setting vote Data
	        this.setState({
	        	votesArray: voteData
	        });

	    }.bind(this));
	  },

	shouldComponentUpdate: function(nextProps, nextState) {
		// console.log(nextProps);
		console.log(nextState);
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

		console.log("TileSET UPDATED");
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
		return (
			<div>
				{(this.state.candidatesArray.length) ? this.state.candidatesArray.map((candidate, index) => {
						return (
							<Tile key={index} id={candidate.id} name={candidate.name} photoSrc={candidate.photoSrc} party={candidate.party} votes={this.filterFunction(candidate)} />
						);
				}): null}
			</div>
		);		
	}
});

module.exports = TileSet;
