const tips = [
	"Break large tasks into smaller, manageable steps.",
	"Use the Pomodoro Technique: 25 minutes of focused work, followed by a 5-minute break.",
	"Prioritize your tasks using the Eisenhower Matrix: Urgent/Important, Not Urgent/Important, Urgent/Not Important, Not Urgent/Not Important.",
	"Start your day by completing a small, easy task to build momentum.",
	"Review your tasks at the end of each day and plan for tomorrow.",
	"Set specific, measurable, achievable, relevant, and time-bound (SMART) goals.",
	"Use the 2-minute rule: If a task takes less than 2 minutes, do it immediately.",
	"Create a dedicated workspace to minimize distractions.",
	"Take regular breaks to maintain focus and productivity.",
	"Use time-blocking to allocate specific time slots for different types of tasks.",
];

export function getRandomTip() {
	return tips[Math.floor(Math.random() * tips.length)];
}
