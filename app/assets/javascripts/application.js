// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
var bearID;
var lastSearch;

$(function(){
	$('#memory_drop').droppable({
		accept: '.search_image',
		hoverClass: 'red',
		drop: function(event, ui) {
			var drg = ui.helper;
			moveImageToMemory(drg);
			debugger
			alert('dropped');
		}
	});
	$('body').on('click', '#sign_up', renderSignUp);
	$('body').on('click', '#signup_button', createUser);
	$('body').on('click', '#submit_bear', createBear);
	$('body').on('click', '#login_submit', fetchUserData);
	$('body').on('click', '.getBearButton', renderBearScreen);
	$('body').on('click', '#search_button', search);
	$('body').on('click', '#add_happy', raiseHappy);
	
	// $('body').on('mouseenter', '.search_image', searchImageHover);
	// $('body').on('mouseleave', '.search_image', mouseLeaveSearchImage);
	$('body').on('mouseenter', '.search_image', searchImageDraggable);
	// $('body').on('click', '.search_image', searchImagePosition);
});

function fetchUserData() {
	var password = $('input[name="login_password"]').val();
	var email = $('input[name="login_email"]').val();

	var newSession = {
		parent_email: email,
		password: password
	};

	$.post('/sessions', newSession).done(function(data){
		if (data.id) {
			renderSession(data);
		}
	});
}

function renderErrors(errors){
	for (var i = 0; i < errors.length; i++){
		var error = $('<p>').text(i).prependTo('#login').css('color', 'red');
	}
};

function renderSignUp(){
	
	var emailLabel = $('<label>').text('email');
	var email = $('<input>').attr('type', 'text').attr('name', 'signup_email');

	var passwordLabel = $('<label>').text('password');
	var password = $('<input>').attr('type', 'password').attr('name', 'signup_password');

	var passwordConfLabel = $('<label>').text('password confirmation');
	var passwordConf = $('<input>').attr('type', 'password').attr('name', 'signup_confirmation');

	var childNameLabel = $('<label>').text('child\'s name');
	var childName = $('<input>').attr('type', 'text').attr('name', 'childName');

	var childGenderLabel = $('<label>').text('child\'s gender');
	var boyLabel = $('<label for="boy">').text('boy');
	var boy = $('<input type="radio">').attr('name', 'childGender').val('M').attr('id', 'boy');
	var girlLabel = $('<label for="girl">').text('girl');
	var girl = $('<input type="radio">').attr('name', 'childGender').val('F').attr('id', 'girl');

	var favColorLabel = $('<label>').text('child\'s favorite color');
	var redLabel = $('<label for="red">').text('red');
	var red = $('<input type="radio">').attr('name', 'childFavColor').val('red').attr('id', 'red');

	var yellowLabel = $('<label for="yellow">').text('yellow');
	var yellow = $('<input type="radio">').attr('name', 'childFavColor').val('yellow').attr('id', 'yellow');

	var greenLabel = $('<label for="green">').text('green');
	var green = $('<input type="radio">').attr('name', 'childFavColor').val('green').attr('id', 'green');
	
	var blueLabel = $('<label for="blue">').text('blue');
	var blue = $('<input type="radio">').attr('name', 'childFavColor').val('blue').attr('id', 'blue');
	

	var submitSignUp = $('<button>').attr('id', 'signup_button').text('create your bear!');

	$('#login').empty()
							.append(emailLabel)
							.append(email)
							.append(passwordLabel)
							.append(password)
							.append(passwordConfLabel)
							.append(passwordConf)
							.append(childNameLabel)
							.append(childName)
							.append(childGenderLabel)
							.append(boyLabel)
							.append(boy)
							.append(girlLabel)
							.append(girl)
							.append(favColorLabel)
							.append(redLabel)
							.append(red)
							.append(yellowLabel)
							.append(yellow)
							.append(greenLabel)
							.append(green)
							.append(blueLabel)
							.append(blue)
							.append(submitSignUp);
};

