import App from "./App.svelte";
import { requestNotificationPermission } from "./lib/utils/notifications.js";
import "./app.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faPlus,
	faTrash,
	faEdit,
	faCheck,
	faDownload,
	faLightbulb,
	faChartBar,
	faFilter,
	faTimes,
	faSave,
	faSun,
	faMoon,
} from "@fortawesome/free-solid-svg-icons";

// Add icons to the library
library.add(
	faPlus,
	faTrash,
	faEdit,
	faCheck,
	faDownload,
	faLightbulb,
	faChartBar,
	faFilter,
	faTimes,
	faSave,
	faSun,
	faMoon
);

const app = new App({
	target: document.body,
});

requestNotificationPermission();

export default app;
