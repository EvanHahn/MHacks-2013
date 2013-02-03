Fudo.Playground = Backbone.Model.extend({

	/*
	 * Constructor.
	 */
	initialize: function() {

		// We have a collection of models.
		this.set("models", new Backbone.Collection);

		// Build the Kinetic stage.
		this.set("stage", new Kinetic.Stage({
			container: "body",
			width: 1, height: 1
		}));

		// When we resize the window, resize the stage.
		this._handleResize();
		this._handleResize = _(this._handleResize).bind(this);
		$(window).on("resize", this._handleResize);

		// Start the game loop.
		this.frame = _(this.frame).bind(this);
		requestAnimationFrame(this.frame);

	},

	/*
	 * This is the "game loop".
	 */
	frame: function() {

		// Do the every-frame stuff for each model inside.
		this.get("models").each(function(model) {
			model.onFrame();
			model.doPhysics();
			model.get("view").render();
		});

		// Go again!
		requestAnimationFrame(this.frame);

	},

	/*
	 * Deal with a resizing window.
	 */
	_handleResize: function() {
		this.get("stage").setWidth($(document.body).width());
		this.get("stage").setHeight($(document.body).height());
		this.trigger("resize");
	},

});
