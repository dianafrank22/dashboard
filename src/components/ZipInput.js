import React, {PropTypes, Component } from 'react'

export default class ZipInput extends React.Component{
	constructor(props){
		super(props)
	}

	// on click get weather, import currentWeather and daily weather here, pass props 

	render(){
		return(
			<div>
			<input id="weather-zip" type="text" className="zip-input" onChange={this.props.changeFunction} value={this.props.zipInputValue} />

			</div>
		)
	}
}

