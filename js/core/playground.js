Fudo.Playground = Backbone.Model.extend({

	/*
	 * Constructor.
	 */
	initialize: function() {

		// We have a collection of models.
		this.set("models", new Backbone.Collection);

		// Build the Kinetic stage.
		this.set("stage", new Kinetic.Stage({
			container: document.querySelector('.kinetic-container')
		}));

		// Change the background.
		$(document.body).css({
			background: "#000 url(sprites/background1.png) no-repeat center center",
		});

		// When we resize the window, resize the stage.
		this._handleResize();
		this._handleResize = _(this._handleResize).bind(this);
		$(window).on("resize", this._handleResize);

		// Start the game loop.
		this.frame = _(this.frame).bind(this);
		requestAnimationFrame(this.frame);

		// Add the music.
		var audio = Fudo.playAudio("sounds/bgm_1.ogg");
		audio.loop = true;
		this.set("music", audio);

	},

	/*
	 * This is the "game loop".
	 */
	frame: function() {

		// Do the every-frame stuff for each model inside.
		this.get("models").each(function(model) {
			if (model) {
				model.onFrame();
				model.doPhysics();
				model.get("view").render();
			} else {
				console.warn("Playground's models collection has a non-model: " + model);
			}
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
