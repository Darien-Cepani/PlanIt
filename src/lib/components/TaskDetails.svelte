<script>
  import { createEventDispatcher } from 'svelte';
  import { tasks } from '../utils/stores.js';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';

  export let task;
  
  const dispatch = createEventDispatcher();

  let editedTask = { ...task };

  function saveTask() {
    tasks.update(currentTasks =>
      currentTasks.map(t => t.id === editedTask.id ? editedTask : t)
    );
    dispatch('close');
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" on:click|self={() => dispatch('close')}>
  <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
    <div class="mt-3 text-center">
      <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Edit Task</h3>
      <div class="mt-2 px-7 py-3">
        <input
          type="text"
          bind:value={editedTask.title}
          class="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-lg focus:outline-none dark:bg-gray-700 dark:border-gray-600"
          placeholder="Task title"
        />
        <textarea
          bind:value={editedTask.description}
          class="w-full px-3 py-2 mt-2 text-gray-700 dark:text-gray-300 border rounded-lg focus:outline-none dark:bg-gray-700 dark:border-gray-600"
          placeholder="Description"
          rows="3"
        ></textarea>
        <input
          type="date"
          bind:value={editedTask.dueDate}
          class="w-full px-3 py-2 mt-2 text-gray-700 dark:text-gray-300 border rounded-lg focus:outline-none dark:bg-gray-700 dark:border-gray-600"
        />
        <select
          bind:value={editedTask.priority}
          class="w-full px-3 py-2 mt-2 text-gray-700 dark:text-gray-300 border rounded-lg focus:outline-none dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <select
          bind:value={editedTask.category}
          class="w-full px-3 py-2 mt-2 text-gray-700 dark:text-gray-300 border rounded-lg focus:outline-none dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="miscellaneous">Miscellaneous</option>
        </select>
      </div>
      <div class="items-center px-4 py-3">
        <button
          on:click={saveTask}
          class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <FontAwesomeIcon icon={faSave} class="mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  </div>
</div>