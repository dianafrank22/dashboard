// import keys from "../secret/keys.js"
// need to make sure there is a delay on api calls,
// if key was hit a few minutes ago, don't let them do it again ?

function getKey(e){
	var key = e.keyCode
	console.log(key)
	switch(key){
		case 84:
			train();
			break;
		case 87:
			console.log('in weather, hit 87')			
			break;
		case 78:
			console.log('in news, hit 78')
			break;
		default:
			console.log('no api called')
	}
}

function train(){
	console.log('in train, hit 84')			
}

function weather(){
	console.log('weather')
}

function news(){
	console.log('news')
}

window.addEventListener('keydown', getKey)
