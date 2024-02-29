// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     output: 'standalone',
// }

// module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    env: {
        baseUrl1: 'http://localhost:3000/api',
        baseUrl2: 'http://localhost:3003' // Add another base URL
    }
}

module.exports = nextConfig
