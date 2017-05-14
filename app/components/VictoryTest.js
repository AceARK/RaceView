import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';

const io = require('socket.io-client');
const socket = io();

var VictoryTest = React.createClass ({
	getInitialState: function() {
		return {
			candidatesArray: [],
			votesArray: [],
			data2012 : [
			  {quarter: 1, earnings: 13000},
			  {quarter: 2, earnings: 16500},
			  {quarter: 3, earnings: 14250},
			  {quarter: 4, earnings: 19000}
			],

			data2013 : [
			  {quarter: 1, earnings: 15000},
			  {quarter: 2, earnings: 12500},
			  {quarter: 3, earnings: 19500},
			  {quarter: 4, earnings: 13000}
			],

			data2014 : [
			  {quarter: 1, earnings: 11500},
			  {quarter: 2, earnings: 13250},
			  {quarter: 3, earnings: 20000},
			  {quarter: 4, earnings: 15500}
			],

			data2015 : [
			  {quarter: 1, earnings: 18000},
			  {quarter: 2, earnings: 13250},
			  {quarter: 3, earnings: 15000},
			  {quarter: 4, earnings: 12000}
			]

		}
	},

	// getDefaultProps: function() {
	// 	return {
		
	// 	};
	// },

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

		console.log("VictoryTest UPDATED");
	},

	filterFunction: function(item) {
		var filteredArray = this.state.votesArray.filter((voteItem) => voteItem.CandidateId === item.id);
		if(!filteredArray.length) {
			return 0;
		}

		return filteredArray[0].VoteCount;
	},

	render: function() {
	var candidateVotesData = this.state.candidatesArray.map((candidate) => {
		return {
			"name": candidate.name,
			"party": candidate.party,
			"votes": this.filterFunction(candidate)
		}
	});
	console.log(candidateVotesData);
    return (
      <div>
        <h1>Victory Tutorial</h1>
        <VictoryChart
          domainPadding={20}
          theme={VictoryTheme.material}
        >
          <VictoryAxis
            tickValues={this.state.candidatesArray.map((candidate) => candidate.name)}
          />
          <VictoryAxis
            dependentAxis
          />
          <VictoryStack
            colorScale={"warm"}
          >
           {candidateVotesData.forEach((candidate) => {
           	return  
           		<VictoryBar
	              data={candidate}
	              x={"name"}
	              y={"votes"}
	            />
           })}
          </VictoryStack>
        </VictoryChart>
      </div>
    );
	
	}
});


module.exports = VictoryTest;