Fudo.Friend = Fudo.Model.extend({

	/*
	 * List the properties that need syncing.
	 */
	TO_SYNC: [
		"name",
		"username",
		"passwordHash",
		"species",
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
		this.set("coords", [200, 200, 0]);

		// Build a view.
		this.set("view", new Fudo.FriendView({ model: this }));

		// Respond to things!
		this.get("playground").on("resize", this.wallsMove, this);

	},

	/*
	 * Woah! The walls moved!
	 */
	wallsMove: function() {
		console.log("Woah! The walls moved!");
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
		var localJSON = Fudo.local.get(username + "-friend");
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

		// Local storage sync.
		var toSave = {};
		_(this.TO_SYNC).each(function(attribute) {
			toSave[attribute] = this.get(attribute);
		}, this);
		Fudo.local.set(username + "-friend");
		console.log("Saved friend to local storage.");

		// Server sync.
		// TODO

	}, 5000),

});