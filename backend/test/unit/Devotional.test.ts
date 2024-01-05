import { Book } from '@/domain/entities/Book'
import { Devotional } from '@/domain/entities/Devotional'

test('Deve uma devocional', async function () {
    const book = new Book(1, 'Meu livro', 5, 8, 90, 1)
    new Devotional(
        '12313424',
        book,
        'Assunto',
        'Aprendizado',
        'Aplicação',
        [1, 2, 3],
        '123345345',
        new Date(),
        new Date(),
        new Date()
    )
})
