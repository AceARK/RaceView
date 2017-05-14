/*
*	Test
*	
*/

import React from 'react';
// require `react-d3-core` for Chart component, which help us build a blank svg and chart title.
import { Chart } from 'react-d3-core';
// require `react-d3-basic` for Line chart component.
import { PieChart } from 'react-d3-basic';
var generalChartData = require('dsv?delimiter=,!./data/age_pie.csv')

// Socket.io client code
const io = require('socket.io-client');
const socket = io();

var TestChart = React.createClass ({
	getInitialState: function() {
		return {
			candidatesArray: [],
			votesArray: [],
			generalChartData: generalChartData
			// chartData : [
		 //  ]
		}
	},

	getDefaultProps: function() {
		return {
			width : 700,
		    height : 400,
		    chartSeries : 
		      [{
				  field: "Group1",
				  name: "Group 1",
				  color: "red"
				},
				{
				  field: "Group2",
				  name: "Group 2",
				  color: "black"
				},
				{
				  field: "Group3",
				  name: "Group 3",
				  color: "green"
				}]
		    
			// width : 700,
		 //    height : 300,
		 //    margins : {left: 100, right: 100, top: 50, bottom: 50},
		 //    title : "User sample",
		    // chart series,
		    // field: is what field your data want to be selected
		    // name: the name of the field that display in legend
		    // color: what color is the line
		    // chartSeries : [{
		    //     field: 'BMI',
		    //     name: 'BMI',
		    //     color: '#ff7f0e'
		    // }]
		};
	},

	value : function(d) {
      return +d.population;
    },

	name: function(d) {
      return d.age;
    },

	// your x accessor
    x: function(d) {
      return d.index;
    },

	// Get required data right before mounting
	componentWillMount: function() {
		console.log("WILLMOUNT")
		console.log(this.props.candidatesArray);
		// Also set up io.emit reception here TODO
	},

	 componentDidMount: function() {
	  // var socket = io.connect('/');
	    socket.on('broadcast', function(voteData) {
	        console.log('Somebody Voted Yo!', voteData);
	       	// Setting vote Data
	        this.setState({
	        	votesArray: voteData
	        });

	    }.bind(this));
	  },

	shouldComponentUpdate: function(nextProps, nextState) {
		// console.log(nextProps);
		console.log(nextState);
		return true;
	},

	// Based on emit, update votes for tiles
	componentDidUpdate: function(prevProps, prevState) {
		// console.log(this.props.candidatesArray);
		console.log(this.state.candidatesArray);
		// Avoiding max call stack error
		if(prevProps !== this.props) {
			var parentArray = this.props.candidatesArray;
			this.setState({
				candidatesArray: parentArray
			});
		} 

		console.log("TestChart UPDATED");
	},

	filterFunction: function(item) {
		var filteredArray = this.state.votesArray.filter((voteItem) => voteItem.CandidateId === item.id);
		if(!filteredArray.length) {
			return 0;
		}

		return filteredArray[0].VoteCount;
	},

	render: function() {
		return (
			 <PieChart
		      data= {this.state.generalChartData}
		      width= {this.props.width}
		      height= {this.props.height}
		      chartSeries= {this.props.chartSeries}
		      value = {this.value}
		      name = {this.name}
		    />
		);		
	}
});


module.exports = TestChart;