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
		this.updateBackground();
		setInterval(this.updateBackground, 5000);
		this.frame = _(this.frame).bind(this);
		requestAnimationFrame(this.frame);

	},

	/*
	 * Update the background.
	 */
	updateBackground: function() {

		// What is the min and max of the colors?
		var minColor = new RGBColor("#112");
		var maxColor = new RGBColor("#ffe");

		// What should our multiplier be?
		var now = moment();
		var noon = moment().seconds(0).minutes(0).hours(12);
		var timeDiff = Math.abs(now.diff(noon));
		var maxTimeDiff = Math.abs(noon.diff(moment().endOf("day")));
		var multiplier = 1 - (timeDiff / maxTimeDiff);

		// Calculate the background color
		var r = Math.floor(minColor.r + ((maxColor.r - minColor.r) * multiplier));
		var g = Math.floor(minColor.g + ((maxColor.g - minColor.g) * multiplier));
		var b = Math.floor(minColor.b + ((maxColor.b - minColor.b) * multiplier));

		// All done!
		document.body.style.background = "rgb("+r+","+g+","+b+")";

	},

	/*
	 * This is the "game loop".
	 */
	frame: function() {

		// Do the every-frame stuff for each model inside.
		this.get("models").each(function(model) {
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
