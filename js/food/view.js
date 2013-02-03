Fudo.FoodView = Fudo.View.extend({

	/*
	 * Initialize.
	 */
	initialize: function() {

		// Call super.
		Fudo.View.prototype.initialize.apply(this, arguments);

		// Where will I draw?
		this.stage = this.model.get("playground").get("stage");
		this.layer = new Kinetic.Layer;
		this.stage.add(this.layer);
		this.group = new Kinetic.Group({
			x: -1, y: -1, rotation: 0
		});
		this.layer.add(this.group);

		// Add the sprite.
		this.sprite = new Kinetic.Image({
			x: 0, y: 0,
			image: new Image,
			width: 64, height: 64,
			offset: {
				x: 32,
				y: 32,
			}
		});
		this.group.add(this.sprite);

	},

	/*
	 * Draw the sprite.
	 */
	render: function() {
		this.group.setX(this.model.get("coords")[0]);
		this.group.setY(this.model.get("coords")[1]);
		this.group.setRotation(this.model.get("angle"));
		this.layer.draw();
	}

});
