
<script setup>

import { ref } from 'vue'

//Vorauswahl die schon beim Laden der Seite in den Boxen stehen
const form = ref({

    motiv: '',
    setname: '',
    material: 'Silber',
    jahrgang: 0,
    gewichtInGramm: 15,
    reinheit: '',
    zertifikat: true,
    schatulle: true,
    kapsel: true,
    anzahl: 1

})

const speichernStatus = ref('')

//Script zum speichern neuer Sondermünzen
const muenzeSpeichern = async () => {
    
    //Debug-Ausgabe
    console.log('Daten aus Frontend: ', form.value)

    speichernStatus.value = 'Speichern.'

    try {

        //Methode zum auslösen der POST-Funktion nachdem fetch die Verbindung zur Datenbank hergestellt hat 
        const antwort = await $fetch('/api/muenzen', 
            {
                method: 'POST',
                body: form.value
            }
        )

        console.log('Antwort vom Server: ', antwort)
        
        //Ist die POST-Funktion erfoglreich, leere die Motiv-Variable
        if(antwort.success) {

            speichernStatus.value = 'Speichern war erfolgreich!'

            form.value.motiv = ''


        }else{

            speichernStatus.value = 'Speichern war nicht erfolgreich!'
        }
    } catch(error){
        
        console.error('Frontend-Fehler: ', error)
        speichernStatus.value = 'Netzwerkprobleme'
    }
}
</script>

<template>
  <div style="max-width: 700px; margin: 20px auto; font-family: 'Times New Roman', serif;">
    <h1>Neue Sondermünze eintragen</h1>

    <!-- NEU: display: grid statt flex. auto-fit macht Spalten automatisch! -->
    <form @submit.prevent="muenzeSpeichern" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; align-items: end;">
      
      <div>
        <label>Name des Sets:</label><br>
        <input v-model="form.setname" required type="text" style="width: 100%; padding: 8px; box-sizing: border-box;">
      </div>

      <div>
        <label>Motiv der Münze:</label><br>
        <input v-model="form.motiv" required type="text" style="width: 100%; padding: 8px; box-sizing: border-box;">
      </div>

      <div>
        <label>Nennwert (in Cent):</label><br>
        <input v-model="form.nennwertInCent" required type="number" style="width: 100%; padding: 8px; box-sizing: border-box;">
      </div>

      <div>
        <label>Material:</label><br>
        <select v-model="form.material" style="width: 100%; padding: 8px; box-sizing: border-box;">
          <option>Silber</option>
          <option>Gold</option>
          <option>Kupfer-Nickel</option>
        </select>
      </div>

      <div>
        <label>Gewicht (in Gramm):</label><br>
        <input v-model="form.gewichtInGramm" required type="number" step="0.01" style="width: 100%; padding: 8px; box-sizing: border-box;">
      </div>

      <div>
        <label>Reinheit (z.B. 999):</label><br>
        <input v-model="form.reinheit" required type="text" style="width: 100%; padding: 8px; box-sizing: border-box;">
      </div>

     
      <div style="grid-column: 1 / -1; display: flex; justify-content: space-between; background: limegreen; padding: 10px; border-radius: 5px;">
        <label><input type="checkbox" v-model="form.zertifikat"> Zertifikat</label>
        <label><input type="checkbox" v-model="form.schatulle"> Schatulle</label>
        <label><input type="checkbox" v-model="form.kapsel"> Kapsel</label>
      </div>

      
      <button type="submit" style="grid-column: 1 / -1; padding: 10px; background: green; color: white; border: none; cursor: pointer;">
        Münze speichern
      </button>

      <NuxtLink to="/">➔ Startseite besuchen</NuxtLink>
      <NuxtLink to="/dashboard">➔ Statistiken besuchen</NuxtLink>

    </form>
  </div>
</template>