Fudo.FriendView = Fudo.View.extend({

	/*
	 * Initialize.
	 */
	initialize: function() {

		// Call super.
		Fudo.View.prototype.initialize.apply(this, arguments);

		// What stage am I going to be drawing on?
		this.stage = this.model.get("playground").get("stage");

		// Create the layers we'll need.
		this.bodyLayer = new Kinetic.Layer;
		this.bodyImage = Fudo.Image("sprites/body.png");
		this.bodyImage.width = 257;
		this.bodyImage.height = 307;
		this.bodySprite = new Kinetic.Image({
			x: -1, y: -1,
			image: this.bodyImage,
			width: this.bodyImage.width,
			height: this.bodyImage.height,
		});
		this.bodyLayer.add(this.bodySprite);
		this.stage.add(this.bodyLayer);

	},

	/*
	 * Render the friend view.
	 */
	render: function() {
		this.bodySprite.setX(Math.random() * 500);
		this.bodySprite.setY(Math.random() * 500);
		this.bodySprite.setZIndex(0);
		this.bodyLayer.draw();
	},

});
