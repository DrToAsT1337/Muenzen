import path from 'path'

console.log('1. API-Route registriert')

let prisma: any = undefined

export default defineEventHandler(async (event) => {
 
  const prisma = await getPrisma()

  try {
    const alleSets = await prisma.euromuenzset.findMany()
    console.log('5. Daten erfolgreich ausgelesen!', alleSets)
    return alleSets
  } catch (error: any) {
    console.error('FEHLER:', error)
    return { fehler: String(error) }
  }
})
