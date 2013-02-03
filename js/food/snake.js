Fudo.Snake = Fudo.Food.extend({

	initialize: function() {
		Fudo.Food.prototype.initialize.apply(this, arguments);
		this.set("view", new Fudo.SnakeView({ model: this }));
	},

	applyToFriend: function(friend) {

		if (friend.get("evil") < 1) {
			friend.set("happiness", friend.get("happiness") - .3);
			friend.set("boredom", friend.get("boredom") - .3);
			friend.set("evil", friend.get("evil") + .1);
		}

		else {
			friend.set("happiness", 1);
			friend.set("evil", friend.get("evil") + .1);
		}
		friend.set("hunger", friend.get("hunger") - .7);

	},

});
