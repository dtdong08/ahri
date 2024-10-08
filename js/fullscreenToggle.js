let lastTouchTime = 0;

function toggleFullscreen() {
	if (!document.fullscreenElement) {
		if (document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen();
		} else if (document.documentElement.mozRequestFullScreen) {    // Firefox
			document.documentElement.mozRequestFullScreen();
		} else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
			document.documentElement.webkitRequestFullscreen();
		} else if (document.documentElement.msRequestFullscreen) {     // IE/Edge
			document.documentElement.msRequestFullscreen();
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {  // Firefox
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {     // IE/Edge
			document.msExitFullscreen();
		}
	}
}

document.addEventListener('dblclick', (e) => {
	e.preventDefault();
	toggleFullscreen();
});

document.addEventListener('keydown', (e) => {
	if (e.key === 'f' || e.key === 'F') {
		toggleFullscreen();
	}
});

// Event listener for double-tap on mobile
document.addEventListener('touchstart', (e) => {
	const currentTime = new Date().getTime();
	const timeSinceLastTouch = currentTime - lastTouchTime;

	if (timeSinceLastTouch < 300 && timeSinceLastTouch > 0) {
		e.preventDefault(); // Prevent zooming
		toggleFullscreen(); // Trigger fullscreen
	}

	lastTouchTime = currentTime;
}, { passive: false });
