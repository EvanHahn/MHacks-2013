Fudo.Food = Fudo.Model.extend({

	/*
	 * Constructor.
	 */
	initialize: function() {
		Fudo.Model.prototype.initialize.apply(this, arguments);
		this.set("x", friend.get("x"));
		this.set("y", -100);
		this.set("accelerationY", .001);
		this.on("change:y", this.checkCollision, this);
	},

	/*
	 * If we reach the friend's mouth, feed it!
	 */
	checkCollision: function() {
		if (this.get("y") > (friend.get("y") - 200)) {
			this.remove();
			this.applyToFriend(friend);
		}
	},

});
