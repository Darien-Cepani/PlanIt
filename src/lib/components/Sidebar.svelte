<script>
  import { tasks, darkMode } from '../utils/stores.js';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faChartBar, faFilter, faChevronDown, faChevronUp, faTags } from '@fortawesome/free-solid-svg-icons';
  import ProgressBar from './ProgressBar.svelte';
  import { slide } from 'svelte/transition';
  import { getDateColor } from '../utils/dateUtils.js';

  let selectedCategory = 'all';
  let selectedPriority = 'all';
  let dateFrom = '';
  let dateTo = '';
  let showAdvancedOptions = false;
  let selectedTags = [];

  $: allTags = [...new Set($tasks.flatMap(task => task.tags || []))];

  $: filteredTasks = $tasks.filter(task => 
    (selectedCategory === 'all' || task.category === selectedCategory) &&
    (selectedPriority === 'all' || task.priority === selectedPriority) &&
    (!dateFrom || new Date(task.dueDate) >= new Date(dateFrom)) &&
    (!dateTo || new Date(task.dueDate) <= new Date(dateTo)) &&
    (selectedTags.length === 0 || selectedTags.every(tag => task.tags && task.tags.includes(tag)))
  );

  $: completionRate = filteredTasks.length > 0
    ? (filteredTasks.filter(t => t.completed).length / filteredTasks.length * 100).toFixed(0)
    : 0;

  $: tasksToday = $tasks.filter(task => {
    const today = new Date();
    const taskDate = new Date(task.dueDate);
    return taskDate.toDateString() === today.toDateString();
  });

  $: tasksTodayCompletionRate = tasksToday.length > 0
    ? (tasksToday.filter(t => t.completed).length / tasksToday.length * 100).toFixed(0)
    : 0;

  function toggleAdvancedOptions() {
    showAdvancedOptions = !showAdvancedOptions;
  }

  function toggleTag(tag) {
    selectedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
  }
</script>

<aside class="w-full md:w-64 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
  <div class="mb-8">
    <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Task Statistics</h3>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 shadow-md transition-all duration-300 hover:shadow-lg">
        <h4 class="text-lg font-semibold text-blue-800 dark:text-blue-200">Total Tasks</h4>
        <p class="text-3xl font-bold text-blue-600 dark:text-blue-300">{$tasks.length}</p>
      </div>
      <div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 shadow-md transition-all duration-300 hover:shadow-lg">
        <h4 class="text-lg font-semibold text-green-800 dark:text-green-200">Completed</h4>
        <p class="text-3xl font-bold text-green-600 dark:text-green-300">{$tasks.filter(t => t.completed).length}</p>
      </div>
      <div class="bg-yellow-100 dark:bg-yellow-900 rounded-lg p-4 shadow-md transition-all duration-300 hover:shadow-lg">
        <h4 class="text-lg font-semibold text-yellow-800 dark:text-yellow-200">Pending</h4>
        <p class="text-3xl font-bold text-yellow-600 dark:text-yellow-300">{$tasks.filter(t => !t.completed).length}</p>
      </div>
      <div class="bg-red-100 dark:bg-red-900 rounded-lg p-4 shadow-md transition-all duration-300 hover:shadow-lg">
        <h4 class="text-lg font-semibold text-red-800 dark:text-red-200">Due Today</h4>
        <p class="text-3xl font-bold text-red-600 dark:text-red-300">{tasksToday.length}</p>
      </div>
    </div>
  </div>

  <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Filters</h2>
  
  <div class="mb-4">
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" for="category">
      Category
    </label>
    <select
      id="category"
      bind:value={selectedCategory}
      class="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200"
    >
      <option value="all">All Categories</option>
      <option value="personal">Personal</option>
      <option value="work">Work</option>
      <option value="miscellaneous">Miscellaneous</option>
    </select>
  </div>

  <div class="mb-4">
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" for="priority">
      Priority
    </label>
    <select
      id="priority"
      bind:value={selectedPriority}
      class="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200"
    >
      <option value="all">All Priorities</option>
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>
  </div>

  <button
    on:click={toggleAdvancedOptions}
    class="w-full flex justify-between items-center p-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
  >
    Advanced Options
    <FontAwesomeIcon icon={showAdvancedOptions ? faChevronUp : faChevronDown} />
  </button>

  {#if showAdvancedOptions}
    <div class="mt-4 space-y-4" transition:slide>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" for="dateFrom">
          From Date
        </label>
        <input
          type="datetime-local"
          id="dateFrom"
          bind:value={dateFrom}
          class="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" for="dateTo">
          To Date
        </label>
        <input
          type="datetime-local"
          id="dateTo"
          bind:value={dateTo}
          class="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200"
        />
      </div>
      <div>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tags
        </label>
        <div class="flex flex-wrap gap-2">
          {#each allTags as tag}
            <button
              on:click={() => toggleTag(tag)}
              class="px-2 py-1 rounded-full text-sm {selectedTags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200'} hover:opacity-80 transition-opacity duration-300"
            >
              {tag}
            </button>
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <div class="mt-8">
    <h3 class="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Task Completion</h3>
    <div class="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md">
      <div class="flex items-center justify-between mb-2">
        <FontAwesomeIcon icon={faChartBar} class="text-blue-500" />
        <span class="text-2xl font-bold text-gray-800 dark:text-gray-200">{completionRate}%</span>
      </div>
      <ProgressBar percentage={completionRate} color={$darkMode ? 'blue-400' : 'blue-500'} />
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Overall completion rate</p>
    </div>
  </div>

  <div class="mt-4">
    <h3 class="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Today's Progress</h3>
    <div class="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md">
      <div class="flex items-center justify-between mb-2">
        <FontAwesomeIcon icon={faChartBar} class="text-green-500" />
        <span class="text-2xl font-bold text-gray-800 dark:text-gray-200">{tasksTodayCompletionRate}%</span>
      </div>
      <ProgressBar percentage={tasksTodayCompletionRate} color={$darkMode ? 'green-400' : 'green-500'} />
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Today's completion rate</p>
    </div>
  </div>
</aside>