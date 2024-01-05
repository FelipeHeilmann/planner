# Rotas da API do Planner Bíblico

- Erros seguem o seguinte formato:
    ```
        {
            statusCode: Int,
            message: String
        }
    ```
- Mensagem de nível  :
    ````
    {
        message: String
    }
    ````  

### Essa rota é utilizada somenta para inserir usuários à mão, o que não é comum.
1. **Cadastro de Usuários**
    - Rota: `POST /register`
    - Parâmetros de entrada JSON ou objeto :
     ```
     {
       name: String,
       email: String,
       password: String,
       accessDuration: Int (1 ou 6),
	   isAdmin: Boolean
     }
     ```
    - Resposta (JSON): O usuário cadastrado com sucesso ou uma mensagem de erro.

2. **Autenticar Usuário**
    - Rota: `POST /auth`
    - Parâmetros de entrada no header authorization:
     ```
       Basic email:password -> lembrando que (email:password) devem estar criptografado em base 64
     ```
    - Resposta (JSON): Token JWT para autenticação ou mensagem de erro em caso de credenciais inválidas.

3. **Esqueceu a senha**
    - Rota: `POST /forget-password`
    - Parâmetros de entrada JSON ou objeto:
    ```
    {
        email: String,
    }
    ``` 
    - Resposta (JSON): Mensagem indicando que o email foi enviado para o endereço de email enviado ou  um erro.

### O email direcionará o usuário para uma tela e terá os seguintes parâmetros: /token
4. **Resetar a senha**
    - Rota: `POST /reset-password`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT da url]
    ```
    - Parâmetros de entrada JSON ou objeto:
    ```
    {
        password: String,
        confirmPassword: String
    }
    ``` 
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta (JSON): Mensagem indicando que a senha foi alterada com sucesso ou erro.

5. **Dados do usuário**
    - Rota: `GET /users/info`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta (JSON) ou será retornado erro:
    ```
        {
            name: String ,
            completedBible: Int,
            imageUrl: String,
            theme: String -> (Blue, Pink) ,
            level: Int
        }
    ```

6. **Trocar o tema**
    - Rota: `Patch /theme`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta (JSON) ou será retornado erro:
    ```
        {
            theme: string
        }
    ```    

7. **Contagem de recursos do usuário**
    - Rota: `GET /users/count/data`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta (JSON) ou será retornado erro:
    ```
        {
            level:{
                id: Number,
                name: string,
                description: string,
                minPoints: Int,
                imageUrl: string
            }
            readings: Int,
            devocional: Int,
            prayer: Int,
            memorizaion: Int,
        }
    ```    

8. **Mudar nome e/ou senha na plataforma**
    - Rota: `PATCH /users/update`
    - Cabeçalho (Header):
     ```
     Authorization: Bearer [token JWT]
     ```
     - Parâmetros de entrada JSON ou objeto:
    ```
        {
            name: String?,
            oldPassword: String?,
            newPassword: String? 
        }
    ```  
    - Resposta (JSON): Não há mensagem de sucesso, porém há mensagem caso haja erro.

9. **Mudar icone na plataforma**
    - Rota: `PATCH /users/icon`
    - Cabeçalho (Header):
     ```
     Authorization: Bearer [token JWT]
     ```
     - Parâmetros de entrada : 
     ```
        multipart form: imagem - file
     ```
    - Resposta (JSON): Não há mensagem de sucesso, porém há mensagem caso haja erro.

10. **Listar devocionais**
    - Rota: `GET /devotionals`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta array de JSON ordenados pela data de criação no banco:
    ```
        [{
            id: String,      
            verses: Int[],    
            book: {
                id: Int,
                name: String,
                chapter: Int,
                verses: Int,
                words: Int
                testament: String
            },    
            subject: String,  
            learned: String,  
            application: String, 
            date: String,
        }] 
    ```

11. **Listar devocional pelo id**
    - Rota: `GET /devotionals/id`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta (JSON) ordenados pela data de criação no banco:
    ```
        {
            id: String,      
            verses: Int[],    
            book: {
                id: Int,
                name: String,
                chapter: Int,
                verses: Int,
                words: Int
                testament: String
            },    
            subject: String,  
            learned: String,  
            application: String, 
            date: String,
        } 
    ```

12. **Criar devocional**
    - Rota `POST /devotionals`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Parâmetros de entrada JSON ou objeto:
    ````
    {
        userDate: String - new Date(),
        bookName: String,
        bookChapter: String,
        subject: String,
        learned: String,
        application: String,
        verses: Int[]
    }
    ````
    - Resposta: Caso o usuário suba de nível, a menensagem de nível.
    - Cabeçalho (Header):
    ```
        Location: /devotionals/id
    ```

13. **Editar devocional**
    - Rota `PUT /devotionals/id`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Parâmetros de entrada JSON ou objeto:
    ````
    {
        userDate: String - new Date(),
        bookName: String,
        bookChapter: String,
        subject: String,
        learned: String,
        application: String,
        verses: Int[]
    }
    ````
    - Resposta: Não há mensagem de retorno.

14. **Deletar devocional**
    - Rota: `DELETE /devotionals/id`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta: Não há mensagem de retorno.

15. **Listar Orações**
    -Rota `GET /prayers` 
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ``` 
    - Resposta (JSON) ordenados pela data de criação no banco:
    ```
        [{
            id: String,      
            title: String,   
            description: String,   
            request: String,     
            status: String,  
            timesPrayed: String[] -> Timstamp[],  
            date : Timestamp, 
        }]
    ``` 

