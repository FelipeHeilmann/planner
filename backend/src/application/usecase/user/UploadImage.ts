import { randomUUID } from 'crypto'
import { MultipartFile } from '@fastify/multipart'
import { BadRequestError } from '../../../api/helpers/api-error'
import { extname } from 'path'
import { IUserRepository } from '@/application/repository/IUserRepository'
import { SaveFile } from './SaveFile'


export class UploadImage {
    private readonly userRepository: IUserRepository
    private readonly saveFile: SaveFile
    constructor(userRepository: IUserRepository, saveFile: SaveFile) {
        this.userRepository = userRepository
        this.saveFile = saveFile
    }

    async execute(upload: MultipartFile, protocol: string, hostname: string, userId: string): Promise<void> {
        const mimeTypeRegex = /^(image)\/[a-zA-Z]+/
        const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

        if (!isValidFileFormat) {
            throw new BadRequestError('Formato inválido')
        }

        const fileId = randomUUID()
        const extension = extname(upload.filename)
        const fileName = fileId.concat(extension)

        const path = 'users/'

        const fileUrl = await this.saveFile.execute(upload, fileName, protocol, hostname, path)

        const user = await this.userRepository.getById(userId)

        user.setImageUrl(fileUrl)

        await this.userRepository.update(user)
    }
}