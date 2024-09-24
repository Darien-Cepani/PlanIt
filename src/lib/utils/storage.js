import { tasks } from "./stores.js";

export function loadTasksFromStorage() {
	const storedTasks = localStorage.getItem("tasks");
	if (storedTasks) {
		tasks.set(JSON.parse(storedTasks));
	}
}

export function saveTasksToStorage(tasksData) {
	localStorage.setItem("tasks", JSON.stringify(tasksData));
}