16. **Listar Oração por id**
    - Rota `GET /prayers/id` 
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ``` 
    - Resposta (JSON):
    ```
        {
            id: String,      
            title: String,   
            description: String,   
            request: String,     
            status: String -> 'Em andamento, Finalizado',  
            timesPrayed: String[] -> Timstamp[],  
            date : Timestamp, 
        }  
    ``` 

17. **Criar Oração**
    - Rota `POST /prayers` 
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ``` 
    - Parâmetros de entrada JSON ou objeto
    ```
        {
            request: String,
            description: String,
            title: String,
            userDate: String -> new Date(),
            status: String -> 'Em andamento, Finalizado',
        }
    ```
    - Resposta: Caso o usuário suba de nível, a menensagem de nível.
    - Cabeçalho (Header):
    ```
        Location: /prayers/id
    ```    

18. **Editar Oração**
    - Rota `PUT /prayers/id` 
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Parâmetros de entrada JSON ou objeto
    ``` 
        {
            reason: String,
            description: String,
            title: String,
            userDate: String,
            status: String,
        }
    ``` 
    - Resposta: Não há mensagem de retorno.

19. **Deleter Oração**
    - Rota `Delete /prayers/id` 
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ``` 
    - Resposota: Não há mensagem de retorno

20. **Adicionar data orada**
    - Rota `PATCH /prayers/id/prayed` 
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ``` 
    - Parâmetros de entrada (JSON):
    ```
        {
            date: String -> new Date()
        }  
    ``` 
    - Resposta: Não há mensagem de retorno.

