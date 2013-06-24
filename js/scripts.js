// Globals
var introFinished;

$(document).ready(function() {
	var bigHeight = $(window).height();
	$('body').height(bigHeight);

	startIntro();
	playIntroMusic();
	createStars(50);
	//showLightsabers();

	$('#begin-wars').click(function() {
		$('#huuuge-dom').remove();
		startBattle();
		createEnemies(5000);
		return false;
	});
});

// Create Space
function createStars(starCount) {

	var huuugeDom     = $('#huuuge-dom');

	// arrays to create random stars
	var starColors    = new Array('#eaeaea', '#ddf7dd', '#c7cbe8', '#e8c7c7', '#fff', '#fff', '#fff', '#fcfcfc');
	var starDistances = new Array('distance-close', 'distance-medium', 'distance-far');
	var glowSpeeds    = new Array('glow-slow', 'glow-medium', 'glow-fast');

	for (var i = 0; i < starCount; i++)	{
		var starId = 'star' + i;

		// randomly select star size, position, and other properties
		var size      = Math.floor((Math.random() * 10) + 1);
		var positionX = (Math.random() * ($(document).width() - size)).toFixed();
		var positionY = (Math.random() * ($(document).height() - size)).toFixed();
		var color     = starColors[Math.floor(Math.random() * starColors.length)];
		var distance  = starDistances[Math.floor(Math.random() * starDistances.length)];
		var glowSpeed = glowSpeeds[Math.floor(Math.random() * glowSpeeds.length)];
		var speed     = Math.floor(Math.floor(Math.random() * (700000) - 650000 + 1) + 650000);

		// append the star to the dom
		huuugeDom.append('<div id="' + starId + '"></div>');

		// add styles to the star
		$('#' + starId)
			.addClass('star move-stars ' + distance + ' ' + glowSpeed)
			.css({
				'width'		: size + 'px',
				'height' 	: size + 'px',
				'left' 		: positionX + 'px',
				'top' 		: positionY + 'px',
				'background': color
		});

		// move the star constantly
		moveStar(starId, ($(document).width()), speed);
	}
}

function moveStar(starId, distance, speed) {
	if (speed < 40000)
		speed = 40000;

	$('#' + starId).animate({
			left: distance + 20
		},
		speed,
		'linear',
		function() {
			$(this).css("left", "-10px");
			moveStar(starId, $(document).width(), speed);
		}
	);
}

// Enter Logo
function startIntro() {
	var longTime    = $('#long-long-time-ago h1');
	var logo        = $('#logo');
	var welcomeText = $('#welcome-text');
	var beginButton = $('#welcome-text h2');

	longTime.fadeIn(2000);
	setTimeout(function() {
		longTime.fadeOut(2000);
	}, 5000);

	setTimeout(function() {
		longTime.remove();
		logo.css('display', 'block');
	}, 7500);

	setTimeout(function() {
		welcomeText.css('display', 'block');
	}, 7000);

	setTimeout(function() {
		logo.css('visibility', 'hidden');
	}, 16300);

	setTimeout(function() {
		longTime.remove();
		logo.remove();
		welcomeText.remove();
		if (introFinished != 1) {
			introFinished = 1;
			moveGalaxyDown();
		}
	}, 40000);

	beginButton.click(function() {
		longTime.fadeOut(1500);
		logo.fadeOut(1500);
		welcomeText.fadeOut(1500);
		setTimeout(function() {
			longTime.remove();
			logo.remove();
			welcomeText.remove();

			if (introFinished != 1) {
				introFinished = 1;
				moveGalaxyDown();
			}
		}, 1500);
	});
}

function moveGalaxyDown() {
	$('#huuuge-dom').animate({
			'top': -110
		},
		1500,
		'linear',
		function() {
			showLightsabers();
		}
	);
}


function showLightsabers() {
	// hide the characters
	$('.lightsaber img').hide();

	$('#obi').fadeIn(100,function() {
		$(this).find('input:first').prop('checked', true);

		$('#vader').fadeIn(100, function() {
			$(this).find('input:first').prop('checked', true);

			$('#windu').fadeIn(100, function() {
				$(this).find('input:first').prop('checked', true);

				$('#mickey').fadeIn(100, function() {
					$(this).find('input:first').prop('checked', true);

					$('#yoda').fadeIn(100, function() {
						$(this).find('input:first').prop('checked', true);

						$('#maul-container').fadeIn(100, function() {
							$(this).find('input:first').prop('checked', true);

							setTimeout(function() {
								$('.lightsaber').find('input:first').prop('checked', false);
								$('#begin-wars').fadeIn();

								$('.lightsaber img').show();
							}, 1000);
						});

					});
				});
			});
		});
	});

	saberHover();
}

