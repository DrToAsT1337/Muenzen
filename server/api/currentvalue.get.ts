

let prisma: any = undefined

const getAktuellePreise = defineCachedFunction(async () => {

    // Fetch der aktuellen Preise von Silber und Gold von der API
        //const apiAnswer = await $fetch('https://api.edelmetalle.de/public.json')

        //if (!apiAnswer) {
        //    throw new Error('Fehler beim Abrufen der aktuellen Preise von Silber und Gold von der API.')
        //}
        
    const apiAnswer = {
        "silber_eur": 25.50, // Beispielwert für Silberpreis in Euro pro Unze
        "gold_eur": 1800.00  // Beispielwert für Goldpreis in Euro pro Unze
    }
    
    return {

        silverPriceasounce: apiAnswer.silber_eur,
        goldPriceasounce: apiAnswer.gold_eur
    }
}, {
    maxAge: 5 * 60 * 60, //Abfrage alle 5 Stunden
    name: 'Edelmetallpreise'
})

export default defineEventHandler(async (event) => {

    try {
        
        // Dynamische Importierung der Prisma-Instanz
        const prisma = await getPrisma()

        const preise = await getAktuellePreise()
        
        // Berechnung der Preise pro Gramm (1 Unze = 31,1035 Gramm)
        const silverPricepergram = preise.silverPriceasounce / 31.1035
        const goldPricepergram = preise.goldPriceasounce / 31.1035

        //Anzahl der Silbermünzen aus der Datenbank abrufen
        const silvercount = await prisma.sondermuenze.findMany({
            where: {
                material: 'Silber'
            }
        })

        // let = inaktive Variable, die das Gesamtgewicht der Silbermünzen speichern soll
        let totalSilverWeight = 0

        //Berechnung des Gesamtgewichts der Silbermünzen inklusive Reinheit
        for(const muenze of silvercount) {
            if(muenze.gewichtInGramm && muenze.reinheit) {
                
                const reinheit = Number(muenze.reinheit)

                totalSilverWeight += (muenze.gewichtInGramm * (reinheit / 1000)) * muenze.anzahl 
            }
        }

        //Anzahl der Goldmünzen aus der Datenbank abrufen
        const goldcount = await prisma.sondermuenze.findMany({
            where: {
                material: 'Gold'
            }
        })

        let totalGoldWeight = 0

        //Berechnung des Gesamtgewichts der Goldmünzen inklusive Reinheit
        for(const muenze of goldcount) {
            if(muenze.gewichtInGramm && muenze.reinheit) {
                
                const reinheit = Number(muenze.reinheit)
                
                totalGoldWeight += (muenze.gewichtInGramm * (reinheit / 1000)) * muenze.anzahl
            }
        }
        

        // Berechnung des aktuellen Wertes der Silbermünzen
        const currentSilverValue = totalSilverWeight * silverPricepergram

        // Berechnung des aktuellen Wertes der Goldmünzen
        const currentGoldValue = totalGoldWeight * goldPricepergram

        // Berechnung des Gesamtwertes der Münzen
        const totalValue = currentSilverValue + currentGoldValue

        const muenzAnzahl = await getgesamtAnzahlSM()

        return {
            currentSilverValue,
            currentGoldValue,
            totalValue,
            currentCountSM: muenzAnzahl.echteAnzahlSM
        }
    } catch (error) {
        console.error('Fehler beim Abrufen der aktuellen Preise von Silber und Gold:', error)
        throw new Error('Fehler beim Abrufen der aktuellen Preise von Silber und Gold.')
        }
    })

