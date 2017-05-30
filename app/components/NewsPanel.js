import React from 'react';
import helpers from '../utils/helpers.js';

const io = require('socket.io-client');
const socket = io();

var NewsPanel = React.createClass ({
	getInitialState: function() {
		return {
			candidatesArray: this.props.candidatesArray,
			votesArray: [],
			order: [],
			latestData: [],
			updatedOnce: false,
			currentNewsItem: {},
			hasCurrentNews: false
		}
	},

	// Setting up socket io listener
	componentDidMount: function() {
	  // var socket = io.connect('/');
	    socket.on('broadcast', function(voteData) {
	//         console.log('Somebody Voted Yo!', voteData);
			var orderedVoteData = voteData.sort((a,b) => b.VoteCount -a.VoteCount);
			var order = orderedVoteData.map((data) => data.CandidateId);
	       	// Setting vote Data
	        this.setState({
	        	votesArray: orderedVoteData,
	        	order: order
	        });

	    }.bind(this));

		// Scrape latest news for all candidates and store as state
		// var CandidateIdList = [1,2,3,4,5];
	},

	// Area to stop cyclic updation and max call stack error
	shouldComponentUpdate: function(nextProps, nextState) {
		// console.log(nextProps);
		// console.log(nextState);

		return true;
	},


	areArraysEqual: function(one, two) {
		for(var i=0; i<one.length; i++) {
			if(one[i] !== two[i]) {
				return false;
			}
		}
		return true;
	},


	// Based on emit, update votes for tiles
	componentDidUpdate: function(prevProps, prevState) {
		// console.log(this.props.candidatesArray);
		// console.log(this.state.candidatesArray);
		// Avoiding max call stack error
		if(prevProps !== this.props) {
			var parentArray = this.props.candidatesArray;
			this.setState({
				candidatesArray: parentArray
			});
		} 

		if(!this.state.latestData.length && !this.state.updatedOnce) {
			var promiseArray = [];
			var newsArray = [];
			// console.log("DID MOUNT CANDIDATES ARRAY");
			// console.log(this.state.candidatesArray);
			this.state.candidatesArray.forEach(function(candidateObj){
				var candidateName = candidateObj.name;
				// console.log(candidateName);
				promiseArray.push(helpers.getLatestNews(candidateName).then(function(data) {
					// console.log("HELPERS DATA");
					// console.log(data);
					var candidateNewsObject = {"id": candidateObj.id, "newsList": data};
					// console.log("CanddiateNewsObject");
					// console.log(candidateNewsObject);
					newsArray.push(candidateNewsObject);
				}));
			});
			Promise.all(promiseArray).then(function() {
				// console.log("NewsArray");
				// console.log(newsArray);
				this.setState({
					updatedOnce: true,
					latestData: newsArray
				});
			}.bind(this));
		}

		if(!this.state.hasCurrentNews) {
			var newsItem = this.getLatestNewsItem();
			this.setState({
				currentNewsItem: newsItem,
				hasCurrentNews: true
			});
		}

		if(this.state.order[0] !== prevState.order[0] && this.state.latestData) {
			// console.log("Inside news state set");
			var newsItem = this.getLatestNewsItem();
			this.setState({
				currentNewsItem: newsItem
			});
		}
	},

	// Filtering votesArray to get only voteCount specific to CandidateId
	filterFunction: function(item) {
		var filteredArray = this.state.votesArray.filter((voteItem) => voteItem.CandidateId === item.id);
		if(!filteredArray.length) {
			return 0;
		}

		return filteredArray[0].VoteCount;
	},

	getLatestNewsItem: function() {
		// console.log(this.state.latestData);
		var currentOrder = this.state.order;
		var newsItem = {};
		// [{"id": 1, "newsList": [{},{},{},{}]},{},{},{},{}]
		this.state.latestData.forEach(function(item) {
			if(item.id === currentOrder[0]) {
				var newsArray = item.newsList.data;
				// console.log(newsArray);
				var randomNumber = Math.floor(Math.random()*newsArray.length);
				newsItem = newsArray[randomNumber];
			}
		}.bind(this));
		// console.log("LATEST NEWS ITEM ---->");
		// console.log(newsItem);
		return newsItem;
	},

	setNewsItem: function(newsItem) {
		this.setState({
			currentNewsItem: newsItem
		});
	},

	componentWillUnmount: function(){
    	socket.close();
  	},

	// Render the charts
	render: function() {
		var leadingCandidateSrc = "";
		if(this.state.candidatesArray.length && this.state.order.length) {
			var candidateArray = this.state.candidatesArray;
			var leadingId = this.state.order[0];
			// console.log(candidateArray);
			// console.log(leadingId);
			if(this.state.currentNewsItem["headline"] == null || this.state.currentNewsItem["headline"] == undefined) {
				var newsItem = this.getLatestNewsItem();
				this.setNewsItem(newsItem);
			}
			for(var i=0; i< candidateArray.length; i++) {
				if(candidateArray[i].id === leadingId) {
					leadingCandidateSrc = `/assets/images/${candidateArray[i].photoSrc}`;
				}
			}
		}
		return (
	      <div className="newsPanel panel panel-default">
			  <div className="panel-heading">
			    <h2 className="panel-title">Latest on The Leading Candidate</h2>
			  </div>
			  <div className="panel-body">
			    <div className="row">
			    	<div className="col-xs-3">
			    		<img id="leadingCandidateImage" src={leadingCandidateSrc}/>
			    	</div>
			    	<div className="col-xs-9">
			    		<h2 className="newsHeadline">{this.state.currentNewsItem.headline}</h2>
			    		<h5>{this.state.currentNewsItem.summary}</h5>
			    		<h5 className="pull-right">- The Onion</h5>
			    	</div>
			    </div>
			  </div>
			</div>
	    );
	}
});


module.exports = NewsPanel;