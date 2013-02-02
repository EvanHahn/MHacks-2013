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
		this.group = new Kinetic.Group({
			x: -1, y: -1, rotation: 0
		});
		this.layer.add(this.group);

		// Create the body sprite.
		this.bodySprite = new Kinetic.Image({
			x: 0, y: 0,
			image: Fudo.Image("sprites/body.png"),
			width: 257,
			height: 307,
			offset: {
				x: 257 / 2,
				y: 300
			}
		});
		this.group.add(this.bodySprite);

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
			this.group.add(this[name]);
		}, this);
		this.leftEyeSprite.setX(-75);
		this.leftEyeSprite.setY(-160);
		this.rightEyeSprite.setX(50);
		this.rightEyeSprite.setY(-160);

		// Create the eyebrows.
		this.leftEyebrowSprite = new Kinetic.Image({
			image: Fudo.Image("sprites/eyebr_l.png"),
			x: -75,
			y: -190,
			width: 42,
			height: 16,
			offset: {
				x: 42 / 2,
				y: 16 / 2,
			}
		});
		this.group.add(this.leftEyebrowSprite);
		this.leftEyebrowSprite = new Kinetic.Image({
			image: Fudo.Image("sprites/eyebr_r.png"),
			x: 50,
			y: -190,
			width: 42,
			height: 18,
			offset: {
				x: 42 / 2,
				y: 18 / 2,
			}
		});
		this.group.add(this.leftEyebrowSprite);

	},

	/*
	 * Render the friend view.
	 */
	render: function() {

		// Place the group.
		this.group.setX(this.model.get("x"));
		this.group.setY(this.model.get("y"));
		this.group.setRotation(this.model.get("angle"));

		// Draw!
		this.layer.draw();

	},

});
