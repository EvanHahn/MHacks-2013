Fudo.Food = Fudo.Model.extend({

	initialize: function() {
		Fudo.Model.prototype.initialize.apply(this, arguments);
		this.set("coords", [friend.get("centerX"), -100, 0]);
		this.set("acceleration", [0, .001, 0]);
		this.on("change:coords", this.checkCollision, this);
	},

	checkCollision: function() {
		if (this.get("coords")[1] > (friend.get("centerY") - 200))
			this.remove();
		this.applyToFriend(friend);
	},

});
