
import { User } from '@/domain/entities/User'

test('Deve criar um usuário e vincular um nível a ele', async function () {
    new User(
        '34243245345346',
        'Felipe',
        'felipe@felipe.com',
        'senha',
        1,
        new Date(),
        new Date(),
        0,
        0,
        1,
        true,
        false,
        undefined
    )
})
