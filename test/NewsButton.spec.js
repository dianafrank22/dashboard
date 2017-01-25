import React from 'react';
import {mount, render, shallow} from 'enzyme'
import NewsButton from '../src/components/NewsButton'
import TestUtils from 'react-addons-test-utils'
import {expect} from "chai"
import sinon from 'sinon'


describe("NewsButton.js", function(){
	it("renders", function(){
		const button = TestUtils.createRenderer();
		button.render(<NewsButton/>);
		const el = button.getRenderOutput();
		expect(el).to.exist;
	});
	// it("has a class name news button", () =>{

	// })
	
})