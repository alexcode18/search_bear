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
	var userName = currentUser.child_name;
	var favoriteColor = currentUser.favorite_color;
	var bears = currentUser.bears;
	var bearBox = $('<div>').text(getBears(bears));
	var bearImage = $('<img>').attr('src', 'http://i676.photobucket.com/albums/vv122/nick_emotics/cute-polar-bear-cub-sitting-on-snow.jpg');
	var userDiv = $('<div>').text(userID + ", " + userName + ", " + favoriteColor);
	$('body').append(bearImage).append(userDiv).append(bearBox);
	$('#login').empty();
};

function getBears(bears){
	var bearList = [];
	for (var i = 0; i < bears.length; i++) {
		var name = bears[i].name;
		console.log(name);
		bearList.push(name);
	}
	var bearString = bearList.join(', ');
	console.log(bearString);
	return bearString;
}


