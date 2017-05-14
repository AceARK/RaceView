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
		console.log(this.props.candidatesArray);
		// Also set up io.emit reception here TODO
	},

	componentDidMount: function() {
		console.log("SHORTY DID MOUNT YO");
		// var componentThis = this;
		
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
