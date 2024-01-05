/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

const nextConfig = {
    ...withPWA({
        dest: 'public',
        register: true,
        skipWaiting: true,
    })
}

const usersImages = {
    images: {
        domains: ['app.plannerbiblico', 'app.plannerbiblico.com.br'],
    }
}

module.exports = nextConfig
module.exports = usersImages