// Handle Lightsaber Hover
function saberHover() {
	var sabersBox 	= $('#lightsabers-box');
	var sabers 		= $('#lightsabers-box .lightsaber');

	sabers.hover(function() {
		// change the name
		var name = $(this).attr('title');
		$('#character-name').stop().hide().html(name).fadeIn();
	},
	function() {
		// hide the name
		$('#character-name').stop().fadeOut();
	});
}


function startBattle() {

	$('#begin-wars').fadeOut();

	// hide the characters
	$('.lightsaber img').remove();

	$('#yoda').box2d({
		'y-velocity': 3,
		'density': 2000
	});
	$('#windu').box2d({
		'density': 400
	});
	$('#vader').box2d({
		'density': 1500
	});
	$('#obi').box2d({
		'density': 500
	});
	$('#maul-container').box2d({
		'density': 900
	});
	$('#mickey').box2d({
		'density': 10
	});

	setTimeout(function() {
		$('.lightsaber').find('input:first').prop('checked', true);
		$('#maul-container').find('input:first').prop('checked', true);
	}, 1500);


	for (var i = 0; i < 5; i++)
	{
		$('#checkboxes').append('<input type="checkbox" checked="checked" class="enemy">');
		$('#radio-buttons').append('<input type="radio" checked="checked" class="enemy">');
	}

	$('#the-enemies').fadeIn();
	$('#form-guys').fadeIn();

	$('#the-enemies input').box2d({
		density: 150,
		restitution: 0.9
	});

	$('#form-guys input').box2d({
		density: 500
	});

	$('#form-guys label, #form-guys h1').box2d({
		density: 500
	});
}

function createEnemies(interval) {
	var iteration = 0;

	window.setInterval(function () {
		var size = Math.floor((Math.random() * 10) + 1);
		var x    = (Math.random() * ($(document).width() - size)).toFixed();
		var y    = 0;

		$('body').append(getNewEnemy('enemy-' + iteration, x, y));

		$('#enemy-' + iteration).box2d({
			'density': Math.random() * (500 - 100) + 100
		});

		iteration = iteration + 1;
	}, interval);
}

function getNewEnemy(id, x, y) {
	var elements = [];
		elements.push('<input type="checkbox" style="left: '+x+'px; top: '+y+'px;" class="enemy" checked="checked" id="'+id+'">');
		elements.push('<input type="text" style="left: '+x+'px; top: '+y+'px;" class="enemy" value="Text input field" id="'+id+'">');
		elements.push('<input type="radio" checked="checked" style="left: '+x+'px; top: '+y+'px;" class="enemy" id="'+id+'">');
		elements.push('<h1 id="'+id+'" style="left: '+x+'px; top: '+y+'px;" class="enemy">Heading 1</h1>');
		elements.push('<h2 id="'+id+'" style="left: '+x+'px; top: '+y+'px;" class="enemy">Heading 2</h2>');
		elements.push('<ul id="'+id+'" style="left: '+x+'px; top: '+y+'px;" class="enemy"><li>List Item</li><li>List Item</li></ul>');
		elements.push('<ol id="'+id+'" style="left: '+x+'px; top: '+y+'px;" class="enemy"><li>List Item</li><li>List Item</li></ol>');

		return elements[Math.floor(Math.random()*elements.length)];
}

function playIntroMusic() {
	setTimeout(function() {
		var audioElement = document.createElement('audio');
		audioElement.setAttribute('src', 'files/starwars.wav');
		audioElement.play();
	}, 7200);
}

// Lightsaber noise
$(function() {
	$('label').click(function() {
	    var input = $(this).parent().find('input');

	    if (!input.is(':checked')) {
	    	var audioElement = document.createElement('audio');
				audioElement.setAttribute('src', 'files/lightsaber.wav');
				audioElement.play();
				console.log('music plated');
	    }
	});
});