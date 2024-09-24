<script>
  import { tasks } from '../utils/stores.js';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

  let newTask = { title: '', description: '', dueDate: '', priority: 'medium', category: 'personal' };
  let showForm = false;

  function addTask() {
    if (newTask.title.trim()) {
      tasks.update(currentTasks => [...currentTasks, { ...newTask, id: Date.now(), completed: false }]);
      newTask = { title: '', description: '', dueDate: '', priority: 'medium', category: 'personal' };
      showForm = false;
    }
  }
</script>

<div class="mb-6">
  {#if !showForm}
    <button
      on:click={() => showForm = true}
      class="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
    >
      <FontAwesomeIcon icon={faPlus} class="mr-2" />
      Add Task
    </button>
  {:else}
    <form on:submit|preventDefault={addTask} class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          bind:value={newTask.title}
          placeholder="Task title"
          class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="date"
          bind:value={newTask.dueDate}
          class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <select
          bind:value={newTask.priority}
          class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <select
          bind:value={newTask.category}
          class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="miscellaneous">Miscellaneous</option>
        </select>
      </div>
      <textarea
        bind:value={newTask.description}
        placeholder="Description"
        class="w-full mt-4 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        rows="3"
      ></textarea>
      <div class="flex justify-end mt-4">
        <button
          type="button"
          on:click={() => showForm = false}
          class="mr-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faTimes} class="mr-2" />
          Cancel
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faPlus} class="mr-2" />
          Add Task
        </button>
      </div>
    </form>
  {/if}
</div>