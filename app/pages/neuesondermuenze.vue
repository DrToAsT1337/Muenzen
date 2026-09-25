
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

    <div style="max-width: 500px; margin: 40px auto; font-family: timesnewroman;">
        
        
        <h1>Neue Sondermünze eintragen</h1>

        <form @submit.prevent="muenzeSpeichern" style="display: flex; flex-direction: column; gap: 15px">
            
            //Label und Input-Feld für den Namen der Münze, der Name des Sets, der Nennwert in Cent und das Material der Münze. Die Werte werden mit v-model an die form-Variable gebunden, sodass sie beim Absenden des Formulars an die API gesendet werden können.
            <div>
                <label>Name der Münze</label><br>
                <input v-model="form.motiv" required type="text" style="width: 100%; padding: 5px">
            </div>

            <div>
                <label>Name des Sets</label><br>
                <input v-model="form.setname" required type="text" style="width: auto; padding: 5px">
                <small style="color: dimgrey;">Bleibt gespeichert</small>
            </div>

            <div>
                <label>Nennwert der Münze in Cent!</label>
                <input v-model="form.nennwertInCent" required type="number" style="width: 100%; padding: 5px">
                <small style="color: dimgrey;">Beispiel: 200 für 2 Euro</small>
            </div>

            <div>
                <label>Material</label><br>
                <select v-model="form.material" style="width: 100%; padding: 5px">
                    <option value="Silber">Silber</option>
                    <option value="Gold">Gold</option>
                    <option value="Kupfer">Kupfer</option>
                </select>
            </div>

            <div>
                <label>Reinheit in Prozent</label><br>
                <input v-model="form.reinheit" required type="number" style="width: 100%; padding: 5px">
                <small style="color: dimgrey;">Beispiel: 925 oder 999</small>
            </div>

            <div>
                <label>Gewicht in Gramm</label><br>
                <input v-model="form.gewichtInGramm" required type="number" style="width: 100%; padding: 5px">
                <small style="color: dimgrey;">Beispiel: 15 für 15 Gramm</small>
            </div>
            
            <div>
                <label>Jahrgang</label><br>
                <input v-model="form.jahrgang" required type="number" style="width: auto; padding: 5px">
            </div>

            <div>
                <label>Zertifikat</label><br>
                <input v-model="form.zertifikat" type="checkbox">
            </div>

            <div>
                <label>Schatulle</label><br>
                <input v-model="form.schatulle" type="checkbox">
            </div>

            <div>
                <label>Kapsel</label><br>
                <input v-model="form.kapsel" type="checkbox">    
            </div>

            <div>
                <label>Anzahl</label><br>
                <input v-model="form.anzahl" required type="number" style="width: 100%; padding: 8px">
            </div>

            <button type="submit" style="padding: 10px; background-color: #4CAF50; color: white; border: none; cursor: pointer;">Speichern</button>
            <p>{{ speichernStatus }}</p>
       
        </form>
    </div>
</template>