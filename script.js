// Get DOM elements
const audioSource     = document.getElementById('audioSource');
const musicUpload     = document.getElementById('musicUpload');
const backgroundMusic = document.getElementById('backgroundMusic');

// For cursor hide function
let IDLE_TIME = localStorage.getItem('IDLE_TIME') ? parseFloat(localStorage.getItem('IDLE_TIME')) : 3000;
let timeout = setTimeout(hideCursor, IDLE_TIME);

// For volume adjust function
const VOLUME_STEP = 0.01; // 1%

// For fullscreen function
let lastTouchTime = 0;

// toastr configuration
toastr.options = {
	closeButton: false,
	debug: false,
	newestOnTop: true,
	progressBar: true,
	positionClass: "toast-top-right",
	preventDuplicates: false,
	onclick: null,
	showDuration: "300",
	hideDuration: "1000",
	timeOut: "5000",
	extendedTimeOut: "1000",
	showEasing: "swing",
	hideEasing: "linear",
	showMethod: "fadeIn",
	hideMethod: "fadeOut"
}

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

function hideCursor() {
	document.body.classList.add('hide-cursor');
}

function showCursor() {
	document.body.classList.remove('hide-cursor');
	clearTimeout(timeout);
	timeout = setTimeout(hideCursor, IDLE_TIME);
}

function setIdleTime() {
	const userInput = prompt('Enter the idle time in seconds:', IDLE_TIME / 1000);
	const newIdleTime = parseFloat(userInput);

	if (Number.isNaN(newIdleTime)) {
		toastr.error('Please enter a valid number');
	} else if (newIdleTime < 1) {
		toastr.error('Idle time must be at least 1 second');
	} else {
		IDLE_TIME = newIdleTime * 1000;
		localStorage.setItem('IDLE_TIME', IDLE_TIME);
		if (IDLE_TIME == 1) {
			toastr.success('Idle time set to 1 second');
		} else {
			toastr.success(`Idle time set to ${IDLE_TIME / 1000} seconds`);
		}
	}
}

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

function adjustVolume(change) {
	let newVolume = backgroundMusic.volume + change;
	newVolume = Math.max(0.0, Math.min(1.0, newVolume));
	backgroundMusic.volume = newVolume;
	toastr.info(`Volume: ${(newVolume * 100).toFixed(0)}%`);
}

function handleMusicUpload(event) {
	const file = event.target.files[0];
	
	if (file) {
		const fileURL = URL.createObjectURL(file);
		audioSource.src = fileURL;
		backgroundMusic.load();

		backgroundMusic.oncanplaythrough = () => {
			backgroundMusic.play();
			toastr.success(`Now playing ${file.name.replace('.mp3','')}`);
		};

		backgroundMusic.onerror = () => {
			toastr.error('Failed to load the audio file');
		};
	}
}

document.addEventListener('click', togglePlayPause);

document.addEventListener('mousemove', showCursor);

document.addEventListener('dblclick', (e) => {
	e.preventDefault();
	toggleFullscreen();
});

document.addEventListener('touchstart', (e) => {
	const currentTime = new Date().getTime();
	const timeSinceLastTouch = currentTime - lastTouchTime;

	if (timeSinceLastTouch < 300 && timeSinceLastTouch > 0) {
		e.preventDefault();
		toggleFullscreen();
	}

	lastTouchTime = currentTime;
}, { passive: false });

musicUpload.addEventListener('change', handleMusicUpload);

document.addEventListener('keydown', (e) => {
	if (e.code === 'Space') {
		e.preventDefault();
		togglePlayPause();
	} 
	else if (e.key === 'f' || e.key === 'F') toggleFullscreen();
	else if (e.key === 'm' || e.key === 'M') musicUpload.click();
  else if (e.key === 'd' || e.key === 'D') setIdleTime();
	else if (e.key === '<') adjustVolume(-VOLUME_STEP);
  else if (e.key === '>') adjustVolume(VOLUME_STEP);
});
