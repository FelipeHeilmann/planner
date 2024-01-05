
const devotionalsData = [
    { id: '1234234234gfdgdffg', verses: [1, 2, 3, 4, 5, 6, 7], book: { id: 1, name: 'Gênesis', chapter: 1, verses: 40, words: 2340, testamentId: 1 }, subject: 'Meu tema', learned: 'aprendizado', application: 'minha aplicação', date: '20/08/2023' },
    { id: '8634287769gfsdasda', verses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], book: { id: 1, name: 'Gênesis', chapter: 2, verses: 45, words: 2756750, testamentId: 1 }, subject: 'Meu outri tema', learned: 'aprendizado', application: 'minha aplicação', date: '20/05/2023' },
    { id: '8978742342gfdgdffg', verses: [1, 2, 3, 4], book: { id: 2, name: 'Êxodo', chapter: 1, verses: 40, words: 2340, testamentId: 1 }, subject: 'Mais um tema tema', learned: 'aprendizado', application: 'minha aplicação', date: '20/02/2023' },
]

const praysData = [
    { id: '2154646464gsdfs', title: 'Minha oração', description: 'oração para codigo funcionar', request: 'Intercessão', date: '30/10/2023', timesPrayed: ['28/10/23'], status: 'Finalizado' },
    { id: '42334564564dfsf', title: 'Minha outra oração', description: 'oração para não dar erro ', request: 'Pedido', date: '30/10/2023', timesPrayed: [], status: 'Em andamento' },
    { id: '21354353535sdfs', title: 'Minha oração', description: 'Virar dev', request: 'Arrependimento', date: '30/10/2023', timesPrayed: ['28/10/23', '19/10/2023'], status: 'Em andamento' },
    { id: '13123434256gfdg', title: 'Minha oração', description: 'Ser dev backend ', request: 'Gratidão', date: '30/10/2023', timesPrayed: ['28/05/23', '30/06/2023', '30/07/2023'], status: 'Em andamento' },
]

const plansData = [
    { id: '12321dsad', title: 'Meu titulo', status: 'Não iniciado', book: 'Gênesis', date: '20/10/2023', planOf: 'book', testamentId: null },
    { id: '1dasdsa1dsad', title: 'Meu titulo outro', status: 'Em andamento', book: 'Mateus', date: '20/10/2023', planOf: 'book', testamentId: null },
    { id: '1gfdgdfgdsad', title: 'Novo testamento', status: 'Finalizado', book: null, date: '20/10/2023', planOf: 'testament', testamentId: 1 },
    { id: '1hfhgfh1dsad', title: 'Mais um titulo', status: 'Não iniciado', book: 'Apocalipse', date: '20/10/2023', planOf: 'book', testamentId: null },
]

const memorizationData = [
    { id: '5478353fsdas', book: { id: 1, name: 'Gênesis', chapter: 1, verses: 40, words: 2340, testamentId: 1 }, verse: 1, description: 'Alguma descrição para p meu versículo.', timesMemorizated: ['03/11/2023', '02/11/2023', '01/11/2023'], status: 'Finalizado' },
    { id: '5675867sdfgf', book: { id: 1, name: 'Salmo', chapter: 23, verses: 40, words: 2340, testamentId: 1 }, verse: 1, description: 'O senhor é meu pastor e nada me faltará.', timesMemorizated: ['10/10/2023', '8/10/2023', '7/10/2023'], status: 'Finalizado' },
    { id: '9767889bdkjg', book: { id: 1, name: 'João', chapter: 1, verses: 40, words: 2340, testamentId: 1 }, verse: 1, description: 'Descrição do meu versículo.', timesMemorizated: ['03/11/2023'], status: 'Em andamento' },
    { id: '68908435dasd', book: { id: 1, name: 'Mateus', chapter: 1, verses: 40, words: 2340, testamentId: 2 }, verse: 1, description: 'Outra descrioção do meu versículo', timesMemorizated: [], status: 'Em andamento' },
]

const readingData = [
    { id: '234423424242', books: [{ id: 1, name: 'Gênesis', chapter: 1, verses: 40, words: 2340, testamentId: 1 }, { id: 2, name: 'Gênesis', chapter: 1, verses: 40, words: 2340, testamentId: 1 }, { id: 3, name: 'Gênesis', chapter: 1, verses: 40, words: 2340, testamentId: 1 }], planTitle: 'Gênesis', timeSpent: 30, date: '20/10/2023' },
    { id: 'dsadasdsafgd', books: [{ id: 51, name: 'Êxodo', chapter: 1, verses: 40, words: 2340, testamentId: 1 }, { id: 52, name: 'Êxodo', chapter: 2, verses: 40, words: 2340, testamentId: 1 }, { id: 53, name: 'Êxodo', chapter: 3, verses: 40, words: 2340, testamentId: 1 }, { id: 54, name: 'Êxodo', chapter: 4, verses: 40, words: 2340, testamentId: 1 }], planTitle: 'Anual', timeSpent: 40, date: '20/9/2023' },
    { id: '67345345hgff', books: [{ id: 92, name: 'Levítico ', chapter: 1, verses: 40, words: 2340, testamentId: 1 }, { id: 93, name: 'Levítico ', chapter: 2, verses: 40, words: 2340, testamentId: 1 }, { id: 94, name: 'Levítico ', chapter: 3, verses: 40, words: 2340, testamentId: 1 }], planTitle: 'Novo testamento', timeSpent: 40, date: '20/8/2023' },
    { id: '9845235234242', books: [{ id: 121, name: 'Números', chapter: 1, verses: 40, words: 2340, testamentId: 1 }, { id: 122, name: 'Números', chapter: 2, verses: 40, words: 2340, testamentId: 1 }, { id: 123, name: 'Números', chapter: 3, verses: 40, words: 2340, testamentId: 1 }], planTitle: null, timeSpent: 40, date: '20/7/2023' },
    { id: '08765654532', books: [{ id: 151, name: 'Deuteronômio', chapter: 1, verses: 40, words: 2340, testamentId: 1 }, { id: 152, name: 'Deuteronômio', chapter: 2, verses: 40, words: 2340, testamentId: 1 }, { id: 153, name: 'Deuteronômio', chapter: 3, verses: 40, words: 2340, testamentId: 1 }], planTitle: 'Plano Anual', timeSpent: 40, date: '20/7/2023' }
]

export { devotionalsData, praysData, plansData, memorizationData, readingData }