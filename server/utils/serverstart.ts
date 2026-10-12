
//Script zum Start der Datenbank-Verbindung

//Hilfswerkzeug um Dateipfad für Windows/Mac nutzbar zu machen
import path from 'path'

//type = (lies nur das Inhaltverzeichnis, aber nicht den Inhalt)
import type { PrismaClient } from '@prisma/client'

//globale leere Variable für die PrismaInstanz.(nur zur vorbereitung angelegt)
let prismaInstance: PrismaClient | null = null

//export = global aufrufbare Funktion
export const getPrisma = async () => {

    if(!prismaInstance) {

        //await import = lade den Inhalt des PrismaClients erst jetzt
        const pkg = await import('@prisma/client')

        //Client wird mit neuem, variablen Namen versehen
        //(pkg && ... ) = failsafe ob überhaupt etwas in drin ist(verhindert zugriff des servers auf leeres Hauptpaket)
        //(... && (pkg.default || pkg) = failsafe ob überhaupt etwas drin ist(verhindert zugriff des servers auf leeres innenpaket)
        const { PrismaClient: PrismaConstructor } = (pkg && (pkg.default || pkg)) as any

        //PrismaLibSql = Übersetzer zwischen Prisma und lokaler libsql/sqlite-Datei
        const { PrismaLibSql } = await import('@prisma/adapter-libsql')
        
        //Datenbankpfad wird aus dem "current working directory" aka "C:/Users/.../Muenzen" und 'muenzen.db' zusammengebaut
        const dbPath = path.join(process.cwd(), 'muenzen.db')

        //der Übersetzer(adapter) wird mit dem perfekten Pfad gefüllt
        const adapter = new PrismaLibSql({ url: `file:${dbPath}` })

        //prismaInstanz wird durch den Constructor mitsamt dem adapter aufgebaut
        prismaInstance = new PrismaConstructor({ adapter })
    }

    //fertige Instanz wird ausgegeben
    return prismaInstance
}