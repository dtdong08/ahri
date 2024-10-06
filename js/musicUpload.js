const backgroundMusic = document.getElementById('backgroundMusic');
const audioSource = document.getElementById('audioSource');
const musicUpload = document.getElementById('musicUpload');

function handleMusicUpload(event) {
	const file = event.target.files[0];
	
	if (file) {
		const fileURL = URL.createObjectURL(file);
		audioSource.src = fileURL;
		backgroundMusic.load();
		backgroundMusic.play()
			.then(() => {
				toastr.success(`Now playing ${file.name}`);
			})
			.catch((e) => {
				toastr.error(e)
			});
	}
}

musicUpload.addEventListener('change', handleMusicUpload);

document.addEventListener('keydown', (e) => {
    if (e.key === 'm' || e.key === 'M') {
        musicUpload.click(); // Trigger the hidden input div
    }
});
