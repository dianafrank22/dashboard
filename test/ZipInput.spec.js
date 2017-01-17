import React from 'react';
import {mount, render, shallow} from 'enzyme'
import ZipInput from '../src/components/ZipInput'
import TestUtils from 'react-addons-test-utils'
import {expect} from "chai"
import sinon from 'sinon'


describe('ZipInput', function(){
	it('should mount ZipInput', () => {
		const zip = TestUtils.createRenderer();
		zip.render(<ZipInput/>);
		const el = zip.getRenderOutput();
		expect(el).to.exist;
	});
	it('should have type input', ()=>{
		const zip = TestUtils.createRenderer();
		zip.render(<ZipInput/>);
		const el = zip.getRenderOutput();
		expect(el.type).to.eql('input');
	});
	it('should have type text', () =>{
		const zip = TestUtils.createRenderer();
		zip.render(<ZipInput/>);
		const el = zip.getRenderOutput();
		expect(el.props.type).to.eql('text');
	})
	it('should have className zip-input', ()=>{
		const zip = TestUtils.createRenderer();
		zip.render(<ZipInput/>);
		const el = zip.getRenderOutput();
		expect(el.props.className).to.eql('zip-input');
	})
})