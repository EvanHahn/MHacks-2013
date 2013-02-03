Fudo.Snake = Fudo.Food.extend({

	initialize: function() {
		Fudo.Food.prototype.initialize.apply(this, arguments);
		this.set("view", new Fudo.SnakeView({ model: this }));
	},

	applyToFriend: function(friend) {

		if (friend.get("evil") < 1) {
			friend.set("happiness", Math.max(friend.get("happiness") - .3, -1));
			friend.set("boredom", Math.max(friend.get("boredom") - .3, -1));
			friend.set("evil", Math.min(friend.get("evil") + .1, 1));
		}

		else {
			friend.set("happiness", 1);
			friend.set("evil", Math.min(friend.get("evil") + .1, 1));
		}

	},

});
