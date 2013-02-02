Fudo._audios = [];

Fudo.playAudio = function(src) {

	// If there are a certain number of streams already playing the sound, we're done.
	var sameAudios = _(Fudo._audios).filter(function(audio) {
		return (!audio.paused) && (audio.src.indexOf(src) != -1);
	});
	if (sameAudios.length >= 2) {
		return sameAudios[0];
	}

	// Find an available audio stream, if there is one.
	var stream = _(Fudo._audios).where({ paused: true })[0];

	// No available stream? Add one.
	if (!stream) {
		stream = new Audio;
		Fudo._audios.push(stream);
		console.log("Adding audio stream " + Fudo._audios.length);
	}

	// Play it!
	stream.src = src;
	stream.play();

	// Return the stream.
	return stream;

};