21. **Finalizar oração**
    - Rota `PATCH /prayer/id/finished`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ``` 
    - Resposta: Não há mensagem de retorno.


22. **Listar memorizações**
    - Rota `GET /memorizations`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta (JSON) ordenados pela data de criação no banco:
    ```
        [{
            id: String,
            book: {
                id: Int,
                name: String,
                chapter: Int,
                verses: Int,
                words: Int
                testament: String
            },
            verse: Int,
            description: String | null
            status: String,
            timesMemorized: String[] -> Timestamp[],
        }]
    ``` 

23. **Listar memorização por id**
    - Rota `GET /memorizations/id`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta (JSON):
    ```
        {
            id: String,
            book: {
                id: Int,
                name: String,
                chapter: Int,
                verses: Int,
                words: Int
                testament: String
            },
            verse: Int,
            description: String | null
            status: String,
            timesMemorized: String[] -> Timestamp[],
        } 
    ```

24. **Adicionar memorização**
    - Rota `POST /memorizations`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Parâmetros de entrada (JSON):
    ```
        {
            bookName: String,
            bookChapter: String,
            verse: Int,
            description: String?
        }  
    ``` 
    - Resposta: Não há mensagem de retorno.
     - Cabeçalho (Header):
    ```
        Location: /memorizations/id
    ```  

25. **Editar uma memorização**
    - Rota `PUT /memorizations/id`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
   - Parâmetros de entrada (JSON):
    ```
        {
            bookName: String,
            bookChapter: String,
            verse: Int,
            description: String?
        }  
    ``` 
    Respsota: Não há mensagem de retorno.
    
26. **Deletar memorização**
    - Rota `DELETE /memorizations/id`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta: Não há mensagem de retorno.

27. **Adicionar data memorizada**
    - Rota `PATCH /memorizations/id/memorized` 
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ``` 
    - Parâmetros de entrada (JSON):
    ```
        {
            date: String -> new Date()
        }  
    ``` 
    - Resposta: Não há mensagem de retorno

    15. **Finalizar Memorização**
    - Rota `PATCH /memorizations/id/finished`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ``` 
    - Resposta:Caso o usuário suba de nível, a menensagem de nível.

28. **Listar leituras**
    - Rota `GET /readings`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ``` 
    - Resposta (JSON) ordenados pela data de criação no banco:
    ```
        [{
            id: String,
            duration: Number,
            userId: String,
            books:[{
                    name: String,
                    chapter: Int,
                    words: Int,
                    verses: Int,
                    testament: String
            }]
            readingPlan: {
                id: String,
                name: String,
                planOf: String -> "Book, Testament, Bible",
                status: String -> "Em adamento, Finalizado",
                readingGoalPerDay: Int,
                testament: String,
                endDate: Timestamp,
                book: String | null 
            },
            date: Timestamp,
        }]
    ```

29. **Listar leitura por id**
    - Rota `GET /readings/id`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ``` 
    - Resposta (JSON):
    ```
        {
            id: String,
            duration: Int,
            userId: String,
            books:[{
                    name: String,
                    chapter: Int,
                    words: Int,
                    verses: Int,
                    testament: String
            }]
            readingPlan: {
                id: String,
                name: String,
                planOf: String -> "Book, Testament, Bible",
                status: String -> "Em adamento, Finalizado",
                readingGoalPerDay: Int,
                testament: String,
                endDate: Timestamp,
                book: String | null 
            },
            date: Timestamp,
            createdAt: Timestamp,
            updatedAt: Timestamp
        }
    ``` 

30. **Adicionar leitura**
    - Rota `POST /readings`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```       
    - Parâmetros de entrada (JSON):
    ```
        {
            bookName: String
            bookChapters: Int[],
            userDate: new Date[] -> String[],
            readingPlanId: String or null,
            duration: Int
        }  
    ``` 
    - Resposta: Caso o usuário suba de nível, a menensagem de nível.
    - Cabeçalho (Header):
    ```
        Location: /readings/id
    ```  

31. **Editar leitura**
    - Rota `PUT /readings`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```       
    - Parâmetros de entrada (JSON):
    ```
        {
            bookName: String
            bookChapters: Int[],
            userDate: new Date -> String,
            readingPlanId: String or null,
            duration: Int
        }  
    ``` 
    - Resposta: Não há mensagem de retorno.    

32. **Deletar leitura**
    - Rota `DELETE /readings/id`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ``` 
    - Resposta: Não há mensagem de retorno.

