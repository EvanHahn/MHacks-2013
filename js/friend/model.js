Fudo.Friend = Fudo.Model.extend({

	/*
	 * List the properties that need syncing.
	 */
	TO_SYNC: [
		"isNew",
		"name",
		"species",
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
		if (this.get("isNew"))
			this.firstInitialize();

		// Build a view.
		this.set("view", new Fudo.FriendView({ model: this }));

		// Respond to things!
		this.changeWindowTitle();
		this.on("change:name", this.changeWindowTitle, this);
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
		this.set("boredom", -0.5);
		this.set("fear", -1);
		this.set("isNew", false);
	},

	/*
	 * Some accessors.
	 */
	mutators: {
		age: function() {
			return Date.now() - this.birthday;
		},
		centerX: function() {
			return ($(window).width() / 2);
		},
		centerY: function() {
			return ($(window).height() / 2) + 100;
		},
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
				if (this.get("boredom") > .5) {
					this.set("angle", Math.sin(now / 800) / 3);
				} else if (this.get("boredom") < -.5) {
					if (Math.floor(Date.now() / 100) % 10)
						this.hop(1);
				} else {
					this.set("angle", Math.sin(now / 500) / 25);
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
			($(window).height() / 2) + 100,
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
		toSave.updatedAt = new Date;
		var saveString = JSON.stringify(toSave);

		// Local storage sync.
		Fudo.local.set("friend", saveString);
		console.log("Saved friend to local storage.");

		// Server sync.
		// TODO

	}, 1000),

});
