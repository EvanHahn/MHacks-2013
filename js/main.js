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
		var localFriend = Fudo.local.get("friend");
		if (localFriend == null) {
			var name = prompt("What's your fudo's name?");
			var localSave = { name: name };
			Fudo.local.set("friend", JSON.stringify(localSave));
		}
		window.friend = new Fudo.Friend({ playground: playground });

	});

})();