function createUser(){
	var email = $('input[name="signup_email"]').val();
	var password = $('input[name="signup_password"]').val();
	var passwordConf = $('input[name="signup_confirmation"]').val();
	var childName = $('input[name="childName"]').val();
	var childGender = $('input:radio[name=childGender]:checked').val();
	var favColor = $('input:radio[name="childFavColor"]:checked').val();
	
	var newUser = {
		parent_email: email,
		password: password,
		password_confirmation: passwordConf,
		child_name: childName,
		child_gender: childGender,
		favorite_color: favColor
	};
	
	$.post('/users', newUser).done(renderBearForm);
};

function renderBearForm(currentUser){
	var bearOwner = currentUser.id;
	var bearNameLabel = $('<label for="bearName">').attr('name', 'bearName');
	var bearName = $('<input>').attr('name', 'bearName').attr('id', bearOwner);
	var bearGenderLabel = $('<label>').text('bear\'s gender');
	var boyLabel = $('<label for="boy">').text('boy');
	var boy = $('<input type="radio">').attr('name', 'bearGender').val('M').attr('id', 'boy');
	var girlLabel = $('<label for="girl">').text('girl');
	var girl = $('<input type="radio">').attr('name', 'bearGender').val('F').attr('id', 'girl');
	var submitBear = $('<button>').attr('id', 'submit_bear').text('submit');

	$('#login').empty().append(bearNameLabel)
							.append(bearName)
							.append(bearGenderLabel)
							.append(boyLabel)
							.append(boy)
							.append(girlLabel)
							.append(girl)
							.append(submitBear);
};

function createBear() {
	var bearOwner = $('input[name="bearName"]').attr('id');
	var bearName = $('input[name="bearName"]').val();
	var bearGender = $('input:radio[name=bearGender]:checked').val();
	
	newBear = {
		user_id: bearOwner,
		name: bearName,
		gender: bearGender
	}

	$.post('/bears', newBear).done(function(data){
		var bearID = data.id;
		$.get('/bears/' + bearID).done(bearScreenData);
	});
}

function renderSession(currentUser){
	var userID = currentUser.id;
	
	var bears = currentUser.bears;
	// var bearBox = $('<button>').text();
	
	$('#login').empty().append(getBears(bears));
};

function getBears(bears){
	var bearList = [];
	for (var i = 0; i < bears.length; i++) {

		var name = bears[i].name;
		console.log(name);
		var id = bears[i].id;
		var bearButton = $('<button>').text(name)
																	.addClass('getBearButton')
																	.data('id', id);
		$(bearButton).appendTo('#login');
	}
};

function renderBearScreen() {
	console.log('renderBearScreen');
	bearID = $(this).data('id');
	$.get('/bears/' + bearID).done(bearScreenData);
};

function bearScreenData(bear) {
	$('#login').remove();
	var fullpage = $('<div>').attr('id', 'fullpage');
	var userName = bear.user.child_name;
	var bearName = bear.name;
	var bearImage = $('<div>').addClass('bear');
	var userDiv = $('<div>').text('Hi, ' + userName + '! My name is ' + bearName + '.').addClass('container').addClass('bear_text');
	var favoriteColor = bear.user.favorite_color;
	var happyButton = $('<button>').text('Add Happy').attr('id', 'add_happy');
	//gather the bear's memories
	var bearMemories = bear.memories;
	var slidingPane = $('<div>').attr('id', 'fullpage');
	var bearSection = $('<div>').addClass('section');
	var bearSlide = $('<div>').addClass('slide').attr('id', 'slide1');
	var memorySlide = $('<div>').addClass('slide').attr('id', 'slide2');
	var bearLand = $('<div>').attr('id',  'bear_land');
	var bearSlideInfo = '<div id="memory_drop">memory drop</div><div id="search_zone"><div id="search_bar"><label id="search_bar_label">search</label><input type="text" name="search" placeholder="search"><button id="search_button">search</button></div><div id="searches_box"></div></div><span class="clearfix"></span>';
	var memoryBox = $('<div id="memory_box">');
	bearLand.append(userDiv).append(bearImage).append(happyButton);
	bearSlide.append(bearLand).append(bearSlideInfo);
	memorySlide.append(memoryBox);
	bearSection.append(bearSlide).append(memorySlide);
	fullpage.append(bearSection);	
	$('body').append(fullpage);
	bearLand.append(bearFeelingsCounter(bear))
	$('#fullpage').fullpage({
		//Navigation
    menu: false,
    anchors:['firstSlide', 'secondSlide'],
    navigation: false,
    navigationPosition: 'right',
    navigationTooltips: ['firstSlide', 'secondSlide'],
    slidesNavigation: true,
    slidesNavPosition: 'bottom',

    //Scrolling
    css3: true,
    scrollingSpeed: 700,
    autoScrolling: true,
    scrollBar: false,
    easing: 'easeInQuart',
    easingcss3: 'ease',
    loopBottom: false,
    loopTop: false,
    loopHorizontal: true,
    continuousVertical: false,
    normalScrollElements: '#element1, .element2',
    scrollOverflow: false,
    touchSensitivity: 15,
    normalScrollElementTouchThreshold: 5,

    //Accessibility
    keyboardScrolling: true,
    animateAnchor: true,

    //Design
    controlArrows: true,
    verticalCentered: true,
    resize : true,
    sectionsColor : ['#ccc', '#fff'],
    paddingTop: '10px',
    paddingBottom: '10px',
    fixedElements: '#header, .footer',
    responsive: 0,

    //Custom selectors
    sectionSelector: '.section',
    slideSelector: '.slide'
	});
	bearMemories.forEach(fetchMemory);
};

