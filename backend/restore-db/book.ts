import fs from 'fs'
import { prisma } from '../src/infra/database'
import path from 'path'

async function execute(filePath: string): Promise<void> {

    await prisma.testament.create({
        data: {
            id: 1,
            name: 'Antigo testamento'
        }
    })

    await prisma.testament.create({
        data: {
            id: 2,
            name: 'Novo testamento'
        }
    })

    try {
        const csvData = fs.readFileSync(filePath, 'utf-8')
        const lines = csvData.split('\n')
        for (const line of lines) {
            const [id, name, chapter, verses, words, testamentId] = line.split(',').map(value => value.trim())
            if (id && name && chapter && words && verses && testamentId) {
                await prisma.book.create({
                    data: {
                        id: Number(id),
                        chapter: Number(chapter),
                        words: Number(words),
                        verses: Number(verses),
                        testamentId: Number(testamentId),
                        name: name
                    }
                })
                console.log(`Query executed for ${name}`)
            } else {
                console.log(line)
            }
        }
        console.log('All queries executed.')
    } catch (error) {
        console.error(error)
    }
}

const levelPath = path.resolve('./restore-db/', 'book-data.csv')
execute(levelPath)


