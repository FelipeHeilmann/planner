export const endAccess = function (name: string) {
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
        <h1>Olá, ${name}.</h1>
        <p>Seu acesso foi finalizado!</p>
        <p>Seus dados permanecerão por mais alguns dias, e caso não haja pagamento, serão excluídos.</p>
        <p>Para comprar novamente, <a href="#">clique aqui</a>.</p>
        <p>Atenciosamente,</p>
        <img src="https://app.plannerbiblico.com.br:4000/resources/utils/mail-footer.jpeg" alt="Footer Image">
    </div>
    `

    return {
        html: html,
    }

}