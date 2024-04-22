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