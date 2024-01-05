import { Prayer } from '@/domain/entities/Prayer'

test('Deve criar uma oração, adicionar duas datas de oração e modificar o status dela para finalizadae ', async function () {
    new Prayer(
        '1232342',
        'Título',
        'Minha descrição',
        'Meu pedido',
        [],
        new Date(),
        '12323424245',
        'Em andamento',
        new Date(),
        new Date(),
        false
    )
})
