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

$(function(){
	$('body').on('click', '#login_submit', fetchUserData);
	$('body').on('click', '.getBearButton', renderBearScreen);
	$('body').on('click', '#search_button', search);
});

function fetchUserData() {
$('input[name="title"]').val()
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
}

function renderBearScreen() {
	console.log('renderBearScreen');
	var bearID = $(this).data('id');
	$.get('/bears/' + bearID).done(bearScreenData);
	
}

function bearScreenData(bear) {
	$('#login').remove();
	var userName = bear.user.child_name;
	var bearImage = $('<img>').attr('src', 'http://i676.photobucket.com/albums/vv122/nick_emotics/cute-polar-bear-cub-sitting-on-snow.jpg');
	var userDiv = $('<div>').text(userName + ", " + favoriteColor);
	var favoriteColor = bear.user.favorite_color;

	$('#bear_land').append(bearImage).append(userName).css('background', favoriteColor);
}

function search(){
	$('#search_box').empty()
	var value = $('input[name="search"]').val();
	console.log(value);
	var newSearch = {
		search: value
	};
	console.log(newSearch);
	$.post('/bings/', newSearch).done(function(searches){
		console.log(searches.d.results[1].MediaUrl);
		for(var i = 0; i < searches.d.results.length; i++) {
			var searchImage = $('<img>').attr('src', searches.d.results[i].MediaUrl).data('search', value).addClass('search_image');
			$('#search_box').append(searchImage);
		}
	});
}





