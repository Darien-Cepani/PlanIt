export function requestNotificationPermission() {
	if (!("Notification" in window)) {
		console.log("This browser does not support desktop notification");
	} else {
		Notification.requestPermission();
	}
}

export function sendNotification(title, options = {}) {
	if (Notification.permission === "granted") {
		new Notification(title, options);
	}
}
