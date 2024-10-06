const VOLUME_STEP = 0.01; // 1%

function adjustVolume(change) {
	let newVolume = backgroundMusic.volume + change;

	newVolume = Math.max(0.0, Math.min(1.0, newVolume));

	backgroundMusic.volume = newVolume;

	toastr.info(`Volume: ${(newVolume * 100).toFixed(0)}%`);
}

document.addEventListener('keydown', (e) => {
	if (e.key === '<') {
    adjustVolume(-VOLUME_STEP);
  } else if (e.key === '>') {
    adjustVolume(VOLUME_STEP);
  }
});
