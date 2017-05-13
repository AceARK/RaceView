/*
*	Error page to be displayed on all other routes
*/

import React from 'react';

class Error404 extends React.Component {
	constructor() {
		super();
	}

	render() {
		return(
			<h1>Error: Page not found</h1>
		);
	}
}

export default Error404;