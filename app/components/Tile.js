/*
* This coponent will represent each candidate on the dynamically changing dashboard.
* Displays name, image, and votes in real-time for each of the candidates and sorts itself accordingly.
*/

import React from 'react';

var Tile = React.createClass ({

	getInitialState: function() {
		return {
			id: 0,
			name: "",
			imageSrc: "",
			party: "",
			votes: 0
		};
	},

	componentDidMount: function() {
		var newState = {
			id: this.props.id,
			name: this.props.name,
			imageSrc: this.props.photoSrc,
			party: this.props.party,
			votes: this.props.votes
		}
		this.setState(newState);
	},
	
	componentDidUpdate: function(prevProps, prevState) {
		if(prevProps.votes !== this.props.votes) {
			// console.log(prevState);
			// console.log(prevProps);
			// console.log(this.props);
			var newState = {
				id: this.props.id,
				name: this.props.name,
				imageSrc: this.props.photoSrc,
				party: this.props.party,
				votes: this.props.votes
			}

			this.setState(newState);
			// console.log("BLAHHHH");
		}
	},

	render: function() {
		var style = "height: 50px; width: 50px";
		return (
			<div className="candidateTile text-center">
				<div className="row">
					<div className="col-xs-12 text-center">
						<p className="candidateName">{this.state.name}</p>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-5">
						<img className="img-rounded" style={{style}} src={"/assets/images/" + this.state.imageSrc} alt={this.state.name} />
					</div>
					<div className="col-xs-7">
						<p className="candidateVotes">{this.state.votes}</p>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Tile;