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

		// Create the body sprite.
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

		// Create the eyes.
		_(["leftEyeSprite", "rightEyeSprite"]).each(function(name) {
			this[name] = new Kinetic.Image({
				x: -1, y: -1,
				image: Fudo.Image("sprites/eye.png"),
				width: 31,
				height: 33,
				offset: {
					x: 31 / 2,
					y: 33 / 2
				}
			});
			this.layer.add(this[name]);
		}, this);

	},

	/*
	 * Render the friend view.
	 */
	render: function() {

		// Draw the body.
		this.bodySprite.setX(this.model.get("x"));
		this.bodySprite.setY(this.model.get("y"));
		this.bodySprite.setZIndex(0);

		// Draw the eyes.
		this.leftEyeSprite.setX(this.model.get("x") - 75);
		this.leftEyeSprite.setY(this.model.get("y") - 160);
		this.leftEyeSprite.setZIndex(-1);
		this.rightEyeSprite.setX(this.model.get("x") + 50);
		this.rightEyeSprite.setY(this.model.get("y") - 160);
		this.rightEyeSprite.setZIndex(-1);

		// Draw!
		this.layer.draw();

	},

});
