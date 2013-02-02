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

		// Define all the images.
		this.images = {
			body: Fudo.Image("sprites/body.png"),
			eyeNeutral: Fudo.Image("sprites/eye.png"),
			eyebrowLeftNeutral: Fudo.Image("sprites/ebNeutral_l.png"),
			eyebrowRightNeutral: Fudo.Image("sprites/ebNeutral_r.png"),
			eyeBlink: Fudo.Image("sprites/blink.png"),
			mouthHappyOpen: Fudo.Image("sprites/mouthHappyOpen.png"),
			mouthNeutralClosed: Fudo.Image("sprites/mouthHappyClosed.png"),
			mouthStraightClosed: Fudo.Image("sprites/mouthNeutral.png"),
			mouthSadOpen: Fudo.Image("sprites/mouthSadderOpen.png"),
			shadow: Fudo.Image("sprites/shadow.png"),
		};

		// Create the shadow sprite.
		this.shadowSprite = new Kinetic.Image({
			x: 0, y: 0,
			image: this.images.shadow,
			width: 175,
			height: 36,
			offset: {
				x: 175 / 2,
				y: 36 / 2
			}
		});
		this.group.add(this.shadowSprite);

		// Create the body sprite.
		this.bodySprite = new Kinetic.Image({
			x: 0, y: 0,
			image: this.images.body,
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
				image: this.images.eyeNeutral,
				width: 31,
				height: 33,
				offset: {
					x: 31 / 2,
					y: 33 / 2
				}
			});
			this.group.add(this[name]);
		}, this);
		this.leftEyeCenterX = -75;
		this.leftEyeCenterY = -160;
		this.rightEyeCenterX = 50;
		this.rightEyeCenterY = -160;
		this.maxEyeMovement = 10;

		// Create the eyebrows.
		this.leftEyebrowSprite = new Kinetic.Image({
			image: this.images.eyebrowLeftNeutral,
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
		this.rightEyebrowSprite = new Kinetic.Image({
			image: this.images.eyebrowRightNeutral,
			x: 50,
			y: -190,
			width: 42,
			height: 18,
			offset: {
				x: 42 / 2,
				y: 18 / 2,
			}
		});
		this.group.add(this.rightEyebrowSprite);

		// Create the mouth.
		this.mouthSprite = new Kinetic.Image({
			image: this.images.mouthHappyOpen,
			x: -5,
			y: -125,
			width: 80,
			height: 55,
			offset: {
				x: 80 / 2,
				y: 55 / 2
			}
		});
		this.group.add(this.mouthSprite);

	},

	/*
	 * Render the friend view.
	 */
	render: function() {

		// Shift the eyes.
		var eyeXMovement = 0;
		var eyeYMovement = 0;
		this.leftEyeSprite.setX(this.leftEyeCenterX - eyeXMovement);
		this.leftEyeSprite.setY(this.leftEyeCenterY + eyeYMovement);
		this.rightEyeSprite.setX(this.rightEyeCenterX - eyeXMovement);
		this.rightEyeSprite.setY(this.rightEyeCenterY + eyeYMovement);

		// Blinking?
		if (this.model.get("blinking")) {
			this.leftEyeSprite.setImage(this.images.eyeBlink);
			this.rightEyeSprite.setImage(this.images.eyeBlink);
		} else {
			this.leftEyeSprite.setImage(this.images.eyeNeutral);
			this.rightEyeSprite.setImage(this.images.eyeNeutral);
		}

		// Change the mouth accordingly.
		if (this.model.get("happiness") > .5) {
			this.mouthSprite.setImage(this.images.mouthHappyOpen);
		} else if (this.model.get("happiness") >= 0) {
			this.mouthSprite.setImage(this.images.mouthNeutralClosed);
		} else if (this.model.get("happiness") > -.5) {
			this.mouthSprite.setImage(this.images.mouthStraightClosed);
		} else {
			this.mouthSprite.setImage(this.images.mouthSadOpen);
		}

		// Change size based on age.
		var scale = Math.max(Math.min(1, this.model.get("age") / 300000), .5);
		this.group.setScale(scale, scale);

		// Place the group, and unrotate the shadow.
		this.group.setX(this.model.get("x"));
		this.group.setY(this.model.get("y"));
		this.group.setRotation(this.model.get("angle"));
		this.shadowSprite.setRotation(-this.model.get("angle"));

		// Draw!
		this.layer.draw();

	},

});
