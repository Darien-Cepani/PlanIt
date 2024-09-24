<script>
  import { tasks } from '../utils/stores.js';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons/faLightbulb';

  function exportTasks() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify($tasks));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "tasks.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  function clearCompletedTasks() {
    tasks.update(currentTasks => currentTasks.filter(task => !task.completed));
  }

  const tips = [
    "Break large tasks into smaller, manageable steps.",
    "Use the Pomodoro Technique: 25 minutes of focused work, followed by a 5-minute break.",
    "Prioritize your tasks using the Eisenhower Matrix: Urgent/Important, Not Urgent/Important, Urgent/Not Important, Not Urgent/Not Important.",
    "Start your day by completing a small, easy task to build momentum.",
    "Review your tasks at the end of each day and plan for tomorrow."
  ];

  let currentTip = tips[Math.floor(Math.random() * tips.length)];
</script>

<footer class="mt-12 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
  <div class="flex flex-wrap justify-between items-center">
    <div class="flex space-x-4 mb-4 sm:mb-0">
      <button
        on:click={exportTasks}
        class="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
      >
        <FontAwesomeIcon icon={faDownload} class="mr-2" />
        Export Tasks
      </button>
      <button
        on:click={clearCompletedTasks}
        class="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
      >
        <FontAwesomeIcon icon={faTrash} class="mr-2" />
        Clear Completed
      </button>
    </div>
    <div class="flex items-center text-gray-600 dark:text-gray-300">
      <FontAwesomeIcon icon={faLightbulb} class="mr-2 text-yellow-400" />
      <p class="text-sm">{currentTip}</p>
    </div>
  </div>
</footer>