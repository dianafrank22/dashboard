let main = require("../public/js/main");
let chai = require("chai");
let sinon = require('sinon')
let spy = sinon.spy();

var expect = chai.expect;

describe("main.js", function(){
	describe("getKey", function(){
		it("calls train function when given keycode 84", function(){
			// const spied_function = sinon.spy(main, 'train');
			// add keyup event listener on window 
			// pass in that info to 
			// expect(spied_function.calledOnce).to.eql(true);
		});
	})
	// it("addTwoNumbers returns a number", function(){
	// 	expect(main.addTwoNumbers(0,0)).to.be.a("number");
	// });
	
})