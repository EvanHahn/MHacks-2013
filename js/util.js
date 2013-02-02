/*
 * Throw an error if an assertion is false.
 */
Tama.assert = function(bool, errorMessage) {
	if (!bool)
		throw new Error(errorMessage);
};

/*
 * Simple noop.
 */
Tama.noop = function() {};

/*
 * Local storage aliases.
 */

Tama.local = {
	get: function(key) {
		return localStorage.getItem(key);
	},
	set: function(key, value) {
		return localStorage.setItem(key, value);
	},
};
