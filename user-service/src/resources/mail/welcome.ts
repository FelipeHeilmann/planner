export const welcomeTemplate = function (password: string) {
    const html = `
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            text-align: center;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        h1 {
            color: #333;
            font-size: 24px;
            margin-bottom: 20px;
        }

        p {
            color: #666;
            font-size: 16px;
            margin-bottom: 20px;
        }

        a {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            font-weight: bold;
            border-radius: 4px;
            transition: background-color 0.3s;
        }

        a:hover {
            background-color: #0056b3;
        }

        img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 20px auto;
        }
    </style>
    <div class="container">
        <h1>Olá,</h1>
        <p>Obrigado por adquirir o Planner Bíblico! Você tomou uma ótima decisão para o seu devocional.</p>
        <p>Para acessar o planner, siga os seguintes passos:</p>
        <p><strong>Passo 1:</strong> Acesse o site <a href="https://app.plannerbiblico.com.br/">plannerbiblico.com.br</a>.</p>
        <p><strong>Passo 2:</strong> Digite o e-mail que você usou em sua compra.</p>
        <p><strong>Passo 3:</strong> Para senha inicial, utilize: ${password}. Você poderá atualizá-la na plataforma depois.</p>
        <p>Materiais complementares:</p>
        <p>Basta acessar o seguinte link e baixar seus materiais:</p>
        <a href="https://drive.google.com/drive/folders/1B-ohWMqN6NJUbTs76dylsQhCBwQTdFB2?usp=drive_link">Clique aqui</a>
        <p>Tenha ótimos devocionais! Esperamos que goste do planner e faça bom proveito. Ressaltamos que estamos ainda em processo de melhoria. Aguarde, e você irá se surpreender ainda mais com seu planner!</p>
        <p>Atenciosamente,</p>
        <img src="https://app.plannerbiblico.com.br:4000/resources/utils/mail-footer.jpeg" alt="Footer Image">
        </div>
    `

    return {
        html: html,
    }

}