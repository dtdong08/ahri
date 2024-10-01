function resizeVideo() {
	const bgVideo = document.getElementById('backgroundVideo');

	const videoWidth  = bgVideo.videoWidth  || 1920;
	const videoHeight = bgVideo.videoHeight || 1080;

	const screenHeight = window.innerHeight;
	const screenWidth  = window.innerWidth;
	
	const videoRatio  = videoHeight  / videoWidth;
	const screenRatio = screenHeight / screenWidth;

	if (screenRatio < videoRatio) {
		bgVideo.style.width = '100vw';
		bgVideo.style.height = 'auto';
	} else {
		bgVideo.style.width = 'auto';
		bgVideo.style.height = '100vh';
	}
}

window.addEventListener('load', resizeVideo);
window.addEventListener('resize', resizeVideo);
