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

$(function(){
	$('body').on('click', '#login_submit', fetchUserData);
	$('body').on('click', '.getBearButton', renderBearScreen);
	$('body').on('click', '#search_button', search);
	$('body').on('mouseenter', '.search_image', searchImageHover);
	$('body').on('mouseleave', '.search_image', mouseLeaveSearchImage);
	$('body').on('click', '.move_to_bear', moveImageToMemory);
});

function fetchUserData() {
	var password = $('input[name="login_password"]').val();
	var email = $('input[name="login_email"]').val();

	var newSession = {
		parent_email: email,
		password: password
	};

	$.post('/sessions', newSession).done(renderSession);
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
	var userName = bear.user.child_name;
	var bearName = bear.name;
	var bearImage = $('<div>').addClass('bear');
	var userDiv = $('<div>').text('Hi, ' + userName + '! My name is ' + bearName + '.').addClass('container').addClass('bear_text');
	var favoriteColor = bear.user.favorite_color;
	bearMemories = bear.memories;
	bearMemories.forEach(fetchMemory);
	$('#bear_land').append(userDiv).append(bearImage);
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
			var searchImage = $('<div>').css('background', 'url(' + searchUrl + ')').data('search', value).data('url', searchUrl).addClass('search_image');
			$('#searches_box').append(searchImage);
		}
	});
};

function imageBox(url){
	$('<div>').css('background', 'url(' + url + ')');
};

function searchImageHover(){
	var url = $(this).data('url');
	var keyword = $(this).data('search');
	console.log(url + " " + keyword + " " + bearID);
	var moveToBearButton = $('<button>').text('Move to Bear!').addClass('move_to_bear').data('url', url).data('keyword', keyword);
	$(this).append(moveToBearButton);
};

function mouseLeaveSearchImage(){
	$('.move_to_bear').remove();
};

function moveImageToMemory(){
	var url = $(this).data('url');
	var keyword = $(this).data('keyword');
	console.log(url + " " + keyword + " ");
	var newMemory = {
		bear_id: bearID,
		keyword: keyword,
		image_url: url
	};

	$.post('/memories/', newMemory).done(fetchMemory);
};

function fetchMemory(memory){
	console.log(memory);
	var image = $('<img>').attr('src', memory.image_url).addClass('memory_image');
	var keyword = $('<p>').text(memory.keyword).addClass('memory_keyword');
	console.log("fetching memory: " + image);
	var memoryItem = $('<div>').append(image).append(keyword).addClass('container').addClass('memory_item');
	memoryItem.prependTo('#memory_box');
};
