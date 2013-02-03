(function() {

	// If we don't support canvas, abort mission.
	var supportsCanvas = !!document.createElement("canvas").getContext;
	if (!supportsCanvas)
		return;

	// Alright, we're good to go.
	$("html").removeClass("unsupported");
	$("html").addClass("supported");
	$(document).ready(function() {

		// Squash the <body> and give it an ID for Kinetic to use.
		$(".unsupported-content").remove();
		document.body.id = "body";

		// Make a playground.
		var playground = new Fudo.Playground();

		// Make a friend.
		var localFriend = Fudo.local.get("friend");
		if (localFriend == null)
			location.href = "index.html";
		window.friend = new Fudo.Friend({ playground: playground });

		// Add the menu.
		// $(".settings-menu").show();
		$(".settings-menu input").on("change", function() {
			var $this = $(this);
			var val = parseFloat($this.val());
			var property = this.name;
			friend.set(property, val);
		});
		$(".settings-menu .kill").on("click", function() {
			Fudo.local.remove("friend");
			location.href = "index.html";
		});

	});

})();
