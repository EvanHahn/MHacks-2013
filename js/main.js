(function() {

	// If we don't support canvas, abort mission.
	var supportsCanvas = !!document.createElement("canvas").getContext;
	if (!supportsCanvas)
		return;

	// Alright, we're good to go.
	$("html").removeClass("unsupported");
	$(document).ready(function() {

		// Squash the <body> and give it an ID for Kinetic to use.
		document.body.innerHTML = "";
		document.body.id = "body";

		// Make a playground.
		var playground = new Fudo.Playground();

		// Make a friend.
		window.friend = new Fudo.Friend({ playground: playground });

	});

})();
