<script setup>
// Hier rufen wir unsere neue API-Route ab
const { data: meineMuenzen } = await useFetch('/api/euroset')
</script>

<template>
  <div>
    <h1>Willkommen im Münz-Archiv! 🪙</h1>

    <NuxtPage />
    
    <!-- Das "pre" Tag zeigt die Rohdaten schön formatiert an -->
    <pre>{{ meineMuenzen }}</pre>
  </div>
</template>