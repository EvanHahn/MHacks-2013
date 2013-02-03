Fudo.Friend = Fudo.Model.extend({

	/*
	 * List the properties that need syncing.
	 */
	TO_SYNC: [
		"isNew",
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
	 * Construct a friend.
	 */
	initialize: function() {

		// Call super.
		Fudo.Model.prototype.initialize.apply(this, arguments);

		// Make sure that we sync whatever we should sync.
		_(this.TO_SYNC).each(function(attribute) {
			this.on("change:" + attribute, this.sync, this);
		}, this);

		// Set up some initial properties.
		this.set("coords", [this.get("centerX"), -500, 0]);
		this.set("eyeDirection", 0);
		this.set("state", "idle");

		// Fetch stuff.
		this.fetch();

		// If we're totally new, do the first initialize.
		if (this.get("isNew") !== false)
			this.firstInitialize();

		// More initial properties, based on other stuff.
		if ((this.get("evil") >= 1) || (this.get("name") == "666"))
			this.enterDemonMode();

		// Build a view.
		this.set("view", new Fudo.FriendView({ model: this }));

		// Respond to things!
		this.changeWindowTitle();
		this.on("change:name", this.changeWindowTitle, this);
		this.on("change:happiness", this.handleHappinessChange, this);
		this.on("change:evil", this.handleEvilChange, this);
		this.get("playground").on("resize", this.wallsMove, this);

	},

	/*
	 * If we're totally new, this function gets called.
	 */
	firstInitialize: function() {
		this.set("birthday", Date.now());
		this.set("happiness", .5);
		this.set("tiredness", -1);
		this.set("surprise", 0.1);
		this.set("boredom", Fudo.randomRange(-1, 1));
		this.set("fear", -1);
		this.set("evil", 0);
		this.set("isNew", false);
		this.sync();
	},

	/*
	 * Some accessors.
	 */
	getters: {
		age: function() {
			return Date.now() - this.get("birthday");
		},
		centerX: function() {
			return ($(window).width() / 2);
		},
		centerY: function() {
			return ($(window).height() / 2) + 200;
		},
	},

	/*
	 * When happiness is changed...
	 */
	handleHappinessChange: function() {

		// What's the previous happiness?
		var previous = this.previous("happiness");

		// Quiet the music if I'm really sad.
		if (this.get("evil") < 1)
			this.get("playground").get("music").volume = (this.get("happiness") + 1) / 2;

	},

	/*
	 * When evil is changed...
	 */
	handleEvilChange: function() {

		// ENTER ＤＥＭＯＮ MODE
		if (this.get("evil") >= 1) {
			this.enterDemonMode();
		}

	},

	/*
	 * ＤＥＭＯＮﾠＭＯＤＥ
	 */
	enterDemonMode: function() {

		// SHUT IT ALL UP, SCREAM ＤＥＭＯＮ
		this.get("playground").get("music").volume = 0;
		this.get("playground").get("music").src = "sounds/bgm_evil.ogg";
		Fudo.playAudio("sounds/demon_spoken.ogg");

		// MOVE MOOD
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

		// GET OLD
		this.set("birthday", -666);

	},

	/*
	 * On every frame...
	 */
	onFrame: function() {

		var now = Date.now();

		// Should I be falling?
		if (this.get("coords")[1] < this.get("centerY")) {
			this.set("acceleration", [0, .01, 0]);
		} else {
			this.set("acceleration", [0, 0, 0]);
			this.set("velocity", [0, 0, 0]);
		}

		// Idle state.
		if (this.get("state") == "idle") {

			// Wobble!
			if (this.get("fear") < .5) {

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

			} else {
				this.set("angle", 0);
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
			if (Math.random() < .001) {
				this.hop((Math.random() * 2) + 1);
			}

			// Equalize mood.
			this.set("boredom", Fudo.approach(this.get("boredom"), 0, .001));
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
		this.set("coords", [
			$(window).width() / 2,
			($(window).height() / 2) + 200,
			0
		]);
	},

	/*
	 * Woah! The walls moved!
	 */
	wallsMove: function() {
		this.moveToCenter();
	},

	/*
	 * Hop!
	 */
	hop: function(amount) {
		if (this.get("coords")[1] >= this.get("centerY")) {
			this.set("velocity", [0, amount * -1, 0]);
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
		var saveString = JSON.stringify(toSave);

		// Local storage sync.
		Fudo.local.set("friend", saveString);
		console.log("Saved friend to local storage.");

		// Server sync.
		// TODO

	}, 1000),

});
