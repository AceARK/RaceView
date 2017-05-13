/*
*	Dashboard component that contains the main TileSet 
*	showing sorted Tiles for each candidate, and 
*	TabularGraphPanel with graphical representation of data
*/

import React from 'react';

// Importing child components
import TileSet from './TileSet.js';
import TabularGraphPanel from './TabularGraphPanel.js';

// Component definition
class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		// State definition here
	}

	render() {
		return (
			<div className="container">
				<h1 className="text-center">Dashboard</h1>
				<div className="row">
					<div className="col-sm-7">
						<TabularGraphPanel />
					</div>
					<div className="col-sm-5">
						<TileSet />
					</div>
				</div>
			</div>	
		);
	}
}

module.exports = Dashboard;