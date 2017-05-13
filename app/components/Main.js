import React from 'react';
import { Link } from 'react-router';

import Dashboard from './Dashboard.js';
import TileSet from './TileSet.js';
import Tile from './Tile.js';
import TabularGraphPanel from './TabularGraphPanel.js';
import PopularityDiv from './PopularityDiv.js';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// Currently contains array of terms to be looped through and links created for.
			// A title matching the theme of election - Presidential, School Senate, American Idol etc 
			linkArray: ['Login'],
			headerTitle: 'Presidential Election'
		}
	}

	render() {
		return (
			<div className="container">
				<nav className="navbar navbar-default">
				  <div className="container-fluid">
				    <div className="navbar-header">
				      <a className="navbar-brand" href="/">RaceView</a>
				      <div className="navbar-nav navbar-right">
				      	<ul className="list-inline">
							<li><Link to="/">Dashboard</Link></li>
							<li><Link to="/vote">Vote</Link></li>
						</ul>
				      </div>
				    </div>
				  </div>
				</nav>
				<Dashboard />
				<PopularityDiv />
			</div>
		);
	}
}

module.exports = Main;