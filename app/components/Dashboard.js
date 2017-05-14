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

	componentWillMount() {
		console.log(this.props);
	}

	componentDidMount() {
		console.log(this.props.candidatesArray);
	}

	componentDidUpdate(prevProps, prevState) {
		console.log("Dashboard updated with : " + this.props.candidatesArray);
	}

	render() {
		return (
			<div className="container">
				<h1 className="text-center">Dashboard</h1>
				<div className="row">
					<div className="col-sm-7">
						<ViewPanel candidatesArray = {this.props.candidatesArray} />
					</div>
					<div className="col-sm-5">
						<TileSet candidatesArray = {this.props.candidatesArray} />
					</div>
				</div>
			</div>	
		);
	}
}

module.exports = Dashboard;