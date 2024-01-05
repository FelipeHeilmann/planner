import { ReadingPlan } from '@/domain/entities/ReadingPlan'

test('Deve criar um plano de leitura', async function () {
    new ReadingPlan(
        '123234234',
        'Meu plano',
        'book',
        'Genêsis',
        'Em andamento',
        '14234234',
        3,
        new Date(),
        new Date(),
        new Date(),
        1
    )
})