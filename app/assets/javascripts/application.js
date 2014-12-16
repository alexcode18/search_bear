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

	var password = $('#login_password').val('');
	var email = $('#login_email').val('');
	console.log(email);

	var newSession = {
		session: {
			parent_email: email,
			password: password
		}
	};

	$.post('/sessions', newSession).done(function(data){
		data.forEach(renderUser);
	});
}


function renderUser(currentUser){
	var UserID = currentUser.id;
	var user = currentUser.child_name;
	var favoriteColor = currentUser.favorite_color;

	var userDiv = $('<div>').text(UserID).text(user).text(favoriteColor);

	userDiv.appendTo('body');
};