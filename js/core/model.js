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
			x: 0,
			y: 0,
			velocityX: 0,
			velocityY: 0,
			accelerationX: 0,
			accelerationY: 0,
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
			velocityX: this.get("velocityX") + this.get("accelerationX") * delta,
			velocityY: this.get("velocityY") + this.get("accelerationY") * delta,
		});

		// Apply velocity.
		this.set({
			angle: this.get("angle") + this.get("angularVelocity") * delta,
			x: this.get("x") + this.get("velocityX") * delta,
			y: this.get("y") + this.get("velocityY") * delta,
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
