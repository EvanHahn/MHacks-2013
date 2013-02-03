(function() {

	// If we don't support canvas, abort mission.
	var supportsCanvas = !!document.createElement("canvas").getContext;
	if (!supportsCanvas)
		return;

	// Mark that we're in a supported browser.
	$("html").removeClass("unsupported").addClass("supported");

	// Make sure we have a local friend. Redirect if not.
	var localFriend = Fudo.local.get("friend");
	if (localFriend == null) {
		location.href = "index.html";
		return;
	}

	// Alright, we're good to go.
	$(document).ready(function() {

		// Squash the <body> and give it an ID for Kinetic to use.
		$(".unsupported-content").remove();
		document.body.id = "body";

		// Make a playground. This also makes the Kinetic canvas.
		var playground = new Fudo.Playground();

		// Make our friend.
		// It's intentionally in the global namespace.
		window.friend = new Fudo.Friend({ playground: playground });

		// Load the menus script.
		var menuScript = document.createElement("script");
		menuScript.src = "js/menus.js";
		document.head.appendChild(menuScript);

	});

})();
