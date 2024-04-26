/* global monogatari */

monogatari.component ('main-screen').template (() => {
	return `
			<h1>Bo's Kitchen</h1>
			<div class="some-class">Let him cook!</div>
			<main-menu></main-menu>
	`;
});

// Define the messages used in the game.
monogatari.action ('message').messages ({
	'Cooked': {
		title: 'He Cooked',
		body: `
			<p>It was delicious</p>
		`
	},
	'Roll': {
		title: 'Roll for initiative',
		body: `
			<button onClick="firstCheck()">Click me</button>
		`
	}
});

// Define the notifications used in the game
monogatari.action ('notification').notifications ({
	'Welcome': {
		title: 'Welcome',
		body: 'This is the Monogatari VN Engine',
		icon: ''
	}
});

// Define the Particles JS Configurations used in the game
monogatari.action ('particles').particles ({

});

// Define the canvas objects used in the game
monogatari.action ('canvas').objects ({

});

// Credits of the people involved in the creation of this awesome game
monogatari.configuration ('credits', {

});


// Define the images that will be available on your game's image gallery
monogatari.assets ('gallery', {

});

// Define the music used in the game.
monogatari.assets ('music', {

});

// Define the voice files used in the game.
monogatari.assets ('voices', {

});

// Define the sounds used in the game.
monogatari.assets ('sounds', {

});

// Define the videos used in the game.
monogatari.assets ('videos', {

});

// Define the images used in the game.
monogatari.assets ('images', {

});

// Define the backgrounds for each scene.
monogatari.assets ('scenes', {
	'kitchen': 'kitchen.jpg'
});


// Define the Characters
monogatari.characters ({
	'bo': {
		name: 'Bo',
		color: '#5ad3b2',
		sprites: {
			default: 'bo.png',
			'food-1': 'bo-food-1.png',
			'food-2': 'bo-food-2.png',
			'food-3': 'bo-food-3.png',
		}
	}
});


// Utility
function delayTransition(s){
	setTimeout(() => {
		return true;
	}, s);
};

// Game
// Dice Roll
function rollDice(proficiency, condition = '') {
	// Proficiency in player key
	// Condition a or d for advantage/disadvantage

	let dice = 20;
	let roll;

	let roll1 = Math.floor(Math.random() * dice) + 1;
	let roll2 = Math.floor(Math.random() * dice) + 1;

	if ( condition == 'a') {
		roll1;
		roll2;
		roll = Math.max(roll1, roll2);

		console.log('Rolling with advantage!');
		console.log(roll1, roll2, 'Pick: ' + roll);

	} else if (condition == 'd') {
		roll1;
		roll2;
		roll = Math.min(roll1, roll2);

		console.log('Rolling with disadvantage');
		console.log(roll1, roll2, 'Pick: ' + roll);
	} else {
		roll = Math.floor(Math.random() * dice) + 1;
	}

	if (roll == 20) {
		console.log('Critical Success!');
		return 20;
	} else if (roll == 1 ) {
		console.log('Critical Fail');
		return 1;
	} else {
		let total = roll + parseFloat(proficiency);

		console.log('Base: ' + roll);
		console.log('Proficiency: ' + proficiency);
		console.log('Total: ' + total);
		return total;
	}
}

// function dcCheck(dc, checkRoll) {
// 	if( checkRoll == 20 || checkRoll >= dc ) {
// 			return "pass";
// 	} else {
// 			return 'fail';
// 	}
// }

// document.addEventListener("DOMContentLoaded", (event) => {
//   let die = document.querySelector(".die");

// 	die.addEventListener("click", function (e) {
// 		die.classList.add('rolling', 'show');

// 		setTimeout(() => {
// 			die.classList.remove('rolling');
// 			die.setAttribute("data-face", rollDice( monogatari.storage ('player').perception));

// 		}, 2000);
// 	});
// });


