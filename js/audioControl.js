const audio = document.getElementById('backgroundMusic');

function togglePlayPause() {
	if (audio.paused) {
		audio.play();
	} else {
		audio.pause();
	}
}

document.addEventListener('click', togglePlayPause);

document.addEventListener('keydown', (e) => {
	if (e.code === 'Space') {
		e.preventDefault();
		togglePlayPause();
	}
});
