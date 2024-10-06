const audio = document.getElementById('backgroundMusic');

function togglePlayPause() {
	if (!audioSource.src) {
		toastr.warning('No audio file loaded. Please upload one');
		return;
	}

	if (backgroundMusic.readyState >= 2) {
		if (backgroundMusic.paused) {
			backgroundMusic.play();
			toastr.success('Music is now playing')
		} else {
			backgroundMusic.pause();
			toastr.success('Music is paused')
		}
	} else {
		toastr.error('Audio is not ready for playback yet');
	}
}

document.addEventListener('click', togglePlayPause);

document.addEventListener('keydown', (e) => {
	if (e.code === 'Space') {
		e.preventDefault();
		togglePlayPause();
	}
});
