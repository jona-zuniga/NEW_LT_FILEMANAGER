/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: '/not-found',
				destination: '/en/login',
				permanent: true,
			},
		]
	},
	serverExternalPackages: ['oracledb'],
}

export default nextConfig
