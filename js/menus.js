/*
 * Settings menu.
 */
// $(".settings-menu").show();
$(".settings-menu input").on("change", function() {
	var $this = $(this);
	var val = parseFloat($this.val());
	var property = this.name;
	friend.set(property, val);
});
$(".settings-menu .demon").on("click", function() {
	friend.set("evil", 1);
});
$(".settings-menu .kill").on("click", function() {
	Fudo.local.remove("friend");
	location.href = "index.html";
});

/*
 * Food menu
 */
$(".food-menu .activate-button").on("click", function() {
	$(".food-menu").addClass("active");
	Fudo.playAudio("sounds/poke1.ogg");
	return false;
});
$(".food-button").on("click", function() {
	var type = $(this).data("food");
	if (type == "cupcake") {
		new Fudo.Cupcake({ playground: playground });
	} else if (type == "snake") {
		new Fudo.Snake({ playground: playground });
	}
	Fudo.playAudio("sounds/poke2.ogg");
	$(".food-menu").removeClass("active");
});
