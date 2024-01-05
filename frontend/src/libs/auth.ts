import { jwtVerify, SignJWT } from 'jose'

type TUserJWTPayload = {
    jti: string,
    iat: number
}

export const getJwtSecretKey = () => {
    const secret = process.env.JWT_SECRET
    if (!secret || secret.length === 0) {
        throw new Error('env variable secret key is not set')
    }
    return secret
}


export default async function verifyAuth(token: string) {
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()))
        return verified.payload as TUserJWTPayload
    } catch (err) {
        throw new Error('your token has expired: ' + err)
    }
}
