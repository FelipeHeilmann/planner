import { Book } from '@/domain/entities/Book'
import { Reading } from '@/domain/entities/Reading'

test('Deve uma leitura', async function () {
    const book = new Book(1, 'Meu livro', 5, 8, 90, 1)

    new Reading(
        '23454363653',
        [book],
        5,
        '345dghfhfhfh',
        new Date(),
        null,
        new Date(),
        new Date()
    )

})