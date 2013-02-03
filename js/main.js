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

		// Remove the "you're unsupported" bit.
		$(".unsupported-content").remove();

		// Make a playground. This also makes the Kinetic canvas.
		// It's intentionally in the global namespace.
		window.playground = new Fudo.Playground();

		// Make our friend.
		// It's intentionally in the global namespace.
		window.friend = new Fudo.Friend({ playground: playground });

		// Preload some audio.
		(new Audio()).src = "sounds/demon_spoken.ogg";

		// Load the menus script.
		var menuScript = document.createElement("script");
		menuScript.src = "js/menus.js";
		document.head.appendChild(menuScript);

	});

})();
