import path from 'path'

console.log('1. API-Route registriert')

let prisma: any = undefined
console.log(prisma)

export default defineEventHandler(async (event) => {
    console.log(defineEventHandler)
  console.log('2. Jemand hat die Seite aufgerufen!')

  if (!prisma) {
    console.log('3. Lade alle Datenbank-Pakete jetzt erst dynamisch...')

    const pkg = await import('@prisma/client')
    const { PrismaClient } = (pkg && (pkg.default || pkg)) as any

    // Den "createClient" von libsql brauchen wir nicht mehr!
    const { PrismaLibSql } = await import('@prisma/adapter-libsql')

    console.log('4. Verbinde zur lokalen Datenbank...')
    const dbPath = path.join(process.cwd(), 'muenzen.db')

    // Wir übergeben dem Adapter direkt die Konfiguration
    const adapter = new PrismaLibSql({ url: `file:${dbPath}` })
    prisma = new PrismaClient({ adapter })
  }

  try {
    const alleSets = await prisma.euromuenzset.findMany()
    console.log('5. Daten erfolgreich ausgelesen!', alleSets)
    return alleSets
  } catch (error: any) {
    console.error('FEHLER:', error)
    return { fehler: String(error) }
  }
})
