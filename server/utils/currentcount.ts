

 let prisma: any = undefined

 export const getgesamtAnzahlSM = async () => {

    const prisma = await getPrisma()

    const anzahlSM = await prisma?.sondermuenze.aggregate({

        _sum: {
            anzahl: true
        }
    })

    return {
        echteAnzahlSM: anzahlSM?._sum.anzahl || 0
    }
 }
