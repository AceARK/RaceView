import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';

const io = require('socket.io-client');
const socket = io();

var ViewPanel = React.createClass ({
	getInitialState: function() {
		return {
			candidatesArray: [],
			votesArray: []
		}
	},

	// Get required data right before mounting
	componentWillMount: function() {
		console.log("WILLMOUNT")
		console.log(this.props.candidatesArray);
		// Also set up io.emit reception here TODO
	},

	// Setting up socket io listener
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

	// Area to stop cyclic updation and max call stack error
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

	// Filtering votesArray to get only voteCount specific to CandidateId
	filterFunction: function(item) {
		var filteredArray = this.state.votesArray.filter((voteItem) => voteItem.CandidateId === item.id);
		if(!filteredArray.length) {
			return 0;
		}

		return filteredArray[0].VoteCount;
	},

	// Render the charts
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
	        <VictoryChart
	          domainPadding={15}
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
	            <VictoryBar
	              data={candidateVotesData}
	               style={{
		            data: { width: 15 }
		          }}
		          animate={{
		            onExit: {
		              duration: 500,
		              before: () => ({
		                y: 0,
		                fill: "orange",
		                label: "^"
		              })
		            }
		          }}
	              x={"name"}
	              y={"votes"}
	            />
	            
	          </VictoryStack>
	        </VictoryChart>
	      </div>
	    );
	}
});


module.exports = ViewPanel;