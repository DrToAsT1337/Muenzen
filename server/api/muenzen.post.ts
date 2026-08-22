
import path from 'path'

let prisma: any

export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    if(!prisma) {

    //Datenbankverbidnung sicherstellen
        if (!prisma) {
            const pkg = await import('@prisma/client')
            const { PrismaClient } = pkg.default || pkg
            const { PrismaLibSql } = await import('@prisma/adapter-libsql')
            
    
            const  dbPath = path.join(process.cwd(), 'muenzen.db')
            const adapter = new PrismaLibSql({ url: `file:${dbPath}` })
            prisma = new PrismaClient({ adapter })
    
            if(!prisma) {
            throw new Error('Fehler beim Verbinden mit der Datenbank.')
            }   
        }
    }

    try{
        const neueSondermuenze = await prisma.Sondermuenze.create({
            data: {
                motiv: String(body.motiv),
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

