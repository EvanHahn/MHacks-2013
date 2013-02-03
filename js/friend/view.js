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
			bodyDemon: Fudo.Image("sprites/body_devil.png"),
			eyeNeutral: Fudo.Image("sprites/eye.png"),
			eyeLeftDilated: Fudo.Image("sprites/eyeDilated_l.png"),
			eyeRightDilated: Fudo.Image("sprites/eyeDilated_r.png"),
			eyeLeftX: Fudo.Image("sprites/eyeX_l.png"),
			eyeRightX: Fudo.Image("sprites/eyeX_r.png"),
			eyeSparkle: Fudo.Image("sprites/eyeSparkle.png"),
			eyebrowLeftNeutral: Fudo.Image("sprites/ebNeutral_l.png"),
			eyebrowRightNeutral: Fudo.Image("sprites/ebNeutral_r.png"),
			eyebrowLeftMad: Fudo.Image("sprites/ebMad_l.png"),
			eyebrowRightMad: Fudo.Image("sprites/ebMad_r.png"),
			eyeBlink: Fudo.Image("sprites/blink.png"),
			eyeMidBlink: Fudo.Image("sprites/midblink.png"),
			eyeClosed: Fudo.Image("sprites/eyeClosed.png"),
			mouthHappierOpen: Fudo.Image("sprites/mouthHappierOpen.png"),
			mouthHappyOpen: Fudo.Image("sprites/mouthHappyOpen.png"),
			mouthHappyClosed: Fudo.Image("sprites/mouthHappyClosed.png"),
			mouthNeutral: Fudo.Image("sprites/mouthNeutral.png"),
			mouthSadClosed: Fudo.Image("sprites/mouthSadClosed.png"),
			mouthSadOpen: Fudo.Image("sprites/mouthSadOpen.png"),
			mouthSadderOpen: Fudo.Image("sprites/mouthSadderOpen.png"),
			mouthTeeth: Fudo.Image("sprites/mouthTeeth.png"),
			mouthHappierOpenDemon: Fudo.Image("sprites/mouthHappierOpen_D.png"),
			wingsLeftDemonSmall: Fudo.Image("sprites/wingsDemon1_l.png"),
			wingsRightDemonSmall: Fudo.Image("sprites/wingsDemon1_r.png"),
			wingsLeftDemonBig: Fudo.Image("sprites/wingsDemon2_l.png"),
			wingsRightDemonBig: Fudo.Image("sprites/wingsDemon2_r.png"),
			hornsDemonBig: Fudo.Image("sprites/hornsDemon3.png"),
			hornsDemonMedium: Fudo.Image("sprites/hornsDemon2.png"),
			hornsDemonSmall: Fudo.Image("sprites/hornsDemon1.png"),
			speechBubble: Fudo.Image("sprites/speech.png"),
		};

		// Create the wings.
		this.leftWingSprite = new Kinetic.Image({
			image: this.images.wingsLeftDemonSmall,
			x: -90,
			y: -190,
			width: 158,
			height: 158,
			offset: {
				x: 151,
				y: 125,
			}
		});
		this.group.add(this.leftWingSprite);
		this.rightWingSprite = new Kinetic.Image({
			image: this.images.wingsRightDemonSmall,
			x: 90,
			y: -190,
			width: 158,
			height: 158,
			offset: {
				x: 8,
				y: 125,
			}
		});
		this.group.add(this.rightWingSprite);

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
			width: 45,
			height: 20,
			offset: {
				x: 45 / 2,
				y: 20 / 2,
			}
		});
		this.group.add(this.leftEyebrowSprite);
		this.rightEyebrowSprite = new Kinetic.Image({
			image: this.images.eyebrowRightNeutral,
			x: 50,
			y: -190,
			width: 45,
			height: 20,
			offset: {
				x: 45 / 2,
				y: 20 / 2,
			}
		});
		this.group.add(this.rightEyebrowSprite);

		// Create the horns.
		this.hornSprite = new Kinetic.Image({
			image: this.images.hornsDemonBig,
			x: 0,
			y: -270,
			width: 210,
			height: 112,
			offset: {
				x: 210 / 2,
				y: 112 / 2
			}
		});
		this.group.add(this.hornSprite);

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

		// Create the speech bubble.
		this.speechBubbleGroup = new Kinetic.Group;
		this.speechBubbleSprite = new Kinetic.Image({
			image: this.images.speechBubble,
			x: 0, y: 0,
			width: 200,
			height: 200,
			offset: {
				x: 50,
				y: 190
			}
		});
		this.speechBubbleGroup.add(this.speechBubbleSprite);
		this.layer.add(this.speechBubbleGroup);

		// Bind some events to some sounds.
		this.model.on("hop", function() {
			Fudo.playAudio("sounds/hop.ogg");
		});

	},

	/*
	 * Render the friend view.
	 */
	render: function() {

		// Add some variables for shifting.
		var xShift = 0;
		var yShift = 0;
		var angleShift = 0;

		// Reset everything.
		_([this.leftEyebrowSprite, this.rightEyebrowSprite]).each(function(sprite) {
			sprite.setRotation(0);
		});

		// Which body?
		if (this.model.get("evil") < 1)
			this.bodySprite.setImage(this.images.body);
		else
			this.bodySprite.setImage(this.images.bodyDemon);

		// Shift the eyes.
		var eyeXMovement = 0;
		var eyeYMovement = 0;
		this.leftEyeSprite.setX(this.leftEyeCenterX - eyeXMovement);
		this.leftEyeSprite.setY(this.leftEyeCenterY + eyeYMovement);
		this.rightEyeSprite.setX(this.rightEyeCenterX - eyeXMovement);
		this.rightEyeSprite.setY(this.rightEyeCenterY + eyeYMovement);

		// Blinking?
		if (this.model.get("blinking")) {
			this.leftEyeSprite.setImage(this.images.eyeMidBlink);
			this.rightEyeSprite.setImage(this.images.eyeMidBlink);
			this.leftEyeSprite.setImage(this.images.eyeBlink);
			this.rightEyeSprite.setImage(this.images.eyeBlink);
			this.leftEyeSprite.setImage(this.images.eyeMidBlink);
			this.rightEyeSprite.setImage(this.images.eyeMidBlink);
		} else {
			this.leftEyeSprite.setImage(this.images.eyeNeutral);
			this.rightEyeSprite.setImage(this.images.eyeNeutral);
		}

		// Change the mouth accordingly.
		if (this.model.get("happiness") >= 1) {
			this.mouthSprite.setImage(this.images.mouthHappierOpen);
			this.leftEyeSprite.setImage(this.images.eyeSparkle);
			this.rightEyeSprite.setImage(this.images.eyeSparkle);
		} else if (this.model.get("happiness") >= .75) {
			this.mouthSprite.setImage(this.images.mouthHappyOpen);
		} else if (this.model.get("happiness") >= .5) {
			this.mouthSprite.setImage(this.images.mouthHappyClosed);
		} else if (this.model.get("happiness") >= 0) {
			this.mouthSprite.setImage(this.images.mouthNeutral);
		} else if (this.model.get("happiness") >= -.5) {
			this.mouthSprite.setImage(this.images.mouthSadClosed);
		} else if (this.model.get("happiness") >= -.75) {
			this.mouthSprite.setImage(this.images.mouthSadOpen);
		} else {
			this.mouthSprite.setImage(this.images.mouthSadderOpen);
			this.leftEyeSprite.setImage(this.images.eyeLeftX);
			this.rightEyeSprite.setImage(this.images.eyeRightX);
		}

		// Afraid?
		if (this.model.get("fear") > .9) {
			this.mouthSprite.setImage(this.images.mouthSadderOpen);
			this.leftEyeSprite.setImage(this.images.eyeSparkle);
			this.rightEyeSprite.setImage(this.images.eyeSparkle);
			this.leftEyebrowSprite.setRotation(-.5);
			this.rightEyebrowSprite.setRotation(.5);
		}
		else if (this.model.get("fear") > .6) {
			this.mouthSprite.setImage(this.images.mouthSadClosed);
			this.leftEyebrowSprite.setRotation(-.25);
			this.rightEyebrowSprite.setRotation(.25);
		}
		else if (this.model.get("fear") > .3) {
			this.mouthSprite.setImage(this.images.mouthNeutral);
		}
		if (this.model.get("fear") > 0) {
			var fearShift = Math.random() * this.model.get("fear") * 5;
			xShift += fearShift;
		}
		if (this.model.get("fear") > .9) {
			Fudo.playAudio("sounds/fear_rattle.ogg");
		}

		// Are we asleep?
		if (this.model.get("tiredness") >= 1) {
			this.leftEyeSprite.setImage(this.images.eyeClosed);
			this.rightEyeSprite.setImage(this.images.eyeClosed);
			if (Math.floor(Date.now() / 1000) % 1000) {
				Fudo.playAudio("sounds/sigh.ogg");
			}
			this.model.get("playground").get("music").volume = .3;
		}

		// Change stuff based on evil mode.
		this.hornSprite.setVisible(true);
		this.leftWingSprite.setVisible(true);
		this.rightWingSprite.setVisible(true);
		if (this.model.get("evil") >= 1) {
			this.mouthSprite.setImage(this.images.mouthHappierOpenDemon);
			this.leftEyeSprite.setImage(this.images.eyeSparkle);
			this.rightEyeSprite.setImage(this.images.eyeSparkle);
			this.leftEyebrowSprite.setImage(this.images.eyebrowLeftMad);
			this.rightEyebrowSprite.setImage(this.images.eyebrowRightMad);
		}
		if (this.model.get("evil") > .8) {
			this.leftWingSprite.setImage(this.images.wingsLeftDemonBig);
			this.rightWingSprite.setImage(this.images.wingsRightDemonBig);
		} else if (this.model.get("evil") > .4) {
			this.leftWingSprite.setImage(this.images.wingsLeftDemonSmall);
			this.rightWingSprite.setImage(this.images.wingsRightDemonSmall);
		} else {
			this.leftWingSprite.setVisible(false);
			this.rightWingSprite.setVisible(false);
		}
		if (this.model.get("evil") >= 1) {
			this.hornSprite.setImage(this.images.hornsDemonBig);
		} else if (this.model.get("evil") > .6) {
			this.hornSprite.setImage(this.images.hornsDemonMedium);
		} else if (this.model.get("evil") > .2) {
			this.hornSprite.setImage(this.images.hornsDemonSmall);
		} else {
			this.hornSprite.setVisible(false);
		}

		// Change size based on age.
		var scale = Math.max(Math.min(1, this.model.get("age") / 300000), .5);
		this.group.setScale(scale, scale);
		if (this.model.get("age") > 10000000) {
			this.group.setScale(1.2, 1.2);
		}

		// Place the group.
		this.group.setX(this.model.get("x") - xShift);
		this.group.setY(this.model.get("y") + yShift);
		this.group.setRotation(this.model.get("angle") + angleShift);

		// Draw the speech bubble.
		this.speechBubbleGroup.setX(this.model.get("x") + 100);
		this.speechBubbleGroup.setY(this.model.get("y") - 200 + Math.sin(Date.now() / 500) * 10);

		// Draw!
		this.layer.draw();

	},

});
