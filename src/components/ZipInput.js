import React, {PropTypes, Component } from 'react'

export default class ZipInput extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		return(
			<input type="text" className="zip-input" onChange={this.props.changeFunction} value={this.props.zipInputValue} />
		)
	}
}

