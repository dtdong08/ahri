function notify (type, messageText) {
	toastr.options = {
		closeButton: false,
		debug: false,
		newestOnTop: false,
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

	switch (type) {
		case "success":
			toastr.success(messageText);
			break;
		case "warning":
			toastr.warning(messageText);
			break;
		case "error":
			toastr.error(messageText);
			break;
		case "info":
			toastr.info(messageText);
			break;
		default:
			console.error("You called undefined type with notify().")
	}
}
