<template>
  <div class="flex flex-col h-svh">
    <nav class="flex h-12 bg-black">
    </nav>
    <main class="flex-grow grid grid-cols-4 bg-blue-500">
      <section class="bg-red-500 col-span-3 flex gap-4">
        <DayCard/>
        <DayCard/>
      </section>
      <section>2</section>
      <section class="col-span-3">3</section>
      <section>4</section>
    </main>
  </div>
</template>