33. **Listar informações de leitura por mês**
    - Rota `GET /readings/count`
     - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ``` 
    - Resposta (JSON):
    ```
     [
            {
                shortMonth-shortYear : {
                    readings: Int,
                    chapters: Int,
                    duration: Int,
                    newTestament: Int,
                    oldTestament: Int,
                    oldTestamentChapters: Int,
                    newTestamentChapters": Int
                }
            }
        ]
    ``` 

34. **Listar planos de leitura**
    - Rota `GET /reading-plans`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta (JSON) ordenados pela data de criação no banco:
    ```
        [{
            id: String,
            name: String,
            planOf: String -> "Book, Testamentm Bible",
            status: String -> "Em adamento, Finalizado",
            readingGoalPerDay: Int ,
            testament: String,
            endDate: Timestamp,
            book: String | null 
        }]
    ``` 

35. **Listar plano de leitura por id**
    - Rota `GET /reading-plans/id`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta (JSON):
    ```
        {
            id: String,
            name: String,
            planOf: String -> "Book, Testamentm Bible",
            status: String -> "Em adamento, Finalizado",
            readingGoalPerDay: Int ,
            testament: String,
            endDate: Timestamp,
            book: String | null 
        }
    ```

36. **Listar leituras do plano**
    - Rota  `GET /readings-plan/id/readings`  
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta (JSON) ordenados pela data de criação no banco:
    ````
        [{
            id: String,
            duration: Number,
            userId: String,
            books:[{
                    name: String,
                    chapter: Int,
                    words: Int,
                    verses: Int,
                    testament: String
            }]
            readingPlan: {
                id: String,
                name: String,
                planOf: String -> "Book, Testament, Bible",
                status: String -> "Em adamento, Finalizado",
                readingGoalPerDay: Int,
                testament: String,
                endDate: Timestamp,
                book: String | null 
            },
            date: Timestamp,
        }]
    ````

37. **Listar quantidade leituras do plano por mês**
    - Rota `GET /reading-plan/:id/readings/count`
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta (JSON):
    ```
        [
            {
                shortMonth-shortYear : {
                    readings: Int,
                }
            }
        ]
    ```

38. **Adicionar plano de leitura**
    - Rota `POST /reading-plans` ,
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Parâmetros de entrada (JSON):
    ```
        {
            name: String,
            planOf: String -> book, testament, bible,
            testamentId: Int or null,
            book: String -> book name,
            endDate: new Date() -> String,
            readingGoalPerDay: Int
        }
    ``` 
    - Resposta: Não há mensagem de retorno.
     - Cabeçalho (Header):
    ```
        Location: /reading-plans/id
    ```  

39. **Atualizar plano de leitura**
    - Rota `PUT /reading-plans/id` ,
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Parâmetros de entrada (JSON):
    ```
        {
            name: String,
            planOf: String -> book, testament, bible,
            testamentId?: Int,
            book: String? ->  "book name",
            endDate: new Date() -> String,
            readingGoalPerDay: Int
        }  
    ``` 
    - Resposta: Não há resposta    

40. **Aumentar dia na meta de dia do plano**
    - Rota `PATCH /reading-plans/:id/increase`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ``` 
    - Resposta: Não há mensagem de retorno.

41. **Diminuir dia na meta de dia do plano**
    - Rota `PATCH /reading-plans/:id/decrease`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta: Não há mensagem de retorno.

42. **Listar dados do plano de leitura**
    - Rota `GET /reading-plans/:id/count`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta (JSON) ordenados pela data de criação no banco:
    ```
        {
            totalBooks: Int,
            chapters: Int,
            totalChapters: Int,
            readings: Int
        }
    ```

43. **Listar a quantidade de capítulos por livro**
    - Rota `GET /books/chapters?name=`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta: 
    ```
        {
            count: Int
        }
    ```

44. **Listar a quantidade de versículos por livro**
    - Rota `GET /books/verses?name=&chapter=`    
    - Cabeçalho (Header):
     ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta: 
    ```
        {
            count: Int
        }
    ```

45. **Listar livro por id**
    - Rota `GET /books/id`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta: 
    ```
        {
            id: Int,
            name: String,
            chapter: Int,
            verses: Int,
            words: Int,
            testament: String
        }
    ```

46. **Listar livros por nome**
    - Rota `GET /books/name/name` -> o segundo parâmetro é o nome do livro
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta: 
    ```
        [{
            id: Int,
            name: String,
            chapter: Int,
            verses: Int,
            words: Int,
            testament: String
        }]
    ```  

47. **Listar livros por testamento**
    - Rota `GET /books/testament/id`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta: 
    ```
        [{
            id: Int,
            name: String,
            chapter: Int,
            verses: Int,
            words: Int,
            testament: String
        }]
    ```

48. **Listar os livros completos do usuário**
    - Rota `GET /books/completed`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta: 
    ```
        [{
            name: String,
            completed: Int,
            completedPercentage: String -> Float,
            startedAt: Timestamp[] -> String[]
            finishedAt: Timestamp[] -> String[]
        }]
    ```

