/*
* This coponent will represent each candidate on the dynamically changing dashboard.
* Displays name, image, and votes in real-time for each of the candidates and sorts itself accordingly.
*/

import React from 'react';

class Tile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			imageSrc: "",
			name: ""
			// votes: 0
		};
	}

	componentDidUpdate(prevProps, prevStates) {
		if(prevProps.name !== this.props.name) {
			newState = {
				name: this.props.name,
				imageSrc: this.props.imageSrc
			}
			this.setState(newState);	
		}
	}

	render() {
		if(this.props.candidate) {
			return (
				<div className="candidateTile">
					<h1 className="text-center">Tile</h1>
					<div className="row">
						<div className="col-xs-12">
							<h1 className="candidateName">{this.state.name}</h1>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-5">
							<img src={this.state.imageSrc} alt={this.state.name} />
						</div>
						<div className="col-xs-7">
							<h3 className="candidateVotes">{this.state.votes}</h3>
						</div>
					</div>
				</div>
			);
		}else {
			return (
				<div className="nobodyYet">
					<h4>No candidates to vote yet</h4>
				</div>
			);
		}
	}
}

module.exports = Tile;