import React from 'react';
import { Link } from 'react-router';

import Login from './Login.js';
import helpers from '../utils/helpers.js';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// Currently contains array of terms to be looped through and links created for.
			// A title matching the theme of election - Presidential, School Senate, NASCAR, American Idol etc 
			linkArray: ['Login'],
			// headerTitle: 'Presidential Election',
			candidatesArray: []
		}
	}

	// <li><Link to="/">Dashboard</Link></li>
	// <li><Link to="/openvote">Vote</Link></li>

	render() {
		return (
			<div>
				<nav className="navbar navbar-inverse">
				  <div className="container">
				    <div className="navbar-header">
				      <a className="navbar-brand" href="/">RaceView</a>
				      <h1 className="text-center">{this.state.headerTitle}</h1>
				    </div>
				    
			      	<ul className="nav navbar-nav navbar-right">
			      		<Login />
					</ul>
				   
				  </div>
				</nav>
				<div className="container-fluid">
					 {this.props.children}
				</div>
			</div>
		);
	}
}

module.exports = Main;