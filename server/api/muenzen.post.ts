
import path from 'path'

let prisma: any = undefined

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    
    const prisma = await getPrisma()

    try{
        const neueSondermuenze = await prisma.Sondermuenze.create({
            data: {
                motiv: String(body.motiv),
                setname: String(body.setname),
                nennwertInCent: Number(body.nennwertInCent),
                material: String(body.material),
                reinheit: String(body.reinheit),
                gewichtInGramm: Number(body.gewichtInGramm),
                jahrgang: Number(body.jahrgang),
                zertifikat: Boolean(body.zertifikat),
                schatulle: Boolean(body.schatulle),
                kapsel: Boolean(body.kapsel),
                anzahl: Number(body.anzahl)
            }
        })
    
        return { success: true, data: neueSondermuenze } 

    } catch (error) {
        console.error('Fehler beim Erstellen der Sondermünze:', error)
        return { success: false, error: 'Fehler beim Erstellen der Sondermünze.' }
    }
})

