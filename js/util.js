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
	remove: function(key) {
		return localStorage.removeItem(key);
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

/*
 * Random within a range.
 */

Fudo.randomRange = function(lower, upper) {
	return Math.random() * (upper - lower) + lower;
};

/*
 * Approach a value by a certain amount.
 */

Fudo.approach = function(start, finish, amount) {

	amount = Math.abs(amount);

	if (start < finish) {
		start += amount;
		if (start > finish)
			start = finish;
	} else {
		start -= amount;
		if (start < finish)
			start = finish;
	}

	return start;

};

/*
 * Center X and Y, but for the friend.
 */

Fudo.center = {
	x: function() {
		return $(window).width() / 2;
	},
	y: function() {
		return ($(window).height() / 2) + 200;
	},
};
