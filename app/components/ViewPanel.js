import React from 'react';
import ViewBar from "./ViewBar";
import ViewPie from "./ViewPie";
import NewsPanel from "./NewsPanel";


const io = require('socket.io-client');
const socket = io();

var ViewPanel = React.createClass ({
	getInitialState: function() {
		return {
			candidatesArray: []
		}
	},

	// Area to stop cyclic updation and max call stack error
	shouldComponentUpdate: function(nextProps, nextState) {
		return true;
	},

	// Based on emit, update votes for tiles
	componentDidUpdate: function(prevProps, prevState) {
		// Avoiding max call stack error
		if(prevProps !== this.props) {
			var parentArray = this.props.candidatesArray;
			this.setState({
				candidatesArray: parentArray
			});
		} 
	},

	// Render the charts
	render: function() {
		return (
	      <div className="viewPanel">
	      	<div className="row">
	      		<div className="col-sm-7">
	      			<ViewBar candidatesArray={this.state.candidatesArray}/>
	      		</div>
	      		<div className="col-sm-5">
	      			<ViewPie candidatesArray={this.state.candidatesArray}/>
	      		</div>
	      	</div>
	      	<div className="row">
	      		<div className="col-sm-12">
	      			<NewsPanel candidatesArray={this.state.candidatesArray}/>
	      		</div>
	      	</div>
	      </div>
	    );
	}
});


module.exports = ViewPanel;