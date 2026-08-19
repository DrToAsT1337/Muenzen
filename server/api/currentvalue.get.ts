
import path from 'path'

let prisma: any

export default defineCachedEventHandler(async (event) => {
    
    //Datenbankverbidnung sicherstellen
    if (!prisma) {
        const pkg = await import('@prisma/client')
        const { PrismaClient } = pkg.default || pkg
        const { PrismaLibSql } = await import('@prisma/adapter-libsql')
        const { createClient } = await import('@libsql/client')

        const  dbPath = path.join(process.cwd(), 'muenzen.db')
        const adapter = new PrismaLibSql({ url: `file:${dbPath}` })
        prisma = new PrismaClient({ adapter })

        if(!prisma) {
            throw new Error('Fehler beim Verbinden mit der Datenbank.')
        }   
    }

    try{
        // Fetch der aktuellen Preise von Silber und Gold von der API
        const apiAnswer = await $fetch('https://api.edelmetalle.de/public.json')

        if (!apiAnswer) {
            throw new Error('Fehler beim Abrufen der aktuellen Preise von Silber und Gold von der API.')
        }
        
        // Extrahieren der Preise für Silber und Gold aus der API-Antwort
        const silverPriceasounce = apiAnswer.silber_eur
        const goldPriceasounce = apiAnswer.gold_eur
        
        // Berechnung der Preise pro Gramm (1 Unze = 31,1035 Gramm)
        const silverPricepergram = silverPriceasounce / 31.1035
        const goldPricepergram = goldPriceasounce / 31.1035

       

        //Anzahl der Silbermünzen aus der Datenbank abrufen
        const silvercount = await prisma.Sondermuenze.findMany({
            where: {
                material: 'Silber'
            }
        })

        // let = 
        let totalSilverWeight = 0

        //Berechnung des Gesamtgewichts der Silbermünzen inklusive Reinheit
        for(const muenze of silvercount) {
            if(muenze.gewichtInGramm) {
                const reinheit = muenze.reinheit ? muenze.reinheit / 1000 : 0.999

                totalSilverWeight += muenze.gewichtInGramm * reinheit * muenze.anzahl 
            }
        }

        //Anzahl der Goldmünzen aus der Datenbank abrufen
        const goldcount = await prisma.Sondermuenze.findMany({
            where: {
                material: 'Gold'
            }
        })

        let totalGoldWeight = 0

        //Berechnung des Gesamtgewichts der Goldmünzen inklusive Reinheit
        for(const muenze of goldcount) {
            if(muenze.gewichtInGramm) {
                const reinheit = muenze.reinheit ? muenze.reinheit / 1000 : 0.999
                
                totalGoldWeight += muenze.gewichtInGramm * reinheit * muenze.anzahl
            }
        }
        

        // Berechnung des aktuellen Wertes der Silbermünzen
        const currentSilverValue = totalSilverWeight * silverPricepergram

        // Berechnung des aktuellen Wertes der Goldmünzen
        const currentGoldValue = totalGoldWeight * goldPricepergram

        // Berechnung des Gesamtwertes der Münzen
        const totalValue = currentSilverValue + currentGoldValue

        return {
            currentSilverValue,
            currentGoldValue,
            totalValue
        }
    } catch (error) {
        console.error('Fehler beim Abrufen der aktuellen Preise von Silber und Gold:', error)
        throw new Error('Fehler beim Abrufen der aktuellen Preise von Silber und Gold.')
        }
    }, {

        maxAge: 60 * 60 * 5000  //Cache für 5 Stunden
    })

