Fudo.Cupcake = Fudo.Food.extend({

	initialize: function() {
		Fudo.Food.prototype.initialize.apply(this, arguments);
		this.set("view", new Fudo.CupcakeView({ model: this }));
	},

	applyToFriend: function(friend) {

		if (friend.get("evil") < 1) {
			friend.set("happiness", Math.min(friend.get("happiness") + .1, 1));
			friend.set("boredom", Math.max(friend.get("boredom") - .3, -1));
			friend.set("evil", Math.max(friend.get("evil") - .1, -1));
		}

		else {
			friend.set("happiness", -1);
			friend.set("evil", Math.max(friend.get("evil") - .1, -1));
		}

	},

});
