import React from 'react';
import { Link } from 'react-router';

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
			<div>
				<nav className="navbar navbar-default">
				  <div className="container">
				    <div className="navbar-header">
				      <a className="navbar-brand" href="/">RaceView</a>
				    </div>
				    
			      	<ul className="nav navbar-nav navbar-right">
						<li><Link to="/">Dashboard</Link></li>
						<li><Link to="/vote">Vote</Link></li>
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