<script>
  import { createEventDispatcher } from 'svelte';
  import { tasks } from '../utils/stores.js';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faTimes, faSave, faPlus } from '@fortawesome/free-solid-svg-icons';
  import { fade, fly } from 'svelte/transition';

  export let task;
  
  const dispatch = createEventDispatcher();

  let editedTask = { ...task, tags: [...(task.tags || [])] };
  let newTag = '';

  function saveTask() {
    tasks.update(currentTasks =>
      currentTasks.map(t => t.id === editedTask.id ? editedTask : t)
    );
    dispatch('close');
  }

  function addTag() {
    if (newTag.trim() && !editedTask.tags.includes(newTag.trim())) {
      editedTask.tags = [...editedTask.tags, newTag.trim()];
      newTag = '';
    }
  }

  function removeTag(tag) {
    editedTask.tags = editedTask.tags.filter(t => t !== tag);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" on:click|self={() => dispatch('close')}>
  <div class="relative p-5 border w-full max-w-md shadow-lg rounded-md bg-white dark:bg-gray-800" in:fly="{{ y: -50, duration: 300 }}" out:fade>
    <div class="mt-3">
      <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100 mb-4">Edit Task</h3>
      <div class="mt-2 space-y-4">
        <input
          type="text"
          bind:value={editedTask.title}
          class="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-lg focus:outline-none dark:bg-gray-700 dark:border-gray-600"
          placeholder="Task title"
        />
        <textarea
          bind:value={editedTask.description}
          class="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-lg focus:outline-none dark:bg-gray-700 dark:border-gray-600"
          placeholder="Description"
          rows="3"
        ></textarea>
        <input
          type="datetime-local"
          bind:value={editedTask.dueDate}
          class="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-lg focus:outline-none dark:bg-gray-700 dark:border-gray-600"
        />
        <select
          bind:value={editedTask.priority}
          class="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-lg focus:outline-none dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <select
          bind:value={editedTask.category}
          class="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-lg focus:outline-none dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="miscellaneous">Miscellaneous</option>
        </select>
        <div>
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</label>
          <div class="flex flex-wrap gap-2 mb-2">
            {#each editedTask.tags as tag}
              <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                {tag}
                <button on:click={() => removeTag(tag)} class="ml-1 text-blue-500 hover:text-blue-700">×</button>
              </span>
            {/each}
          </div>
          <div class="flex">
            <input
              type="text"
              bind:value={newTag}
              placeholder="Add a tag"
              class="flex-grow px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-lg focus:outline-none dark:bg-gray-700 dark:border-gray-600"
            />
            <button
              on:click={addTag}
              class="ml-2 px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>
      <div class="items-center flex justify-end mt-4">
        <button
          on:click={() => dispatch('close')}
          class="px-4 py-2 bg-gray-300 text-gray-700 text-base font-medium rounded-md mr-2 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <FontAwesomeIcon icon={faTimes} class="mr-2" />
          Cancel
        </button>
        <button
          on:click={saveTask}
          class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <FontAwesomeIcon icon={faSave} class="mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  </div>
</div>