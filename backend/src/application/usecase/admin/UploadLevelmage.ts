import { BadRequestError } from '@/api/helpers/api-error'
import { ILevelRepository } from '@/application/repository/ILevelRepository'
import { MultipartFile } from '@fastify/multipart'
import { SaveFile } from '../user/SaveFile'
import { extname } from 'path'

export class UploadLevelImage {
    private readonly levelRepository: ILevelRepository
    private readonly saveFile: SaveFile
    constructor(levelRepository: ILevelRepository, saveFile: SaveFile) {
        this.levelRepository = levelRepository
        this.saveFile = saveFile
    }

    async execute(upload: MultipartFile, protocol: string, hostname: string): Promise<string> {
        const total = await this.levelRepository.count()
        const mimeTypeRegex = /^(image)\/[a-zA-Z]+/

        const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

        if (!isValidFileFormat) {
            throw new BadRequestError('Formato inválido')
        }

        const extension = extname(upload.filename)
        const name = `level-${total + 1}`
        const fileName = name.concat(extension)

        const folder = 'levels/'

        const fileUrl = await this.saveFile.execute(upload, fileName, protocol, hostname, folder)

        return fileUrl
    }
}       