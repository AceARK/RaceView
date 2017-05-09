/*
* Parent component to contain all the tiles per candidate.
* On mount, gets data on all candidates and generates tiles by passing props to each tile.
* Tiles are sorted based on votes received via willUpdate when socket.io emits votes.
*/

import React from 'react';
import Tile from './tile.js';

import helpers from '../utils/helpers.js';

class TileSet extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			candidatesArray: []
		}
	}

	// Get required data right before mounting
	componentWillMount() {
		// Get list of candidates in array format
		helpers.getCandidates().then(function(data) {
			console.log(data);
			this.setState(data);
		});
		// Also set up io.emit reception here TODO
	}

	// Based on emit, update votes for tiles
	componentDidUpdate(prevProps, prevStates) {
		// TODO
	}

	render() {
		// For each item in candidatesArray, get name, photo and votes and create Tile for it
		this.state.candidatesArray.map((candidate) => {
			<Tile // TODO : Create Tile
		});
	}
}

module.exports = TileSet;
