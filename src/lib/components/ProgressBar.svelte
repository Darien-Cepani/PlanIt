<script>
  export let percentage = 0;
  export let color = 'blue-500';
</script>

<div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
  <div
    class="bg-{color} h-2.5 rounded-full transition-all duration-500 ease-out"
    style="width: {percentage}%"
  ></div>
</div>