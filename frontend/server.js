const next = require('next')

// note the "https" not "http" required module. You will get an error if trying to connect with https
const https = require('https')
const path = require('path')
const { parse } = require("url");

const fs = require("fs");

const hostname = 'app.plannerbiblico'
const port = 3000

const app = next({ dev: false, hostname, port });

const sslOptions = {
    key: fs.readFileSync(path.join('.', '/certificate_ssl', 'privkey.pem')),
    cert: fs.readFileSync(path.join('.', '/certificate_ssl', 'fullchain.pem')),
}

const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = https.createServer(sslOptions, (req, res) => {

        // custom api middleware

        return handle(req, res);

    })
    server.listen(port, (err) => {
        if (err) throw err
        console.log('> Ready on https://app.plannerbiblico:' + port);
    })
})
