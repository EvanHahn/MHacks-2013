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