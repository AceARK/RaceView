/*
*	Dashboard component that contains the main TileSet 
*	showing sorted Tiles for each candidate, and 
*	TabularGraphPanel with graphical representation of data
*/

import React from 'react';

// Importing child components
import TileSet from './TileSet.js';
import ViewPanel from './ViewPanel';

// Component definition
class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="dashboard container-fluid">
				<div className="row">
					<div className="col-sm-9">
						<div className="newsPanel panel panel-default">
							<div className="panel-heading">
							    <h2 className="panel-title">RACE REPRESENTATION</h2>
							</div>
							<div className="panel-body">
							   	<ViewPanel candidatesArray = {this.props.candidatesArray} />
							</div>
						</div>
					</div>
					<div className="col-sm-3">
						<div className="newsPanel panel panel-default">
							<div className="panel-heading text-center">
							    <h2 className="panel-title">THE RACE</h2>
							</div>
							<div className="panel-body">
							   	<TileSet candidatesArray = {this.props.candidatesArray} />
							</div>
						</div>
					</div>
				</div>
			</div>	
		);
	}
}

module.exports = Dashboard;