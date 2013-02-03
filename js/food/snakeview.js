Fudo.SnakeView = Fudo.FoodView.extend({

	initialize: function() {
		Fudo.FoodView.prototype.initialize.apply(this, arguments);
		this.sprite.setImage(new Fudo.Image("sprites/snake1.png"));
	}

});
