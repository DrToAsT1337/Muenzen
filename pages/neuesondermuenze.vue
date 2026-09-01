
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

const speichernStatus = ('ref')

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

            form.value.motiv = '',


        }else{

            speichernStatus.value = 'Speichern war nicht erfolgreich!'
        }
    } catch(error){
        
        console.error('Frontend-Fehler: ', error)
        speichernStatus.value = 'Netzwerkprobleme'
    }
}
<script>