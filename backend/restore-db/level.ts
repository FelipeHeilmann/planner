import fs from 'fs'
import { prisma } from '../src/infra/database'
import path from 'path'

async function execute(filePath: string): Promise<void> {
    try {
        const csvData = fs.readFileSync(filePath, 'utf-8')
        const lines = csvData.split('\n')
        for (const line of lines) {
            const [id, description, minPoints, path, name] = line.split(';').map(value => value.trim())
            if (id && name && description && minPoints && path) {
                await prisma.level.create({
                    data: {
                        id: Number(id),
                        description: description,
                        minPoints: Number(minPoints),
                        imageUrl: path,
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

const levelPath = path.resolve('./restore-db/', 'level-data.csv')
execute(levelPath)


