function loadScript(src) {
	var script = document.createElement("script");
	script.src = src;
	document.head.appendChild(script);
};

function loadImage(src) {
	var image = new Image;
	image.src = src;
};

$(document).ready(function() {

	// Do we already have a friend?
	if (localStorage.getItem("friend")) {
		location.href = "playground.html";
	}

	// When we click on the start button, ask for some stuff.
	$(".start").on("click", function() {
		$(".modal").fadeIn(100);
		$("#name").focus();
		return false;
	});

	// When we submit the modal, save it all.
	$(".modal").on("submit", function() {
		var name = $("#name").val();
		$("#name").attr("disabled", true);
		localStorage.setItem("friend", JSON.stringify({
			name: name,
			isNew: true
		}));
		location.href = "playground.html";
		return false;
	});

	// While we wait, load the vendor libraries and the images.
	var vendors = ["requestanimationframe", "kinetic", "lodash", "backbone", "backbone.accessors"];
	vendors.forEach(function(name) {
		loadScript("vendor/" + name + ".js");
	});
	var images = ["background1"];
	images.forEach(function(name) {
		loadImage("sprites/" + name + ".png");
	});

});
