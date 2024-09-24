<script>
  import { onMount } from 'svelte';
  import Header from './lib/components/Header.svelte';
  import TaskInput from './lib/components/TaskInput.svelte';
  import TaskList from './lib/components/TaskList.svelte';
  import Sidebar from './lib/components/Sidebar.svelte';
  import { tasks, darkMode } from './lib/utils/stores.js';
  import { loadTasksFromStorage, saveTasksToStorage } from './lib/utils/storage.js';
  import { fade, fly } from 'svelte/transition';
  import { getRandomTip } from './lib/utils/tips.js';

  let currentView = 'daily';
  let showSidebar = false;
  let currentTip = getRandomTip();

  onMount(() => {
    loadTasksFromStorage();
    setInterval(() => {
      currentTip = getRandomTip();
    }, 10000); // Change tip every 10 seconds
  });

  $: {
    saveTasksToStorage($tasks);
  }

  function toggleSidebar() {
    showSidebar = !showSidebar;
  }
</script>

<main class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
  <div class="container mx-auto px-4 py-8">
    <Header {currentView} on:changeView={(e) => currentView = e.detail} />
    <div class="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg mb-8 shadow-md" in:fade={{ duration: 300 }}>
      <p class="text-blue-800 dark:text-blue-200 text-center">{currentTip}</p>
    </div>
    <div class="flex flex-col lg:flex-row gap-8">
      <button
        class="lg:hidden mb-4 p-2 bg-blue-500 text-white rounded-md"
        on:click={toggleSidebar}
      >
        {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
      </button>
      <aside
        class="lg:w-1/4 {showSidebar ? 'block' : 'hidden'} lg:block"
        in:fly={{ x: -50, duration: 300 }}
        out:fly={{ x: -50, duration: 300 }}
      >
        <Sidebar />
      </aside>
      <div class="flex-1" in:fly={{ x: 50, duration: 300 }} out:fly={{ x: 50, duration: 300 }}>
        <TaskInput />
        <TaskList {currentView} />
      </div>
    </div>
  </div>
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer base {
    body {
      @apply transition-colors duration-300;
    }
  }

  /* Custom scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    @apply bg-gray-200 dark:bg-gray-800;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-gray-400 dark:bg-gray-600 rounded-full;
  }

  ::-webkit-scrollbar-thumb:hover {
    @apply bg-gray-500 dark:bg-gray-500;
  }
</style>