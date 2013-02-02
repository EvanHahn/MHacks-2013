Fudo.FriendView = Fudo.View.extend({

	/*
	 * Initialize.
	 */
	initialize: function() {

		// Call super.
		Fudo.View.prototype.initialize.apply(this, arguments);

		// What stage am I going to be drawing on?
		this.stage = this.model.get("playground").get("stage");

		// Create the body layer.
		this.bodyLayer = new Kinetic.Layer;
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
		this.bodyLayer.add(this.bodySprite);
		this.stage.add(this.bodyLayer);

	},

	/*
	 * Render the friend view.
	 */
	render: function() {

		// Draw the body.
		this.bodySprite.setX(this.model.get("x"));
		this.bodySprite.setY(this.model.get("y"));
		this.bodySprite.setZIndex(0);
		this.bodyLayer.draw();

	},

});
