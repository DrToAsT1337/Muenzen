

<script setup>

const { data, error } = await useFetch('/api/currentvalue')

if(error){
    throw errorMessages="Daten konnten nicht geladen werden"
}

</script>

<template>

<div style="max-width: 500px; margin: 40px auto; font-family: 'Times New Roman', Times, serif; ">

    <h1>Statistiken zu den Münzen</h1>

    <label>Silberwert: {{ data.currentSilverValue }}</label><br><br>

    <label>Goldwert: {{ data.currentGoldValue }}</label><br><br>

    <label>Gesamtwert: {{ data.totalValue }}</label><br><br>

    <NuxtLink to="/">➔ Startseite besuchen</NuxtLink>



</div>
</template>