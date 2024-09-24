<script>
  import { tasks } from '../utils/stores.js';
  import TaskItem from './TaskItem.svelte';
  import { fly, fade } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { getDateRangeForView } from '../utils/dateUtils.js';

  export let currentView;

  $: dateRange = getDateRangeForView(currentView);
  $: filteredTasks = $tasks.filter(task => {
    if (!task.dueDate) return true; // Include tasks without due date
    const taskDate = new Date(task.dueDate);
    return taskDate >= dateRange.start && taskDate <= dateRange.end;
  });
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" in:fade={{ duration: 300 }}>
  {#each filteredTasks as task (task.id)}
    <div animate:flip={{ duration: 300 }}>
      <div in:fly="{{ y: 20, duration: 300, delay: 150 }}" out:fly="{{ y: -20, duration: 300 }}">
        <TaskItem {task} />
      </div>
    </div>
  {:else}
    <p class="col-span-full text-center text-gray-500 dark:text-gray-400" in:fade>No tasks found for this period.</p>
  {/each}
</div>