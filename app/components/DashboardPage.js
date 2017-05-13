/*
*	DashboardPage component contains the Dashboard component and PopularityDiv component 
*/

import React from 'react';

// Importing child components
import Dashboard from './Dashboard.js';
import PopularityDiv from './PopularityDiv.js';

// Component definition
class DashboardPage extends React.Component {
	constructor(props) {
		super(props);
		// State definition here
	}

	render() {
		return (
			<div className="container">
				<h1 className="text-center">DashboardPage</h1>
				<div className="container-fluid">
					<Dashboard />
					<PopularityDiv />
				</div>
			</div>	
		);
	}
}

module.exports = DashboardPage;