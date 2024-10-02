const video = document.getElementById('backgroundVideo');

function togglePlayPause() {
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
}

document.addEventListener('click', togglePlayPause);

document.addEventListener('keydown', (e) => {
	if (e.code === 'Space') {
		e.preventDefault();
		togglePlayPause();
	}
});
