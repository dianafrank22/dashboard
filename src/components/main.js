import React, {PropTypes, Component } from 'react'
import Weather from './Weather'

export default class Main extends React.Component{
	constructor(props){
		super(props)
	}


		render(){
			return(
				<Weather/>
			)
		}
}