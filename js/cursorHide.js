let IDLE_TIME = localStorage.getItem('IDLE_TIME') ? parseFloat(localStorage.getItem('IDLE_TIME')) : 3000;
let timeout;

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

document.addEventListener('keydown', (e) => {
	if (e.key === 'd' || e.key === 'D') {
		setIdleTime();
	}
});

document.addEventListener('mousemove', showCursor);

timeout = setTimeout(hideCursor, IDLE_TIME);
