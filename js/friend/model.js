Fudo.Friend = Fudo.Model.extend({

	/*
	 * List the properties that need syncing.
	 */
	TO_SYNC: [
		"name",
		"birthday",
		"happiness",
		"tiredness",
		"surprise",
		"fear",
		"boredom",
		"evil",
	],

	/*
	 * List the -1 to 1 properties.
	 */
	BOUNDED: [
		"happiness",
		"tiredness",
		"surprise",
		"fear",
		"boredom",
		"evil",
	],

	/*
	 * Default properties.
	 */
	defaults: function() {
		return {
			birthday: Date.now(),
			happiness: .5,
			tiredness: 1,
			boredom: Fudo.randomRange(-1, 1),
			fear: -1,
			evil: 0,
			state: "idle",
		};
	},

	/*
	 * Construct a friend.
	 */
	initialize: function() {

		// Call super.
		Fudo.Model.prototype.initialize.apply(this, arguments);

		// Fetch stuff.
		this.fetch();

		// Set up some initial properties.
		this.moveToCenter();
		this.changeWindowTitle();
		if (this.get("name") == "666")
			this.set("evil", 1);
		if (this.get("tiredness") >= 1) {
			setTimeout(_(function() {
				this.set("tiredness", .9);
			}).bind(this), 3000);
			setTimeout(_(function() {
				this.set("tiredness", 0);
			}).bind(this), 6000);
		}

		// More initial properties, based on other stuff.
		if (this.get("evil") >= 1)
			this.enterDemonMode();

		// Respond to things.
		this.on("change:happiness", this.happinessChanged, this);
		this.on("change:evil", this.evilChanged, this);
		this.on("change:tiredness", this.tirednessChanged, this);
		this.get("playground").on("resize", this.wallsMove, this);

		// Don't let bounded properties get too large.
		_(this.BOUNDED).each(function(attribute) {
			this.setters[attribute] = function(value) {
				if (value < -1)
					return -1;
				else if (value > 1)
					return 1;
				else
					return value;
			};
		}, this);

		// Make sure that we sync whatever we should sync.
		_(this.TO_SYNC).each(function(attribute) {
			this.on("change:" + attribute, this.sync, this);
		}, this);

		// Do an initial sync.
		this.sync();

		// Set up the view.
		this.set("view", new Fudo.FriendView({ model: this }));


	},

	/*
	 * Some accessors.
	 */
	getters: {
		age: function() {
			return Date.now() - this.get("birthday");
		},
	},

	/*
	 * When happiness is changed...
	 */
	happinessChanged: function() {

		// What's the previous happiness?
		var previous = this.previous("happiness");

		// Quiet the music if I'm really sad.
		if (this.get("evil") < 1)
			this.get("playground").get("music").volume = (this.get("happiness") + 1) / 2;

	},

	/*
	 * When evil is changed...
	 */
	evilChanged: function() {

		// ENTER ＤＥＭＯＮ MODE
		if (this.get("evil") >= 1) {
			this.enterDemonMode();
		}

	},

	/*
	 * When tiredness is changed...
	 */
	tirednessChanged: function() {
		if (this.previous("tiredness") >= 1) {
			if (this.get("tiredness") > .8) {
				this.set("angularVelocity", .001);
				this.set("angularAcceleration", -.000001);
			}
		}
	},

	/*
	 * ＤＥＭＯＮﾠＭＯＤＥ
	 */
	enterDemonMode: function() {

		// SHUT IT ALL UP, SCREAM ＤＥＭＯＮ
		this.get("playground").get("music").pause();
		this.get("playground").set("music", Fudo.playAudio("sounds/bgm_evil.ogg"));
		Fudo.playAudio("sounds/demon_spoken.ogg");

		// SHIFT YOUR MOOD AT WILL
		this.set("evil", 1);
		this.set("happiness", 1);
		this.set("boredom", 0);

		// WELCOME TO HELL
		$(document.body).hide();
		$(document.documentElement).css({ background: "#000" });
		setTimeout(function() {
			$(document.documentElement).css({ background: "#fff" });
		}, 100);
		setTimeout(function() {
			$(document.documentElement).css({ background: "#000" });
		}, 200);
		setTimeout(function() {
			$(document.documentElement).css({ background: "#fff" });
		}, 300);
		setTimeout(function() {
			$(document.documentElement).css({ background: "#000" });
		}, 400);
		setTimeout(function() {
			$(document.documentElement).css({ background: "#fff" });
			$(document.body).css({
				background: "#000 url(sprites/background_demon.png) no-repeat center center",
			});
			$(document.body).show();
		}, 500);

		// YOU DESERVE TO STARVE
		$(".food-menu").removeClass("active");

		// AGE A THOUSAND MOONS
		this.set("birthday", -666);

	},

	/*
	 * On every frame...
	 */
	onFrame: function() {

		var now = Date.now();

		// Should I be falling?
		if (this.get("y") < Fudo.center.y()) {
			this.set("accelerationY", .01);
		} else {
			this.set("accelerationY", 0);
			this.set("velocityY", 0);
		}

		// Idle state.
		if (this.get("state") == "idle") {

			// Wobble!
			if ((this.get("fear") < .5) && (this.get("tiredness") < .8)) {

				if (this.get("evil") < 1) {
					if (this.get("boredom") > .5) {
						this.set("angle", Math.sin(now / 800) / 3);
					} else if (this.get("boredom") < -.5) {
						if (Math.floor(Date.now() / 100) % 10)
							this.hop(1);
					} else {
						this.set("angle", Math.sin(now / 500) / 25);
					}
				} else {
					this.set("angle", Math.sin(now / 100) / 25);
				}

			} else if (this.get("tiredness") < .8) {
				this.set({
					angle: 0,
					angularVelocity: 0,
					angularAcceleration: 0,
				});
			}

			// Should I be blinking?
			if ((now % 4000) < 50) {
				this.set("blinking", true);
				var self = this;
				setTimeout(function() {
					self.set("blinking", false);
				}, 1000);
			}
			else {
				this.set("blinking", false);
			}

			// Am I crying?
			if (this.get("happiness") < -.9) {
				Fudo.playAudio("sounds/waaaaa.ogg").volume = .3;
			}

			// Randomly hop every once in awhile.
			if (this.get("tiredness") < 1) {
				if (Math.random() < .001) {
					this.hop((Math.random() * 2) + 1);
				}
			}

			// Make the angle proper depending on tiredness.
			if (this.get("tiredness") >= 1) {
				this.set("angle", Math.PI / 2);
			}
			if ((this.get("tiredness") >= 1) || (this.get("tiredness") < .8)) {
				this.set("angularVelocity", 0);
				this.set("angularAcceleration", 0);
			}

			// Equalize mood.
			this.set("boredom", Fudo.approach(this.get("boredom"), 1.5, .001));
			this.set("happiness", Fudo.approach(this.get("happiness"), .5, .001));
			this.set("fear", Fudo.approach(this.get("fear"), -.5, .001));

		}

	},

	/*
	 * Change the window title based on the name.
	 */
	changeWindowTitle: function() {
		document.title = this.get("name") + " the fudo!";
	},

	/*
	 * Move to the center.
	 */
	moveToCenter: function() {
		this.set("x", Fudo.center.x());
		this.set("y", Fudo.center.y());
	},

	/*
	 * Woah! The walls moved!
	 */
	wallsMove: function() {
		this.moveToCenter();
	},

	/*
	 * Hop (if we can)!
	 */
	hop: function(amount) {
		if (this.get("y") >= Fudo.center.y()) {
			this.set("velocityY", amount * -1);
			this.trigger("hop");
		}
	},

	/*
	 * Fetch our friend from local storage and the server.
	 * This is one-way: it loads from local storage and the server.
	 * It should only be called once.
	 */
	fetch: function() {

		// Warn if we call this method more than once.
		if (this.get("fetched"))
			console.warn("Friend#fetch should only be called once.");
		this.set("fetched", true);

		// Fetch from local storage.
		var localJSON = Fudo.local.get("friend");
		if (localJSON) {
			this.set(JSON.parse(localJSON));
			console.log("Fetched friend from local storage.");
		}

		// Fetch from the server.
		// TODO

	},

	/*
	 * Sync our friend with local storage and the server.
	 * This is one-way: it writes to local storage and the server.
	 */
	sync: _.debounce(function() {

		// What to save?
		var toSave = {};
		_(this.TO_SYNC).each(function(attribute) {
			toSave[attribute] = this.get(attribute);
		}, this);
		toSave.updatedAt = Date.now();
		toSave.version = Fudo.VERSION;
		var saveString = JSON.stringify(toSave);

		// Local storage sync.
		Fudo.local.set("friend", saveString);
		console.log("Saved friend to local storage.");

		// Server sync.
		// TODO

	}, 1000),

});
