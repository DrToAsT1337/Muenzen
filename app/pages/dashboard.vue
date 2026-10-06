

<script setup>

const { data, error } = await useFetch('/api/currentvalue', {
    cache: 'no-store',
    getCachedData: () => undefined
})
   
if(error.value) {
    console.error('Fehler beim Abrufen der Daten: ', error.value)
}

console.log('Daten aus der API: ', data.value)

const { data2, error2 } = await useFetch('/api/currentcount', {
    cache: 'no-store',
    getCachedData: () => undefined
})
if(error2.value) {
    console.error('Fehler beim Laden der Anzahl: ', error2.value)
}


</script>

<template>

<div style="max-width: 500px; margin: 40px auto; font-family: 'Times New Roman', Times, serif; ">

    <h1>Statistiken zu den Münzen</h1>

    <label>Silberwert: {{ data.currentSilverValue }}</label><br><br>

    <label>Goldwert: {{ data.currentGoldValue }}</label><br><br>

    <label>Gesamtwert: {{ data.totalValue }}</label><br><br>

    <label>Anzahl aller Münzen: {{ data2.currentCount }}</label><br><br>

    <NuxtLink to="/">➔ Startseite besuchen</NuxtLink>



</div>
</template>