function animateDice(checkRoll) {
	let die = document.querySelector(".die");
	let dieBox = document.querySelector(".content");
	die.classList.add('rolling');
	dieBox.classList.add('show');

	setTimeout(() => {
		die.classList.remove('rolling');
		die.setAttribute("data-face", checkRoll);

	}, 2000);
}

function hideDie() {
	let dieBox = document.querySelector(".content");
	dieBox.classList.remove('show');
	return;
}

monogatari.script ({
	// The game starts here.
	'Start': [
		'show scene kitchen with fadeIn',
		{
			'Input': {
				'Text': 'What is your name?',
				'Validation': function (input) {
					return input.trim ().length > 0;
				},
				'Save': function (input) {
					this.storage ({
						player: {
							name: input,
						}
					});
					return true;
				},
				'Revert': function () {
					this.storage ({
						player: {
							name: '',
						}
					});
				},
				'Warning': 'You must enter a name!'
			}
		},
		'show character bo default with slideInLeft end-fadeOut',
		'bo Hi {{player.name}}!',
		{
			'Choice': {
				'Dialog': 'bo Are you hungry?',
				'Yes': {
					'Text': 'Yes',
					'Do': 'jump Yes'
				},
				'No': {
					'Text': 'No',
					'Do': 'jump No'
				},
				'Roll': {
					'Text': 'Roll for initiative',
					// 'Do': 'show message Roll'
					'Do': 'jump Roll-A'
				}
			}
		}
	],

	// First fork
	'Yes': [
		'bo Great! I was just about to whip something up.',
		{
			'Choice': {
				'Dialog': 'bo What would you like to eat?',
				'food-1': {
					'Text': 'Cacio e Pepe',
					'Do': 'jump food-1'
				},
				'food-2': {
					'Text': 'Surf n\' Turf',
					'Do': 'jump food-2'
				},
				'food-3': {
					'Text': 'Creme Brule',
					'Do': 'jump food-3'
				}
			}
		}

	],

	'No': [
		'bo That\'s ok! Maybe later then.',
		'hide character bo',
		'bo See you!',
		'jump exit-no'
	],

	'Roll-A': [
		'bo rolling...',
		{'Conditional': {
			'Condition': function(){
				let dc = 15;
				console.log("DC: " + dc);
  			let checkRoll = rollDice( monogatari.storage ('player').perception);
				// Only show base role on dice
				animateDice(checkRoll - monogatari.storage ('player').perception);
				console.log("checkRoll: " + checkRoll);
				if( checkRoll == 20 || checkRoll >= dc ) {
						return "pass";
				} else {
						return 'fail';
				}
			},
			'pass': 'jump pass',
			'fail': 'jump fail',
	}}
	],

	'pass': [
		'bo You passed!',
		hideDie,
		'bo Yay',
		'jump exit'
	],

	'fail': [
		'bo You fail!',
		hideDie,
		'bo Oh no...',
		'jump exit'
	],


	// Food Choices
	'food-1': [
		'hide character bo',
		'bo *cooks*',
		'show character bo food-1 fadeIn end-fadeOut',
		'bo Here you go!',
		'bo Enjoy!',
		'hide character bo',
		'jump exit'
	],
	'food-2': [
		'hide character bo',
		'bo *cooks*',
		// function () {
		// 	delayTransition(3000);
		// },
		'show character bo food-2 bounceIn end-fadeOut',
		'bo Here you go!',
		'bo Enjoy!',
		'hide character bo',
		'jump exit'
	],
	'food-3': [
		'hide character bo',
		'bo *cooks*',
		'show character bo food-3 bounce end-fadeOut',
		'bo Here you go!',
		'bo Enjoy!',
		'hide character bo',
		'jump exit',
	],

	// Exit
	'exit': [
		function () {
			delayTransition(3000);
		},
		'show message Cooked',
		'end'
	],
	'exit-no': [
		'end'
	]

});