import { Book } from '@/domain/entities/Book'
import { Memorization } from '@/domain/entities/Memorization'


test('Deve criar uma mememorização', async function () {
    const book = new Book(1, 'Meu livro', 5, 8, 90, 1)
    new Memorization(
        '1233254',
        book,
        [],
        '1234345',
        'Em andamento',
        1,
        new Date(),
        new Date(),
        false,
        null
    )
})