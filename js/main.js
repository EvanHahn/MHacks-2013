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

		// Add the settings menu.
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

		// Deal with the food menu.
		$(".food-menu .activate-button").on("click", function() {
			$(".food-menu").toggleClass("active");
			return false;
		});
		$(".food-button").on("click", function() {
			var type = $(this).data("food");
			if (type == "cupcake") {
				new Fudo.Cupcake({ playground: playground });
			} else if (type == "snake") {
				new Fudo.Snake({ playground: playground });
			}
		});

	});

})();
