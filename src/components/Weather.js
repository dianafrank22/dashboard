import React, {PropTypes, Component } from 'react'
import ZipInput from './ZipInput'
import WeatherButton from './WeatherButton'
import CurrentWeather from './CurrentWeather'
import DailyWeather from './DailyWeather'

export default class Weather extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		return(
			<div className="dash-section weather" id="weather">
			<ZipInput/>
			<WeatherButton/>
			<CurrentWeather/>
			<DailyWeather/>
			</div>
		)
	}
}