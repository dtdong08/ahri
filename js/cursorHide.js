// the cursor will disappear after being idle for {IDLE_TIME} ms
const IDLE_TIME = 3000;

let timeout;

function hideCursor() {
	document.body.classList.add('hide-cursor');
}

function showCursor() {
	document.body.classList.remove('hide-cursor');
	clearTimeout(timeout);
	timeout = setTimeout(hideCursor, IDLE_TIME);
}

document.addEventListener('mousemove', showCursor);

timeout = setTimeout(hideCursor, IDLE_TIME);
