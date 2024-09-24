import {
	addDays,
	startOfWeek,
	endOfWeek,
	startOfMonth,
	endOfMonth,
	isWithinInterval,
	differenceInDays,
} from "date-fns";

export function getDateRangeForView(view, date = new Date()) {
	switch (view) {
		case "daily":
			return { start: date, end: date };
		case "weekly":
			return { start: startOfWeek(date), end: endOfWeek(date) };
		case "monthly":
			return { start: startOfMonth(date), end: endOfMonth(date) };
		default:
			return { start: date, end: date };
	}
}

export function getDateColor(dueDate) {
	if (!dueDate) return "text-gray-500 dark:text-gray-400";

	const today = new Date();
	const due = new Date(dueDate);
	const daysUntilDue = differenceInDays(due, today);

	if (daysUntilDue <= 2) return "text-red-500";
	if (daysUntilDue <= 14) return "text-orange-500";
	return "text-green-500";
}

export function adjustPriority(task) {
	if (!task.dueDate) return task;

	const today = new Date();
	const dueDate = new Date(task.dueDate);
	const daysUntilDue = differenceInDays(dueDate, today);

	let adjustedPriority = task.priority;

	if (daysUntilDue <= 2 && task.priority !== "high") {
		adjustedPriority = "high";
	} else if (daysUntilDue <= 7 && task.priority === "low") {
		adjustedPriority = "medium";
	}

	return { ...task, priority: adjustedPriority };
}
