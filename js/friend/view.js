Fudo.FriendView = Fudo.View.extend({

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

		// Create the layer.
		this.bodySprite = new Kinetic.Image({
			x: -1, y: -1,
			image: Fudo.Image("sprites/body.png"),
			width: 257,
			height: 307,
			offset: {
				x: 257 / 2,
				y: 300
			}
		});
		this.layer.add(this.bodySprite);

	},

	/*
	 * Render the friend view.
	 */
	render: function() {

		// Draw the body.
		this.bodySprite.setX(this.model.get("x"));
		this.bodySprite.setY(this.model.get("y"));
		this.bodySprite.setZIndex(0);

		// Draw!
		this.layer.draw();

	},

});
