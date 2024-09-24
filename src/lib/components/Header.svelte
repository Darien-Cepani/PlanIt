<script>
  import { createEventDispatcher } from 'svelte';
  import { darkMode } from '../utils/stores.js';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons/faSun';
import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon';

  export let currentView;
  const dispatch = createEventDispatcher();

  function toggleDarkMode() {
    darkMode.update(mode => !mode);
    document.documentElement.classList.toggle('dark');
  }
</script>

<header>
  <div class="flex justify-between items-center">
    <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100">My Daily Planner</h1>
    <button on:click={toggleDarkMode} class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
      <FontAwesomeIcon icon={$darkMode ? faSun : faMoon} class="text-gray-600 dark:text-gray-300" />
    </button>
  </div>
  <nav class="mt-4">
    <ul class="flex space-x-4">
      {#each ['daily', 'weekly', 'monthly', 'yearly', 'all'] as view}
        <li>
          <button
            class="px-4 py-2 rounded-lg transition-colors duration-300 {currentView === view ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}"
            on:click={() => dispatch('changeView', view)}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </button>
        </li>
      {/each}
    </ul>
  </nav>
</header>