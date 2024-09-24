<script>
  import { tasks } from '../utils/stores.js';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faTrash, faEdit, faCheck, faTags } from '@fortawesome/free-solid-svg-icons';
  import TaskEditModal from './TaskEditModal.svelte';
  import { getDateColor, adjustPriority } from '../utils/dateUtils.js';
  import { fade, slide } from 'svelte/transition';

  export let task;

  let showEditModal = false;
  let showTags = false;

  $: adjustedTask = adjustPriority(task);

  function toggleComplete() {
    tasks.update(currentTasks =>
      currentTasks.map(t =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  function deleteTask() {
    tasks.update(currentTasks => currentTasks.filter(t => t.id !== task.id));
  }

  function getPriorityColor(priority) {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  }

  function toggleTags() {
    showTags = !showTags;
  }
</script>

<div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col justify-between transition-all duration-300 hover:shadow-lg {task.completed ? 'opacity-50' : ''}" style="height: 100%;">
  <div>
    <div class="flex items-center justify-between mb-2">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 {task.completed ? 'line-through' : ''}">{task.title}</h3>
      <input
        type="checkbox"
        checked={task.completed}
        on:change={toggleComplete}
        class="h-5 w-5 text-blue-600"
      />
    </div>
    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">{task.description.length > 50 ? task.description.slice(0, 50) + '...' : task.description}</p>
    <div class="flex items-center mb-2">
      <span class={`${getPriorityColor(adjustedTask.priority)} text-white text-xs px-2 py-1 rounded-full mr-2`}>
        {adjustedTask.priority}
      </span>
      <span class="text-sm text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
        {task.category}
      </span>
    </div>
    {#if task.dueDate}
      <p class="text-sm {getDateColor(task.dueDate)} mb-2">
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </p>
    {:else}
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">No due date</p>
    {/if}
    <button
      on:click={toggleTags}
      class="text-sm text-blue-500 hover:text-blue-700 transition-colors duration-300 mb-2"
    >
      <FontAwesomeIcon icon={faTags} class="mr-1" />
      {showTags ? 'Hide Tags' : 'View Tags'}
    </button>
    {#if showTags}
      <div transition:slide class="mb-2">
        {#each task.tags || [] as tag}
          <span class="inline-block bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full mr-1 mb-1">
            {tag}
          </span>
        {/each}
      </div>
    {/if}
  </div>
  <div class="flex justify-end space-x-2 mt-2">
    <button
      on:click={deleteTask}
      class="text-red-500 hover:text-red-700 transition-colors duration-300 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900"
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
    <button
      on:click={() => showEditModal = true}
      class="text-blue-500 hover:text-blue-700 transition-colors duration-300 p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900"
    >
      <FontAwesomeIcon icon={faEdit} />
    </button>
  </div>
</div>

{#if showEditModal}
  <TaskEditModal task={task} on:close={() => showEditModal = false} />
{/if}