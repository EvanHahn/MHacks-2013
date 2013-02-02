/*
 * Throw an error if an assertion is false.
 */
Fudo.assert = function(bool, errorMessage) {
	if (!bool)
		throw new Error(errorMessage);
};

/*
 * Simple noop.
 */
Fudo.noop = function() {};

/*
 * Local storage aliases.
 */

Fudo.local = {
	get: function(key) {
		return localStorage.getItem(key);
	},
	set: function(key, value) {
		return localStorage.setItem(key, value);
	},
};

/*
 * A better Image object.
 */

Fudo.Image = function(src) {
	var result = new Image;
	result.src = src;
	return result;
};