function search(){
	var value = $('input[name="search"]').val();
	console.log(value);
	var newSearch = {
		search: value
	};
	console.log(newSearch);
	$.post('/bings/', newSearch).done(function(searches){
		$('#searches_box').empty();
		console.log(searches.d.results[1].MediaUrl);
		for(var i = 0; i < searches.d.results.length; i++) {
			var searchUrl = searches.d.results[i].MediaUrl;
			if (searchUrl) {
				var searchImage = $('<img>').attr('src', searchUrl).addClass('search_image');
				lastSearch = value;
				$('#searches_box').append(searchImage);
			}	
		}
	});
};

function imageBox(url){
	$('<div>').css('background', 'url(' + url + ')');
};

function searchImageDraggable(){
	$(this).draggable({
		helper: 'clone'
	});
};

function searchImagePosition(){
	$(this).css('position', 'fixed');
};

function mouseLeaveSearchImage(){
	$('.move_to_bear').remove();
};

function moveImageToMemory(clone){
	var url = clone.attr('src');
	var newMemory = {
		bear_id: bearID,
		keyword: lastSearch,
		image_url: url
	};

	$.post('/memories/', newMemory).done(function(data){
		alert('post went through');
		fetchMemory(data);
		raiseHappy;
	}
		);
};

function fetchMemory(memory){
	console.log(memory);
	var image = $('<img>').attr('src', memory.image_url).addClass('memory_image');
	var keyword = $('<p>').text(memory.keyword).addClass('memory_keyword');
	console.log("fetching memory: " + image);
	var memoryItem = $('<div>').append(image).append(keyword).addClass('container').addClass('memory_item');
	memoryItem.prependTo('#memory_box');
};


// function changeColor(x,y){
//   var hue = x / parseInt($(window).width()) * 360;
//   var saturation = ",100%,"
//   var lightness = y / parseInt($(window).height()) * 100;
//   var hsl = "hsl("+hue+saturation+lightness+"%)";
//   return hsl;
// };

function bearFeelingsCounter(bear) {
	var energy = bear.energy;
	var happy = bear.happiness;
	var hunger = bear.hunger;
	var energyBar = $('<div>').addClass('bear_bar').attr('id', 'energy').css('width', energy);
	var happyBar = $('<div>').addClass('bear_bar').attr('id', 'happy').css('width', happy);
	var hungerBar = $('<div>').addClass('bear_bar').attr('id', 'hunger').css('width', hunger);
	$('body').append(energyBar)
					.append('<br>')
					.append(happyBar)
					.append('<br>')
					.append(hungerBar);

	setInterval(function(){
		$.ajax({
			url: '/bears/' + bearID + '/automaticscore', 
			type: 'put'
		}).done(renderBearFeelings)
	}, 86000);
};

function renderBearFeelings(bear){
	$('#energy').css('width', bear.energy + 'px');
	$('#happy').css('width', bear.happiness + 'px');
	$('#hunger').css('width', bear.hunger + 'px');
};

function raiseHappy(){
	$.ajax({
			url: '/bears/' + bearID + '/raise_happy', 
			type: 'put'
		}).done(renderBearFeelings);
};
