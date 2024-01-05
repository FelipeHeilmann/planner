import { createWriteStream } from 'fs'
import { MultipartFile } from '@fastify/multipart'
import { resolve } from 'path'
import { promisify } from 'node:util'
import { pipeline } from 'node:stream'

const pump = promisify(pipeline)

export class SaveFile {
    async execute(upload: MultipartFile, fileName: string, protocol: string, hostname: string, path: string): Promise<string> {
        const resourcesPath = resolve('./resources/', path)
        const writeStream = createWriteStream(resolve(resourcesPath, fileName))

        await pump(upload.file, writeStream)

        const fullUrl = protocol.concat('://').concat(hostname)
        const fileUrl = new URL(`/resources/${path}${fileName}`, fullUrl).toString()

        return fileUrl
    }

}