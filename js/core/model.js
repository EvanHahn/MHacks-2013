Fudo.Model = Backbone.Model.extend({

	/*
	 * Constructor.
	 */
	initialize: function(attributes) {

		// We must be initialized with a playground.
		this.set("playground", attributes.playground);
		Fudo.assert(this.get("playground"), "Entity must have a playground.");
		this.get("playground").get("models").add(this);

		// Give me a dummy view.
		this.set("view", { render: Fudo.noop });

		// Set up some physics stuff.
		// These are per MILLISECOND.
		// Angles are in RADIANS.
		this.set({
			coords: [0, 0, 0],
			velocity: [0, 0, 0],
			acceleration: [0, 0, 0],
			angle: 0,
			angularVelocity: 0,
			angularAcceleration: 0,
		});

		// What was the last time I did some physics?
		this.set("lastPhysics", new Date);

	},

	/*
	 * Overridable methods.
	 */
	onFrame: Fudo.noop,
	fetch: Fudo.noop,
	sync: Fudo.noop,

	/*
	 * Do physics calculations.
	 */
	doPhysics: function() {

		// How much time has elapsed?
		var delta = (new Date) - this.get("lastPhysics");

		// Apply acceleration.
		this.set({
			angularVelocity: this.get("angularVelocity") + this.get("angularAcceleration") * delta,
			velocity: _(this.get("acceleration")).map(function(a, i) {
				return this.get("velocity")[i] + (a * delta);
			}, this),
		});

		// Apply velocity.
		this.set({
			angle: this.get("angle") + this.get("angularVelocity") * delta,
			coords: _(this.get("velocity")).map(function(v, i) {
				return this.get("coords")[i] + (v * delta);
			}, this),
		});

		// Physics complete!
		this.set("lastPhysics", new Date);

	},

	/*
	 * Remove me from the playground.
	 */
	remove: function() {
		this.get("playground").get("models").remove(this);
		this.get("view").layer.remove();
	},

});