49. **Listar os niveis**
    - Rota `GET /levels`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```    
    - Resposta:
    ```
        [{
            id: Int,
            name: String,
            description: String,
            minPoints: Int,
            imageUrl: String
        }]
    ```

### Rotas de administrador

50. **Login de administrador**
    - Rota `POST admin/auth`
    - Parâmetros de entrada no header authorization:
     ```
       Basic email:password -> lembrando que (email:password) devem estar criptografado em base 64
     ```
    - Resposta (JSON): Token JWT para autenticação ou mensagem de erro em caso de credenciais inválidas ou caso o usuário não seja um administrador.


51. **Listar os usuários**
    - Rota `GET /admin/users`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta:
    ```
        [{
            id: String,
            name: String,
            Name: String,
            levelId: Int,
            completedBible: Int,
            imageUrl: String | null,
            isActive: Boolean,
            isAdmin: Boolean,
            points: Int,
            disabledAt: String -> Timestamp | null,
            lastLoginAt:  String -> Timestamp | null,
            birthDate: String -> Timestamp | null,
            gender:  String | null,
            isAffiliate: Boolean,
            origin: String
        }]
    ```

52. **Listar os usuários afiliados**
    - Rota `GET /affiliates`
    - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta:
    ```
        [{
            id: String,
            name: String,
            Name: String,
            levelId: Int,
            completedBible: Int,
            imageUrl: String | null,
            isActive: Boolean,
            isAdmin: Boolean,
            points: Int,
            disabledAt: String -> Timestamp | null,
            lastLoginAt:  String -> Timestamp | null,
            birthDate: String -> Timestamp | null,
            gender:  String | null,
            isAffiliate: Boolean,
            origin: String
        }]
    ```

53. **Desativar usuário**
    - Rota `path /admin/users/id/disable`
     - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta: Não há mensagem de retorno.

54. **Mudar senha do usuário**
    - Rota `path /admin/users/id`
     - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta: Não há mensagem de retorno.   
    
55. **Tonar usuário afiliado**
    - Rota `path /admin/users/id/affiliate`
     - Cabeçalho (Header):
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta: Não há mensagem de retorno.   
 
56. **Listar todos os cupons**
    - Rota `GET /coupons`
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta:
    ```
    [{
            affiliateName: String | null,
            id: string,
            name: string,
            value: Int,
            usesCoupon: [
                userId: String
                status: String,
                date: String -> Timestamp | null,
                userName: String | null,
                userEmail: String | null
            ],
            isValid: Boolean,
            use: Int,
            createdAt: String -> Timestamp,
            dueAt: String -> Timestamo | null,
            affiliateId: string,
            percentageToAffiliate: Float
        }]
    ```

57. **Listar cupom por id**  
    - Rota `GET /coupons/id`
    ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta JSON:
    ```
    {
            affiliateName: String | null,
            id: string,
            name: string,
            value: Int,
            usesCoupon: [
                userId: String
                status: String,
                date: String -> Timestamp | null,
                userName: String | null,
                userEmail: String | null
            ],
            isValid: Boolean,
            use: Int,
            createdAt: String -> Timestamp,
            dueAt: String -> Timestamo | null,
            affiliateId: string,
            percentageToAffiliate: Float
    }
    ```

58. **Criar cupon** 
    - Rota `POST /coupons` 
    ```
    Authorization: Bearer [token JWT]
    ```
    - Parâmetros de entrada (JSON):
    ```
        {
		    name: String,
            value: Int,
            isValid: Boolean,
            dueAt: Strint -> Timestamp | null,
            affiliateId: String | null,
            percentageToAffiliate: Float
        }  
    ```

59. **Listar pagegamentos feito a o cupom de para o afiliado**
    - Rota `GET /coupons/:id/payments`
     ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta JSON:
    ```
    [{
        id: string
        date: String -> Timestamp
        value: Float
        couponId: -> String
    }]
    ```

60. **Criar pagamento para cupom de afiliado**
    - Rota `Post /coupons/:id/payments`
     ```
    Authorization: Bearer [token JWT]
    ```
    - Resposta JSON:
    ```
    {
        value: Float
        date: String -> Timestamp
    }
    ```    