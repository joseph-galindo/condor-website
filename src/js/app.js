$(document).ready(function() {
	
	// do js memes

	console.log('document ready from app.js');

	//function declarations

	function checkNav() {
	    var nav = $('.main-nav')
	    var anchor = nav.find('a');
	    var current = window.location.pathname.split('/')[1];
	    // current = current.replace('.html','');

	    for (var i = 0; i < anchor.length; i++) {

	    	//this split is messy...doublecheck this works as intended in prod environment

	        if((anchor[i].href).split('/')[3] == current) {
	            anchor[i].className = "active";
	        }

	        if(current == '') {
	        	anchor[0].className = "active";
	        }
	    }
	}

	//function executions

	checkNav();

});